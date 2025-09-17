export const validateWorldData = (
  data: unknown
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (!data) {
    errors.push('Data is null or undefined')
    return { isValid: false, errors }
  }

  if (typeof data !== 'object') {
    errors.push('Data is not an object')
    return { isValid: false, errors }
  }

  if (data.type !== 'FeatureCollection') {
    errors.push(`Expected type 'FeatureCollection', got '${data.type}'`)
  }

  if (!Array.isArray(data.features)) {
    errors.push('Features is not an array')
    return { isValid: false, errors }
  }

  if (data.features.length === 0) {
    errors.push('Features array is empty')
  }

  // Check first few features
  const sampleFeatures = data.features.slice(0, 3)
  sampleFeatures.forEach((feature: unknown, index: number) => {
    if (!feature.type || feature.type !== 'Feature') {
      errors.push(`Feature ${index} is not a valid GeoJSON Feature`)
    }
    if (!feature.geometry) {
      errors.push(`Feature ${index} is missing geometry`)
    }
    if (!feature.properties) {
      errors.push(`Feature ${index} is missing properties`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const logDataInfo = (data: unknown, label: string = 'Data') => {
  console.group(`🔍 ${label} Validation`)

  const validation = validateWorldData(data)

  if (validation.isValid) {
    console.log('✅ Data is valid')
    console.log(`📊 Features count: ${data.features.length}`)
    console.log(`📏 Data size: ${JSON.stringify(data).length} characters`)
  } else {
    console.error('❌ Data validation failed:')
    validation.errors.forEach(error => console.error(`  - ${error}`))
  }

  console.groupEnd()

  return validation
}
