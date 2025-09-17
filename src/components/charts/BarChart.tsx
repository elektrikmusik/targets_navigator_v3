import { ResponsiveBar } from '@nivo/bar'

const data = [
  {
    country: 'AD',
    'hot dog': 137,
    'hot dogColor': 'hsl(229, 70%, 50%)',
    burger: 96,
    burgerColor: 'hsl(296, 70%, 50%)',
    sandwich: 72,
    sandwichColor: 'hsl(97, 70%, 50%)',
    kebab: 140,
    kebabColor: 'hsl(340, 70%, 50%)',
    fries: 117,
    friesColor: 'hsl(72, 70%, 50%)',
    donut: 89,
    donutColor: 'hsl(257, 70%, 50%)',
  },
  {
    country: 'AE',
    'hot dog': 55,
    'hot dogColor': 'hsl(307, 70%, 50%)',
    burger: 28,
    burgerColor: 'hsl(111, 70%, 50%)',
    sandwich: 58,
    sandwichColor: 'hsl(54, 70%, 50%)',
    kebab: 29,
    kebabColor: 'hsl(285, 70%, 50%)',
    fries: 32,
    friesColor: 'hsl(206, 70%, 50%)',
    donut: 7,
    donutColor: 'hsl(63, 70%, 50%)',
  },
  {
    country: 'AF',
    'hot dog': 109,
    'hot dogColor': 'hsl(71, 70%, 50%)',
    burger: 23,
    burgerColor: 'hsl(120, 70%, 50%)',
    sandwich: 34,
    sandwichColor: 'hsl(61, 70%, 50%)',
    kebab: 152,
    kebabColor: 'hsl(256, 70%, 50%)',
    fries: 147,
    friesColor: 'hsl(325, 70%, 50%)',
    donut: 47,
    donutColor: 'hsl(60, 70%, 50%)',
  },
  {
    country: 'AG',
    'hot dog': 133,
    'hot dogColor': 'hsl(257, 70%, 50%)',
    burger: 52,
    burgerColor: 'hsl(326, 70%, 50%)',
    sandwich: 43,
    sandwichColor: 'hsl(114, 70%, 50%)',
    kebab: 83,
    kebabColor: 'hsl(285, 70%, 50%)',
    fries: 111,
    friesColor: 'hsl(54, 70%, 50%)',
    donut: 44,
    donutColor: 'hsl(54, 70%, 50%)',
  },
  {
    country: 'AI',
    'hot dog': 81,
    'hot dogColor': 'hsl(190, 70%, 50%)',
    burger: 80,
    burgerColor: 'hsl(325, 70%, 50%)',
    sandwich: 112,
    sandwichColor: 'hsl(54, 70%, 50%)',
    kebab: 35,
    kebabColor: 'hsl(285, 70%, 50%)',
    fries: 146,
    friesColor: 'hsl(305, 70%, 50%)',
    donut: 170,
    donutColor: 'hsl(128, 70%, 50%)',
  },
  {
    country: 'AL',
    'hot dog': 66,
    'hot dogColor': 'hsl(208, 70%, 50%)',
    burger: 111,
    burgerColor: 'hsl(334, 70%, 50%)',
    sandwich: 167,
    sandwichColor: 'hsl(314, 70%, 50%)',
    kebab: 144,
    kebabColor: 'hsl(211, 70%, 50%)',
    fries: 91,
    friesColor: 'hsl(29, 70%, 50%)',
    donut: 75,
    donutColor: 'hsl(200, 70%, 50%)',
  },
]

export function BarChart() {
  return (
    <div className="h-96 w-full">
      <ResponsiveBar
        data={data}
        keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'fries',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'sandwich',
            },
            id: 'lines',
          },
        ]}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'food',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e =>
          `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`
        }
      />
    </div>
  )
}
