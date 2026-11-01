"use client";

import { useEffect, useState } from "react";
import { fetchLiveRegistry, Registry } from "@/lib/registry";

export function useLiveRegistry(snapshot: Registry) {
  const [registry, setRegistry] = useState(snapshot);
  const [isLive, setIsLive] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let active = true;
    fetchLiveRegistry()
      .then((liveRegistry) => {
        if (!active) return;
        setRegistry(liveRegistry);
        setIsLive(true);
      })
      .catch(() => {
        // Keep the build-time snapshot when the public registry is unavailable.
      })
      .finally(() => {
        if (active) setIsChecking(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { registry, isLive, isChecking };
}
