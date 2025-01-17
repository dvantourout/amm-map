'use client'

import { useMemo, useState } from 'react'

import { Map as LeafletMap } from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { RecoilRoot } from 'recoil'

import { Track as TrackType, TracksByRegion } from '@/app/types'

import Track from './Track'
import SidePanel from '../sidepanel'

const Map = ({ tracks }: { tracks: TracksByRegion }) => {
    const [map, setMap] = useState<LeafletMap | null>(null)

    const displayMap = useMemo(
        () => (
            <MapContainer
                center={[44.086294, 6.479357]}
                zoom={13}
                scrollWheelZoom={true}
                zoomSnap={0}
                zoomDelta={0.25}
                ref={setMap}
                tapTolerance={200}
                className="h-full w-full"
            >
                <TileLayer
                    // GEOGRAPHICALGRIDSYSTEMS.MAPS
                    // GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR
                    url="https://data.geopf.fr/private/wmts?apikey=ign_scan_ws&layer=GEOGRAPHICALGRIDSYSTEMS.MAPS&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}"
                    minZoom={6}
                    maxZoom={16}
                />
                {Object.keys(tracks).map((region) =>
                    tracks[region].map((track: TrackType) => (
                        <Track
                            key={`gpx-${track.properties.name}`}
                            track={track}
                        />
                    ))
                )}
            </MapContainer>
        ),
        [tracks]
    )

    return (
        <RecoilRoot>
            <div>
                {map ? <SidePanel tracks={tracks} map={map} /> : null}
                <div className="h-screen w-screen">{displayMap}</div>
            </div>
        </RecoilRoot>
    )
}

export default Map
