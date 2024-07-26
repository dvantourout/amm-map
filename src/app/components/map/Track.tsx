import { Marker, Polyline } from 'react-leaflet'
import { useSetRecoilState, useRecoilState } from 'recoil'

import { selectedGpxAtom, sidePanelAtom } from '@/app/atoms'
import { Track as TrackType } from '@/app/types'

import ColorIcon from './ColorIcon'
import { pointsCloseTo } from './utils'

const Track: React.FC<{ track: TrackType }> = ({ track }) => {
    const [selectedGpx, setSelectedGpx] = useRecoilState(selectedGpxAtom)
    const setSidePanel = useSetRecoilState(sidePanelAtom)

    const trackStart = track.geometry.coordinates[0]
    const trackEnd =
        track.geometry.coordinates[track.geometry.coordinates.length - 1]

    if (!pointsCloseTo(trackStart, trackEnd)) {
        console.log(track.properties.name)
    }

    return (
        <>
            {/* Display start and end of the track */}
            {selectedGpx === track ? (
                <>
                    <Marker position={trackStart} icon={ColorIcon('green')} />
                    {!pointsCloseTo(trackStart, trackEnd) && (
                        <Marker position={trackEnd} icon={ColorIcon('red')} />
                    )}
                </>
            ) : null}
            <Polyline
                positions={track.geometry.coordinates}
                color={track.properties.color}
                weight={5}
                eventHandlers={{
                    mouseover: (e) => {
                        e.target.bringToFront()
                        e.target.setStyle({
                            weight: 10,
                        })
                    },
                    mouseout: (e) => {
                        e.target.setStyle({
                            weight: 8,
                        })
                    },
                    mousedown: () => {
                        setSelectedGpx(() => track)
                        setSidePanel(() => true)
                    },
                }}
            ></Polyline>
        </>
    )
}

export default Track
