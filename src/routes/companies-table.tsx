import { createFileRoute } from '@tanstack/react-router'
import CompaniesData from '../components/tables/CompaniesData'

export const Route = createFileRoute('/companies-table')({
  component: CompaniesTablePage,
})

function CompaniesTablePage() {
  return (
    <div className="p-6">
      <CompaniesData />
    </div>
  )
}