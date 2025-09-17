import type { Feature } from 'geojson'

export interface ChoroplethMapProps {
  data?: Array<{ id: string; value: number }>
  features?: Feature[]
  colors?: string | string[]
  domain?: [number, number]
  unknownColor?: string
  label?: string
  valueFormat?: string
  projectionTranslation?: [number, number]
  projectionRotation?: [number, number, number]
  enableGraticule?: boolean
  graticuleLineColor?: string
  borderWidth?: number
  borderColor?: string
  margin?: {
    top: number
    right: number
    bottom: number
    left: number
  }
  legends?: unknown[]
  [key: string]: unknown
}
