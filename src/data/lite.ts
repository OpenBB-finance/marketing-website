/**
 * OpenBB Lite configuration.
 *
 * Single source of truth for the Stripe checkout link and the price shown on
 * /lite. The checkout URL is a Stripe-hosted Payment Link, so the success /
 * cancel redirects (-> /lite/success, /lite/error) are configured in the
 * Stripe dashboard under "After payment", not in this codebase.
 *
 * Override the URL per environment with PUBLIC_STRIPE_LITE_CHECKOUT_URL.
 * The default below is the production Payment Link.
 */

const FALLBACK_CHECKOUT_URL = "https://buy.stripe.com/3cI14m3OD3Yge0w5IkeQM02";

// Launch promo: 50% off Lite via the LITE50 code. Gated at BUILD time — the site
// is static, so it only drops off once rebuilt/redeployed on or after PROMO_END.
// Redeploy after the end date to remove it.
const PROMO_CODE = "LITE50";
const PROMO_END = new Date("2026-09-01T00:00:00");
const isPromoActive = new Date() < PROMO_END;

const baseCheckoutUrl = import.meta.env.PUBLIC_STRIPE_LITE_CHECKOUT_URL ?? FALLBACK_CHECKOUT_URL;

// While the promo is live, pre-apply the coupon at Stripe with the documented
// `prefilled_promo_code` Payment Link parameter. Requires the Payment Link to have
// "Allow promotion codes" enabled and LITE50 to exist as a promotion code pointing
// at the 50%-off coupon. https://docs.stripe.com/payment-links/customize
const checkoutUrl = isPromoActive
  ? `${baseCheckoutUrl}${baseCheckoutUrl.includes("?") ? "&" : "?"}prefilled_promo_code=${PROMO_CODE}`
  : baseCheckoutUrl;

export const LITE = {
  checkoutUrl,

  // Price from the pricing-page mockup (2026-07-14). Confirm before GA.
  price: "$2,400",
  cadence: "/year",
  unit: "team license",

  promo: isPromoActive
    ? {
        price: "$1,200",
        label: "50% off until 31 Aug",
        code: PROMO_CODE,
      }
    : null,
} as const;
