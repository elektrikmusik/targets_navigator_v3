import { createFileRoute } from '@tanstack/react-router'
import { ChoroplethMap } from '../components/charts/ChoroplethMap'
import { useState } from 'react'
import { BUSINESS_TERRITORIES, type TerritoryId } from '../lib/territories'

export const Route = createFileRoute('/map')({
  component: Map,
})

function Map() {
  const [mode, setMode] = useState<'canvas' | 'svg'>('canvas')
  const [fittingMode, setFittingMode] = useState<
    'centered' | 'north-focused' | 'equatorial'
  >('centered')
  const [excludeAntarctica, setExcludeAntarctica] = useState(true)

  // Territory controls
  const [territoryMode, setTerritoryMode] = useState<'country' | 'territory'>(
    'country'
  )
  const [selectedTerritory, setSelectedTerritory] =
    useState<TerritoryId | null>(null)
  const [showTerritoryBorders, setShowTerritoryBorders] = useState(true)

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Unified Choropleth Map</h1>
        <p className="text-gray-600 mb-6">
          A single, unified ChoroplethMap component that combines all features
          from the previous multiple components.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Rendering Mode
            </label>
            <select
              value={mode}
              onChange={e => setMode(e.target.value as 'canvas' | 'svg')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Rendering mode"
            >
              <option value="canvas">Canvas (High Performance)</option>
              <option value="svg">SVG (Interactive)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Fitting Mode
            </label>
            <select
              value={fittingMode}
              onChange={e =>
                setFittingMode(
                  e.target.value as 'centered' | 'north-focused' | 'equatorial'
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Fitting mode"
            >
              <option value="centered">Centered (Recommended)</option>
              <option value="north-focused">North-Focused</option>
              <option value="equatorial">Equatorial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Antarctica</label>
            <select
              value={excludeAntarctica ? 'exclude' : 'include'}
              onChange={e => setExcludeAntarctica(e.target.value === 'exclude')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Antarctica inclusion"
            >
              <option value="exclude">Exclude Antarctica</option>
              <option value="include">Include Antarctica</option>
            </select>
          </div>
        </div>

        {/* Territory Controls */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">
            Business Territories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                View Mode
              </label>
              <select
                value={territoryMode}
                onChange={e =>
                  setTerritoryMode(e.target.value as 'country' | 'territory')
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Territory view mode"
              >
                <option value="country">Country View</option>
                <option value="territory">Territory View</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Filter Territory
              </label>
              <select
                value={selectedTerritory || ''}
                onChange={e =>
                  setSelectedTerritory((e.target.value as TerritoryId) || null)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Territory filter"
              >
                <option value="">All Territories</option>
                {BUSINESS_TERRITORIES.map(territory => (
                  <option key={territory.id} value={territory.id}>
                    {territory.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Territory Borders
              </label>
              <select
                value={showTerritoryBorders ? 'show' : 'hide'}
                onChange={e =>
                  setShowTerritoryBorders(e.target.value === 'show')
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Territory borders"
              >
                <option value="show">Show Borders</option>
                <option value="hide">Hide Borders</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Map Preview</h2>
        <div className="flex justify-center">
          <ChoroplethMap
            mode={mode}
            width={600}
            height={400}
            colors="blues"
            domain={[0, 1000000]}
            enableGraticule={true}
            fittingMode={fittingMode}
            excludeAntarctica={excludeAntarctica}
            territoryMode={territoryMode}
            selectedTerritory={selectedTerritory}
            showTerritoryBorders={showTerritoryBorders}
          />
        </div>
      </div>

      {/* Code Example */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Code Example</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
          {`<ChoroplethMap 
  mode="${mode}"
  width={600}
  height={400}
  colors="blues"
  domain={[0, 1000000]}
  enableGraticule={true}
  fittingMode="${fittingMode}"
  excludeAntarctica={${excludeAntarctica}}
  territoryMode="${territoryMode}"
  selectedTerritory="${selectedTerritory || 'null'}"
  showTerritoryBorders={${showTerritoryBorders}}
/>`}
        </pre>
      </div>

      {/* Features */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">
          Unified Component Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">
              Rendering Modes
            </h3>
            <ul className="text-blue-700 space-y-1">
              <li>• Canvas mode for high performance</li>
              <li>• SVG mode for interactivity</li>
              <li>• Automatic data loading</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">
              Fitting Options
            </h3>
            <ul className="text-blue-700 space-y-1">
              <li>• Centered (optimized for no Antarctica)</li>
              <li>• North-focused (Arctic regions)</li>
              <li>• Equatorial (balanced view)</li>
              <li>• Custom translation/rotation</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Data Options</h3>
            <ul className="text-blue-700 space-y-1">
              <li>• Exclude/include Antarctica</li>
              <li>• Exclude specific countries</li>
              <li>• Use sample data or custom data</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">
              Business Territories
            </h3>
            <ul className="text-blue-700 space-y-1">
              <li>• APAC (Asia Pacific)</li>
              <li>• AMER (Americas)</li>
              <li>• MENA (Middle East & North Africa)</li>
              <li>• EUROPE (Europe)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">
              Territory Features
            </h3>
            <ul className="text-blue-700 space-y-1">
              <li>• Country and territory view modes</li>
              <li>• Territory filtering</li>
              <li>• Territory-specific coloring</li>
              <li>• Territory statistics</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Styling</h3>
            <ul className="text-blue-700 space-y-1">
              <li>• All Nivo color schemes</li>
              <li>• Custom domains and legends</li>
              <li>• Graticule and borders</li>
              <li>• Responsive sizing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
