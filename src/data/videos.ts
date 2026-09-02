export interface Video {
  id: string;
  start: number;
  title: string;
  description: string;
  category: string;
  date: string;
  duration: string;
}

export const featuredVideo: Video = {
  id: "Ik1qUa-HbUY",
  start: 0,
  title: "OpenBB Workspace Demo: Portfolio Analysis, Apps Marketplace, MCP & AI Agents",
  description:
    "Didier Lopes (CEO) walks through a full OpenBB Workspace session, from dashboard configuration to multi-source data analysis and automated reporting.",
  category: "Demo",
  date: "2026-07-01",
  duration: "11:52 min",
};

export const videos: Video[] = [
  // ── Snowflake Native App ──────────────────────────────────────────────────
  {
    id: "ssSSW4IJyoA",
    start: 2,
    title: "Employment Data Monitor",
    description:
      "A live Employment Data Monitor built on Bureau of Labor Statistics data inside Snowflake — tracking payrolls, unemployment, wages, and labor force participation with automated updates and drill-downs to state and industry level.",
    category: "Snowflake Native App",
    date: "2026-02-13",
    duration: "4:01",
  },
  {
    id: "LZ_NTDg8FUk",
    start: 30,
    title: "Inflation Data Monitor",
    description:
      "An Inflation Data Monitor built on CPI, PCE, and inflation expectations data inside Snowflake — covering headline vs. core spreads, AI-assisted briefings with OpenBB Copilot, and drill-downs into where price pressures are most persistent.",
    category: "Snowflake Native App",
    date: "2026-02-20",
    duration: "3:43",
  },
  {
    id: "sCa6gSCajLc",
    start: 121,
    title: "GDP Growth Rates Monitor",
    description:
      "A GDP Growth Rates Monitor built on BEA NIPA data inside Snowflake — breaking down expenditure components, government spending drag, consumption and investment drivers, and GDP deflator spreads, with AI-assisted briefings throughout.",
    category: "Snowflake Native App",
    date: "2026-03-04",
    duration: "7:18",
  },
  // ── Developer Series ──────────────────────────────────────────────────────
  {
    id: "JWTFN6kGRMI",
    start: 69,
    title: "Introduction to Data Widgets",
    description:
      "Building an app on OpenBB starts with one file. Walk through the reference backend and learn how data widgets work in OpenBB Workspace.",
    category: "Developer Series",
    date: "2026-04-07",
    duration: "3:51",
  },
  {
    id: "8UUQ5VvSiKs",
    start: 0,
    title: "Types of Widgets",
    description:
      "Not all data looks the same, and your widgets shouldn't either. Walk through every widget type supported in OpenBB Workspace.",
    category: "Developer Series",
    date: "2026-04-07",
    duration: "3:48",
  },
  {
    id: "OdakMtpfakI",
    start: 0,
    title: "Widget Input Parameters",
    description:
      "Data widgets become genuinely useful when analysts can interact with them. Learn how input parameters let users communicate with your backend.",
    category: "Developer Series",
    date: "2026-04-07",
    duration: "7:18",
  },
  {
    id: "7lK086BNSXc",
    start: 0,
    title: "Widget Settings",
    description:
      "A widget that always shows stale data without telling anyone is a trust problem. Learn how widget settings give you control over data freshness.",
    category: "Developer Series",
    date: "2026-04-07",
    duration: "2:19",
  },
  {
    id: "v9frj9eBl04",
    start: 0,
    title: "Grouping Widgets",
    description:
      "The grouping mechanism in OpenBB Workspace is one of the most practical concepts for anyone building multi-widget dashboards.",
    category: "Developer Series",
    date: "2026-04-17",
    duration: "3:44",
  },
  {
    id: "LdffGABf5Ec",
    start: 0,
    title: "AG Grid Tables and Charts",
    description:
      "Tables are where most financial data lives. AG Grid gives you precise control over how that data is presented in OpenBB Workspace.",
    category: "Developer Series",
    date: "2026-04-17",
    duration: "5:00",
  },
  {
    id: "WO-yhcfMdeY",
    start: 0,
    title: "Plotly Charts",
    description:
      "When you need a Sankey chart, a heat map, or full visual control, Plotly is the answer. Learn how to integrate Plotly charts into OpenBB Workspace.",
    category: "Developer Series",
    date: "2026-04-17",
    duration: "4:14",
  },
  {
    id: "AE0JLOcASnk",
    start: 0,
    title: "Highcharts",
    description:
      "Highcharts is fully supported in OpenBB Workspace. If your team already has a Highcharts license, you can bring your existing charts straight in.",
    category: "Developer Series",
    date: "2026-04-17",
    duration: "0:43",
  },
  {
    id: "_-EDboxxanw",
    start: 0,
    title: "TradingView Charts",
    description:
      "If your analysts are used to TradingView, you can bring that exact experience into OpenBB Workspace and connect it to your own data.",
    category: "Developer Series",
    date: "2026-04-17",
    duration: "1:42",
  },
  {
    id: "yvPlUkSDvEk",
    start: 0,
    title: "Input Forms",
    description:
      "Input forms let analysts submit structured data directly from the Workspace, opening up use cases beyond read-only dashboards.",
    category: "Developer Series",
    date: "2026-04-17",
    duration: "1:27",
  },
  {
    id: "ZkdFgsOAmio",
    start: 0,
    title: "Omni, SQL, and Python Widgets",
    description:
      "Some workflows don't fit a fixed widget. The Omni, SQL, and Python widgets give analysts a dynamic input area where the output adapts to what they type.",
    category: "Developer Series",
    date: "2026-04-17",
    duration: "2:52",
  },
  {
    id: "BQq3hUW8fRE",
    start: 0,
    title: "Sparkline Charts",
    description:
      "Sparklines let you pack trend data directly into a table cell, giving analysts a quick visual read on performance without leaving the table.",
    category: "Developer Series",
    date: "2026-04-17",
    duration: "5:00",
  },
  {
    id: "uDYNCobr1MY",
    start: 0,
    title: "YouTube Widget",
    description:
      "Embed and play YouTube videos directly inside OpenBB Workspace and attach the transcript so your AI agents have access to the content.",
    category: "Developer Series",
    date: "2026-04-17",
    duration: "1:21",
  },
  {
    id: "v7u-22b7ZOI",
    start: 0,
    title: "Apps Layout and apps.json",
    description:
      "Building individual widgets is only half the job. Learn how to define the full app layout in OpenBB Workspace, assembling widgets into tabs and settings.",
    category: "Developer Series",
    date: "2026-04-17",
    duration: "3:41",
  },
  {
    id: "7fDTDYh2NJ4",
    start: 0,
    title: "Vibe-coded financial apps: How OpenBB fixes ownership and data governance",
    description:
      "Watch our latest presentation covering updates and insights into the OpenBB ecosystem.",
    category: "Presentations",
    date: "2026-06-01",
    duration: "26:02 min",
  },
];

export const categoryRatios: Record<string, string> = {
  "Developer Series": "55.4167%",
  "Snowflake Native App": "55.8333%",
  Demo: "62.3557%",
  Presentations: "56.25%",
};
