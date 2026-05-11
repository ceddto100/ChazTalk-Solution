"use client";

import { useEffect } from "react";
import { captureUtm, track } from "@/lib/analytics";

export function AnalyticsProvider() {
  useEffect(() => {
    captureUtm();
    track("page_view");
  }, []);
  return null;
}
