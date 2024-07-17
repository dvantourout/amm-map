import { useMemo } from "react";

import dynamic from "next/dynamic";

import { TracksByRegion } from "./types";

export default function Page() {
  const tracks: TracksByRegion = useMemo(
    () => require("@/app/data/amm-tracks.json"),
    []
  );

  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/map/"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  // Map zIndex 400
  // Controls zIndex 1000
  return <Map tracks={tracks} />;
}
