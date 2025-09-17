import { createFileRoute } from '@tanstack/react-router'
import { TerritoryVisualization } from '../components/charts/TerritoryVisualization'

export const Route = createFileRoute('/territories')({
  component: Territories,
})

function Territories() {
  return (
    <div className="container mx-auto p-6">
      <TerritoryVisualization />
    </div>
  )
}
