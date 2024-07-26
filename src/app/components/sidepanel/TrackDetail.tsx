import { ReactNode } from 'react'

import * as d3 from 'd3'
import { geoJSON, LatLng, Map } from 'leaflet'
import { useSetRecoilState } from 'recoil'

import { sidePanelAtom } from '@/app/atoms'
import { Track } from '@/app/types'

const TrackInformation: React.FC<{ children?: ReactNode }> = ({ children }) => {
    return <div className="h-8">{children}</div>
}

const haversine = (
    a: [number, number, number],
    b: [number, number, number]
) => {
    const R = 6371e3
    const phi1 = (a[0] * Math.PI) / 180
    const phi2 = (b[0] * Math.PI) / 180
    const deltaPhi = ((b[0] - a[0]) * Math.PI) / 180
    const deltaLambda = ((b[1] - a[1]) * Math.PI) / 180

    const x =
        Math.pow(Math.sin(deltaPhi / 2), 2) +
        Math.cos(phi1) * Math.cos(phi2) * Math.pow(Math.sin(deltaLambda / 2), 2)
    const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
    const d = R * c

    const h = Math.abs(b[2] - a[2])

    return Math.sqrt(Math.pow(d, 2) + Math.pow(h, 2))
}

const YoloPlot: React.FC<{ selectedGpx: Track }> = ({ selectedGpx }) => {
    const coordinates = selectedGpx.geometry.coordinates
    const data: { distance: number; height: number }[] = []

    let trackLength = 0
    data.push({ distance: 0, height: coordinates[0][2] })

    for (let i = 1; i < coordinates.length; i++) {
        trackLength += haversine(coordinates[i], coordinates[i - 1]) / 1000
        data.push({ distance: trackLength, height: coordinates[i][2] })
    }

    const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 }

    const width = 300
    const height = 300

    const boundsWidth = width - MARGIN.right - MARGIN.left
    const boundsHeight = height - MARGIN.top - MARGIN.bottom

    const x = d3
        .scaleLinear()
        .domain([0, d3.max(data, (data) => data.distance)!])
        .range([0, boundsWidth])
    const y = d3
        .scaleLinear()
        .domain([
            d3.max(data, (data) => data.height)!,
            d3.min(data, (data) => data.height)!,
        ])
        .range([0, boundsHeight])

    const line = d3
        .line<{ distance: number; height: number }>()
        .x((d) => x(d.distance))
        .y((d) => y(d.height))
    // .curve(d3.curveCardinal)

    const xRange = x.range()
    const xTicks = x
        .ticks(Math.floor(width / 40))
        .map((v) => ({ value: v, xOffset: x(v) }))
    const yRange = y.range()
    const yTicks = y
        .ticks(Math.floor(height / 30))
        .map((v) => ({ value: v, yOffset: y(v) }))

    return (
        <svg width={width} height={height}>
            <g
                width={boundsWidth}
                height={boundsHeight}
                transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
            >
                <path d={line(data)!} fill="none" stroke="black" />
                <path
                    d={['M', 0, yRange[0], 'L', 0, yRange[1]].join(' ')}
                    fill="none"
                    stroke="currentColor"
                />
                {yTicks.map(({ value, yOffset }) => (
                    <g key={value} transform={`translate(0, ${yOffset})`}>
                        <line x2={-6} stroke="currentColor" />
                        <text
                            key={value}
                            style={{
                                fontSize: '10px',
                                textAnchor: 'middle',
                                transform: 'translateX(-20px)',
                            }}
                        >
                            {value}
                        </text>
                    </g>
                ))}

                <g transform={`translate(0, ${boundsHeight})`}>
                    <path
                        d={['M', xRange[0], 0, 'L', xRange[1], 0].join(' ')}
                        fill="none"
                        stroke="currentColor"
                    />
                    {xTicks.map(({ value, xOffset }) => (
                        <g key={value} transform={`translate(${xOffset}, 0)`}>
                            <line y2={6} stroke="currentColor" />
                            <text
                                key={value}
                                style={{
                                    fontSize: '10px',
                                    textAnchor: 'middle',
                                    transform: 'translateY(20px)',
                                }}
                            >
                                {value}
                            </text>
                        </g>
                    ))}
                </g>
            </g>
        </svg>
    )
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
            <YoloPlot selectedGpx={selectedGpx} />
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
