import { ReactNode } from 'react'

import { geoJSON, LatLng, Map } from 'leaflet'
import { useSetRecoilState } from 'recoil'

import { sidePanelAtom } from '@/app/atoms'
import { Track } from '@/app/types'

const TrackInformation: React.FC<{ children?: ReactNode }> = ({ children }) => {
    return <div className="h-8">{children}</div>
}

const TrackDetail: React.FC<{ selectedGpx: Track; map: Map }> = ({
    selectedGpx,
    map,
}) => {
    const setSidePanel = useSetRecoilState(sidePanelAtom)

    return (
        <div className="p-4">
            <TrackInformation>
                Distance: {Math.round(selectedGpx.properties.distance) / 1000}km
            </TrackInformation>
            <TrackInformation>
                Elevation gain:{' '}
                {Math.round(selectedGpx.properties.elevation_gain)}m
            </TrackInformation>
            <TrackInformation>
                Elevation loss:{' '}
                {Math.round(selectedGpx.properties.elevation_loss)}m
            </TrackInformation>
            <button
                onClick={() => {
                    setSidePanel(() => false)

                    map.flyToBounds(
                        geoJSON(selectedGpx.geometry, {
                            coordsToLatLng: (coords) => {
                                return new LatLng(
                                    coords[0],
                                    coords[1],
                                    coords[2]
                                )
                            },
                        })
                            .getBounds()
                            .pad(0.1)
                    )
                }}
                className="flex text-blue-400 ml-auto"
            >
                Show on map
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                </svg>
            </button>
        </div>
    )
}

export default TrackDetail
