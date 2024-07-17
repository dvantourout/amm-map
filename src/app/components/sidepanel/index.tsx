'use client'

import { Map } from 'leaflet'
import { useRecoilState } from 'recoil'

import { selectedGpxAtom, sidePanelAtom } from '@/app/atoms'
import { TracksByRegion } from '@/app/types'

import TrackDetail from './TrackDetail'
import TracksList from './TracksList'

const SidePanel: React.FC<{ tracks: TracksByRegion; map: Map }> = ({
    tracks,
    map,
}) => {
    const [sidePanel, setSidePanel] = useRecoilState(sidePanelAtom)
    const [selectedGpx, setSelectedGpx] = useRecoilState(selectedGpxAtom)

    return (
        <>
            <div
                className={`absolute sm:w-[408px] h-screen bg-white z-[1001] transition-transform duration-200 ${
                    sidePanel ? '-translate-x-0' : '-translate-x-full'
                } w-full`}
            >
                <div className="overflow-scroll scrollbar-width-thin h-screen">
                    {selectedGpx ? (
                        <div>
                            <div className="flex pt-2 pl-2">
                                <button
                                    onClick={() => setSelectedGpx(() => null)}
                                >
                                    <div className="flex text-blue-400">
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
                                                d="M15.75 19.5 8.25 12l7.5-7.5"
                                            />
                                        </svg>
                                        Back
                                    </div>
                                </button>
                                <div className="font-bold ml-2">
                                    {selectedGpx.properties.name}
                                </div>
                            </div>
                            <TrackDetail selectedGpx={selectedGpx} map={map} />
                        </div>
                    ) : (
                        <div>
                            <button
                                className="sm:hidden pt-2 pl-2"
                                onClick={() => setSidePanel(() => false)}
                            >
                                <div className="flex text-blue-400">
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
                                            d="M15.75 19.5 8.25 12l7.5-7.5"
                                        />
                                    </svg>
                                    Back
                                </div>
                            </button>
                            <TracksList tracks={tracks} />
                        </div>
                    )}
                </div>
                <div
                    className={`sm:flex items-center absolute left-full sm:left-[408px] top-1/2 w-8 h-16 rounded-r-lg bg-white z-[401] hidden`}
                    onClick={() => setSidePanel((v) => !v)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`size-6 transition-all ease-in-out duration-200 ${
                            !sidePanel && 'transform -scale-x-100'
                        }`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </div>
            </div>
            <div
                onClick={() => setSidePanel((v) => !v)}
                className="bg-white left-2 top-2 absolute z-[401] rounded-full p-2 drop-shadow-lg sm:hidden"
            >
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
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </div>
        </>
    )
}

export default SidePanel
