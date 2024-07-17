import { useSetRecoilState } from 'recoil'

import { selectedGpxAtom } from '@/app/atoms'
import Accordion from '@/app/components/accordion/Accordion'
import { TracksByRegion } from '@/app/types'

const TracksList: React.FC<{ tracks: TracksByRegion }> = ({ tracks }) => {
    const setSelectedGpx = useSetRecoilState(selectedGpxAtom)
    return (
        <>
            {Object.keys(tracks).map((region) => {
                return (
                    <Accordion
                        key={`divider-${region}`}
                        header={
                            <div className="flex items-center pl-3 h-12  cursor-pointer hover:bg-slate-50 w-full">
                                {region}
                            </div>
                        }
                    >
                        {tracks[region].map((track: any) => {
                            return (
                                <div
                                    key={`sidepanel-${track.properties.filename}`}
                                    className="flex items-center pl-3 h-12 border-b border-solid border-b-slate-300 cursor-pointer hover:bg-slate-50"
                                    onClick={() => setSelectedGpx(() => track)}
                                >
                                    {track.properties.region} -{' '}
                                    {track.properties.name}
                                </div>
                            )
                        })}
                    </Accordion>
                )
            })}
        </>
    )
}

export default TracksList
