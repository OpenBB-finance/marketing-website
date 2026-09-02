interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  divider?: boolean;
}

interface NavGroup {
  label: string;
  links: NavLink[];
}

export const footerNav: NavGroup[] = [
  {
    label: "Product",
    links: [
      { label: "OpenBB Workspace", href: "/products/workspace" },
      { label: "Snowflake Native App", href: "/products/snowflake" },
      { label: "Security", href: "/security" },
      { label: "Open Data Platform (ODP)", href: "/products/odp", divider: true },
    ],
  },
  {
    label: "Solutions",
    links: [
      { label: "App Showcase", href: "/solutions/app-showcase" },
      { label: "App Marketplace", href: "/solutions/marketplace" },
      { label: "Buy-Side", href: "/buy-side" },
      { label: "AI Vendor", href: "/ai-vendor" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Videos", href: "/videos" },
      { label: "About", href: "/company/about" },
      { label: "Documentation", href: "https://docs.openbb.co/", external: true },
      { label: "Streamlit", href: "/comparison/streamlit" },
      { label: "Tableau", href: "/comparison/tableau" },
      { label: "Power BI", href: "/comparison/power-bi" },
    ],
  },
  {
    label: "Other",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Open Startup", href: "/company/open" },
      { label: "Support", href: "/support" },
      { label: "Contact", href: "/contact" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];
