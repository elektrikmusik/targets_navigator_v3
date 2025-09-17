import React from 'react'
import { ChoroplethMap } from './ChoroplethMap'
import { BUSINESS_TERRITORIES, type TerritoryId } from '../../lib/territories'

export const TerritoryVisualization: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Business Territory Visualization
        </h2>
        <p className="text-gray-600 mb-6">
          Explore your business data across different territories: APAC, AMER,
          MENA, and EUROPE.
        </p>
      </div>

      {/* Territory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {BUSINESS_TERRITORIES.map(territory => (
          <div key={territory.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
              <div
                className="w-4 h-4 rounded mr-2"
                style={{ backgroundColor: territory.color }}
              />
              <h3 className="font-semibold text-lg">{territory.name}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {territory.description}
            </p>
            <p className="text-xs text-gray-500">
              {territory.countries.length} countries
            </p>
          </div>
        ))}
      </div>

      {/* Country View */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">
          Country View - Territory Colors
        </h3>
        <p className="text-gray-600 mb-4">
          Countries are colored by their assigned territory. Each territory has
          a distinct color scheme.
        </p>
        <div className="flex justify-center">
          <ChoroplethMap
            mode="canvas"
            width={800}
            height={500}
            territoryMode="country"
            fittingMode="centered"
            excludeAntarctica={true}
            enableGraticule={true}
          />
        </div>
      </div>

      {/* Territory View */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">
          Territory View - Aggregated Data
        </h3>
        <p className="text-gray-600 mb-4">
          Data is aggregated by territory, showing the total value for each
          business region.
        </p>
        <div className="flex justify-center">
          <ChoroplethMap
            mode="canvas"
            width={800}
            height={500}
            territoryMode="territory"
            fittingMode="centered"
            excludeAntarctica={true}
            enableGraticule={true}
          />
        </div>
      </div>

      {/* Individual Territory Examples */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Individual Territory Focus</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {BUSINESS_TERRITORIES.map(territory => (
            <div
              key={territory.id}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-6 h-6 rounded mr-3"
                  style={{ backgroundColor: territory.color }}
                />
                <h4 className="text-lg font-semibold">{territory.name}</h4>
              </div>
              <div className="flex justify-center">
                <ChoroplethMap
                  mode="canvas"
                  width={400}
                  height={300}
                  territoryMode="country"
                  selectedTerritory={territory.id as TerritoryId}
                  fittingMode="centered"
                  excludeAntarctica={true}
                  enableGraticule={true}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TerritoryVisualization
