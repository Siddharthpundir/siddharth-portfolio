import { GoogleAnalytics } from "@next/third-parties/google";

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId || process.env.NODE_ENV !== "production") return null;
  return <GoogleAnalytics gaId={gaId} />;
}
