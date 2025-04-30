import React from 'react';
import { ResponsiveLine } from '@nivo/line';

function StatsGraphs({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No stats to show yet – log a game to get started!
            </div>
        );
    }

    // Convert stats to Nivo format
    const statKeys = Object.keys(filteredStats[0].stats);
    const dataByStat = statKeys.map(stat => ({
        id: stat,
        data: filteredStats.map((entry, index) => ({
            x: `Game ${index + 1}`,
            y: Number(entry.stats[stat]) || 0
        }))
    }));

    return (
        <div className="h-[400px] bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-center text-green-600 dark:text-green-300">
                📈 Stat Growth Over Time
            </h3>
            <ResponsiveLine
                data={dataByStat}
                margin={{ top: 40, right: 60, bottom: 50, left: 50 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Games',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Stat Value',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: 'category10' }}
                pointSize={8}
                pointBorderWidth={2}
                enableSlices="x"
                useMesh={true}
                legends={[
                    {
                        anchor: 'top-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemTextColor: '#444',
                        symbolSize: 12,
                        symbolShape: 'circle'
                    }
                ]}
            />
        </div>
    );
}

export default StatsGraphs;