import React from 'react';
import { ResponsiveLine } from '@nivo/line';

function StatsGraphs({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No stats available to graph.
            </div>
        );
    }

    // Group stats into series for Nivo
    const statMap = {};

    filteredStats.forEach(entry => {
        const date = new Date(entry.date).toLocaleDateString();
        for (const [key, value] of Object.entries(entry.stats)) {
            if (!statMap[key]) statMap[key] = [];
            const num = Number(value);
            if (!isNaN(num)) {
                statMap[key].push({ x: date, y: num });
            }
        }
    });

    const lineData = Object.entries(statMap).map(([statKey, values]) => ({
        id: statKey,
        data: values
    }));

    return (
        <div className="h-[400px]">
            <ResponsiveLine
                data={lineData}
                margin={{ top: 30, right: 80, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -35,
                    legend: 'Date',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Value',
                    legendOffset: -50,
                    legendPosition: 'middle'
                }}
                pointSize={6}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 80,
                        translateY: 0,
                        itemsSpacing: 4,
                        itemDirection: 'left-to-right',
                        itemWidth: 100,
                        itemHeight: 20,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        toggleSerie: true
                    }
                ]}
                theme={{
                    textColor: '#e5e7eb',
                    tooltip: {
                        container: {
                            background: '#1f2937',
                            color: '#fff'
                        }
                    }
                }}
            />
        </div>
    );
}

export default StatsGraphs;