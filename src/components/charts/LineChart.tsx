import { ResponsiveLine } from '@nivo/line'

const data = [
  {
    id: 'japan',
    color: 'hsl(2, 70%, 50%)',
    data: [
      { x: 'plane', y: 275 },
      { x: 'helicopter', y: 262 },
      { x: 'boat', y: 199 },
      { x: 'train', y: 190 },
      { x: 'subway', y: 179 },
      { x: 'bus', y: 168 },
      { x: 'car', y: 142 },
      { x: 'moto', y: 112 },
      { x: 'bicycle', y: 111 },
      { x: 'horse', y: 29 },
      { x: 'skateboard', y: 25 },
      { x: 'others', y: 25 },
    ],
  },
  {
    id: 'france',
    color: 'hsl(209, 70%, 50%)',
    data: [
      { x: 'plane', y: 83 },
      { x: 'helicopter', y: 197 },
      { x: 'boat', y: 167 },
      { x: 'train', y: 279 },
      { x: 'subway', y: 269 },
      { x: 'bus', y: 190 },
      { x: 'car', y: 71 },
      { x: 'moto', y: 170 },
      { x: 'bicycle', y: 190 },
      { x: 'horse', y: 106 },
      { x: 'skateboard', y: 179 },
      { x: 'others', y: 72 },
    ],
  },
  {
    id: 'us',
    color: 'hsl(162, 70%, 50%)',
    data: [
      { x: 'plane', y: 31 },
      { x: 'helicopter', y: 154 },
      { x: 'boat', y: 6 },
      { x: 'train', y: 24 },
      { x: 'subway', y: 78 },
      { x: 'bus', y: 288 },
      { x: 'car', y: 209 },
      { x: 'moto', y: 15 },
      { x: 'bicycle', y: 222 },
      { x: 'horse', y: 182 },
      { x: 'skateboard', y: 197 },
      { x: 'others', y: 250 },
    ],
  },
]

export function LineChart() {
  return (
    <div className="h-96 w-full">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  )
}
