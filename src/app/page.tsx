import dynamic from "next/dynamic";
import { useMemo } from "react";

export default async function Page() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/map/"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <div id="map">
        <Map />
      </div>
    </>
  );
}
