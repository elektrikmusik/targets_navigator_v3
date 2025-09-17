import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { PieChart } from '@/components/charts/PieChart'
import { ChoroplethMap } from '@/components/charts/ChoroplethMap'
import { ContactForm } from '@/components/forms/ContactForm'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'

function Demo() {
  const { t, i18n } = useTranslation()
  const { count, increment, decrement, reset } = useAppStore()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">{t('welcome')}</h1>
        <p className="text-xl text-muted-foreground mt-4">{t('description')}</p>
      </div>

      {/* Language Switcher */}
      <div className="flex justify-center space-x-2">
        <Button
          variant={i18n.language === 'en' ? 'default' : 'outline'}
          onClick={() => changeLanguage('en')}
        >
          English
        </Button>
        <Button
          variant={i18n.language === 'es' ? 'default' : 'outline'}
          onClick={() => changeLanguage('es')}
        >
          Español
        </Button>
      </div>

      {/* State Management Demo */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          State Management (Zustand)
        </h2>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-6xl font-bold">{count}</div>
          <div className="flex space-x-2">
            <Button onClick={decrement} variant="outline">
              {t('decrement')}
            </Button>
            <Button onClick={increment}>{t('increment')}</Button>
            <Button onClick={reset} variant="destructive">
              {t('reset')}
            </Button>
          </div>
        </div>
      </div>

      {/* Charts Demo */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Data Visualization (Nivo)</h2>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Choropleth Map</h3>
          <ChoroplethMap
            width={600}
            height={400}
            colors="blues"
            domain={[0, 1000000]}
            enableGraticule={true}
            fittingMode="centered"
          />
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Line Chart</h3>
          <LineChart />
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Bar Chart</h3>
          <BarChart />
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Pie Chart</h3>
          <PieChart />
        </div>
      </div>

      {/* Forms Demo */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Forms (React Hook Form + Zod)
        </h2>
        <ContactForm />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/demo')({
  component: Demo,
})
