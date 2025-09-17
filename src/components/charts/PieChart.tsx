import { ResponsivePie } from '@nivo/pie'

const data = [
  {
    id: 'elixir',
    label: 'elixir',
    value: 195,
    color: 'hsl(90, 70%, 50%)',
  },
  {
    id: 'sass',
    label: 'sass',
    value: 419,
    color: 'hsl(340, 70%, 50%)',
  },
  {
    id: 'hack',
    label: 'hack',
    value: 407,
    color: 'hsl(25, 70%, 50%)',
  },
  {
    id: 'javascript',
    label: 'javascript',
    value: 237,
    color: 'hsl(110, 70%, 50%)',
  },
  {
    id: 'ruby',
    label: 'ruby',
    value: 301,
    color: 'hsl(53, 70%, 50%)',
  },
  {
    id: 'haskell',
    label: 'haskell',
    value: 334,
    color: 'hsl(257, 70%, 50%)',
  },
  {
    id: 'go',
    label: 'go',
    value: 351,
    color: 'hsl(186, 70%, 50%)',
  },
  {
    id: 'python',
    label: 'python',
    value: 91,
    color: 'hsl(104, 70%, 50%)',
  },
  {
    id: 'scala',
    label: 'scala',
    value: 14,
    color: 'hsl(162, 70%, 50%)',
  },
  {
    id: 'apex',
    label: 'apex',
    value: 38,
    color: 'hsl(291, 70%, 50%)',
  },
  {
    id: 'prolog',
    label: 'prolog',
    value: 81,
    color: 'hsl(229, 70%, 50%)',
  },
  {
    id: 'react',
    label: 'react',
    value: 148,
    color: 'hsl(344, 70%, 50%)',
  },
  {
    id: 'php',
    label: 'php',
    value: 16,
    color: 'hsl(222, 70%, 50%)',
  },
  {
    id: 'vue',
    label: 'vue',
    value: 397,
    color: 'hsl(22, 70%, 50%)',
  },
  {
    id: 'R',
    label: 'R',
    value: 217,
    color: 'hsl(142, 70%, 50%)',
  },
  {
    id: 'erlang',
    label: 'erlang',
    value: 106,
    color: 'hsl(190, 70%, 50%)',
  },
  {
    id: 'fortran',
    label: 'fortran',
    value: 323,
    color: 'hsl(60, 70%, 50%)',
  },
  {
    id: 'c++',
    label: 'c++',
    value: 368,
    color: 'hsl(196, 70%, 50%)',
  },
]

export function PieChart() {
  return (
    <div className="h-96 w-full">
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'ruby',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'c',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'go',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'python',
            },
            id: 'lines',
          },
        ]}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  )
}
