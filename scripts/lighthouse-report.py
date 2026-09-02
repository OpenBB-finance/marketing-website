#!/usr/bin/env python3
"""
Parse a Lighthouse HTML report and extract scores, failing audits, and actionable details.

Usage:
    python scripts/lighthouse-report.py <path-to-lighthouse-report.html>
"""

import json
import re
import sys
from pathlib import Path

CATEGORY_ORDER = ["performance", "accessibility", "best-practices", "seo"]

COLORS = {
    "red": "\033[91m",
    "yellow": "\033[93m",
    "green": "\033[92m",
    "bold": "\033[1m",
    "dim": "\033[2m",
    "reset": "\033[0m",
    "cyan": "\033[96m",
}


def score_color(score: float) -> str:
    if score >= 0.9:
        return COLORS["green"]
    if score >= 0.5:
        return COLORS["yellow"]
    return COLORS["red"]


def format_score(score: float) -> str:
    pct = int(score * 100)
    color = score_color(score)
    return f"{color}{COLORS['bold']}{pct}{COLORS['reset']}"


def format_bytes(b: int) -> str:
    if b >= 1024 * 1024:
        return f"{b / (1024 * 1024):.1f} MB"
    if b >= 1024:
        return f"{b / 1024:.0f} KB"
    return f"{b} B"


def extract_json(html: str) -> dict:
    match = re.search(r"__LIGHTHOUSE_JSON__ = (.+?);<", html)
    if not match:
        print("Could not find Lighthouse JSON in the report.", file=sys.stderr)
        sys.exit(1)
    return json.loads(match.group(1))


def print_scores(categories: dict):
    print(f"\n{COLORS['bold']}{'=' * 60}")
    print(f"  LIGHTHOUSE SCORES")
    print(f"{'=' * 60}{COLORS['reset']}\n")
    for cat_key in CATEGORY_ORDER:
        cat = categories.get(cat_key)
        if not cat:
            continue
        name = cat.get("title", cat_key).ljust(20)
        score = cat.get("score", 0)
        bar_len = int(score * 30)
        bar = "█" * bar_len + "░" * (30 - bar_len)
        print(f"  {name} {score_color(score)}{bar}{COLORS['reset']}  {format_score(score)}")
    print()


def print_failing_audits(categories: dict, audits: dict):
    print(f"{COLORS['bold']}{'=' * 60}")
    print(f"  FAILING AUDITS")
    print(f"{'=' * 60}{COLORS['reset']}")

    for cat_key in CATEGORY_ORDER:
        cat = categories.get(cat_key)
        if not cat:
            continue

        failing = []
        for ref in cat.get("auditRefs", []):
            audit = audits.get(ref["id"], {})
            score = audit.get("score")
            if score is not None and score < 1:
                failing.append(audit)

        if not failing:
            continue

        print(f"\n  {COLORS['bold']}{COLORS['cyan']}--- {cat.get('title', cat_key).upper()} ---{COLORS['reset']}")

        for audit in failing:
            score = audit.get("score", 0)
            title = audit.get("title", "")
            display_val = audit.get("displayValue", "")

            print(f"\n  {COLORS['red']}✗{COLORS['reset']} {COLORS['bold']}{title}{COLORS['reset']}", end="")
            if display_val:
                print(f"  {COLORS['dim']}({display_val}){COLORS['reset']}", end="")
            print()

            details = audit.get("details", {})
            items = details.get("items", [])

            for item in items[:5]:
                if not isinstance(item, dict):
                    continue

                node = item.get("node", {})
                if isinstance(node, dict):
                    selector = node.get("selector", "")
                    snippet = node.get("snippet", "")
                    explanation = node.get("explanation", "")

                    if selector:
                        print(f"    {COLORS['dim']}selector:{COLORS['reset']} {selector}")
                    if snippet:
                        print(f"    {COLORS['dim']}snippet:{COLORS['reset']}  {snippet[:120]}")
                    if explanation:
                        for line in explanation.split("\n"):
                            print(f"    {COLORS['yellow']}→ {line.strip()}{COLORS['reset']}")

                url = item.get("url", "")
                if url:
                    print(f"    {COLORS['dim']}url:{COLORS['reset']} {url}")

                wasted = item.get("wastedBytes")
                total = item.get("totalBytes")
                if wasted:
                    print(f"    {COLORS['dim']}wasted:{COLORS['reset']} {format_bytes(wasted)}", end="")
                    if total:
                        print(f"  {COLORS['dim']}(total: {format_bytes(total)}){COLORS['reset']}", end="")
                    print()

                wasted_ms = item.get("wastedMs")
                if wasted_ms:
                    print(f"    {COLORS['dim']}wasted:{COLORS['reset']} {wasted_ms:.0f}ms")

                sub_items = item.get("subItems", {})
                if isinstance(sub_items, dict):
                    for si in sub_items.get("items", [])[:3]:
                        reason = si.get("reason", "")
                        if reason:
                            print(f"      {COLORS['yellow']}↳ {reason}{COLORS['reset']}")

                displayed = item.get("displayedAspectRatio", "")
                actual = item.get("actualAspectRatio", "")
                if displayed and actual:
                    print(f"    {COLORS['dim']}displayed ratio:{COLORS['reset']} {displayed}")
                    print(f"    {COLORS['dim']}actual ratio:{COLORS['reset']}    {actual}")

                desc = item.get("description", "")
                if desc and not node:
                    print(f"    {COLORS['dim']}{desc[:150]}{COLORS['reset']}")

                href = item.get("href", "")
                text = item.get("text", "")
                if href or text:
                    if text:
                        print(f"    {COLORS['dim']}link text:{COLORS['reset']} \"{text}\"")
                    if href:
                        print(f"    {COLORS['dim']}href:{COLORS['reset']} {href}")

                print()


def print_metrics(audits: dict):
    metric_keys = [
        ("first-contentful-paint", "FCP"),
        ("largest-contentful-paint", "LCP"),
        ("total-blocking-time", "TBT"),
        ("cumulative-layout-shift", "CLS"),
        ("speed-index", "SI"),
        ("interactive", "TTI"),
    ]

    print(f"{COLORS['bold']}{'=' * 60}")
    print(f"  CORE METRICS")
    print(f"{'=' * 60}{COLORS['reset']}\n")

    for key, label in metric_keys:
        audit = audits.get(key)
        if not audit:
            continue
        score = audit.get("score", 0)
        display = audit.get("displayValue", "")
        color = score_color(score)
        print(f"  {label.ljust(6)} {color}{display.ljust(10)}{COLORS['reset']}  (score: {format_score(score)})")

    print()


def main():
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <lighthouse-report.html>", file=sys.stderr)
        sys.exit(1)

    report_path = Path(sys.argv[1])
    if not report_path.exists():
        print(f"File not found: {report_path}", file=sys.stderr)
        sys.exit(1)

    html = report_path.read_text()
    data = extract_json(html)

    categories = data.get("categories", {})
    audits = data.get("audits", {})

    print_scores(categories)
    print_metrics(audits)
    print_failing_audits(categories, audits)


if __name__ == "__main__":
    main()
