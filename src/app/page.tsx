import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Page() {
  const tracks: any = useMemo(() => require("@/app/data/amm-tracks.json"), []);

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
