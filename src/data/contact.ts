/**
 * Centralized Formbricks form configuration.
 *
 * Every contact / "talk to us" form across the site should reference one of
 * these URLs so we have a single place to update when form IDs change.
 *
 * Usage in an Astro page:
 *   import { FORMBRICKS } from "../data/contact";
 *   <ContactModal iframeSrc={FORMBRICKS.general} />
 */

export const FORMBRICKS = {
  /** Default "Contact Sales / Get a quote" form used on most pages. */
  general: "https://app.formbricks.com/s/cmko4qe454qt9ad013omc47h6?embed=true",

  /** Pricing-specific contact form. */
  pricing: "https://app.formbricks.com/s/cmls4h8ih00h1us01lc1xhvcb?embed=true",
} as const;
