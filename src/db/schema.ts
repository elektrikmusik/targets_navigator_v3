// Database schema definitions
// This file contains your database table schemas and types

export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Territory {
  id: string
  name: string
  code: string
  type: 'country' | 'state' | 'province' | 'region'
  parent_id?: string
  geometry?: GeoJSON.Geometry // GeoJSON geometry
  properties?: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface TerritoryData {
  id: string
  territory_id: string
  metric_name: string
  value: number
  year: number
  metadata?: Record<string, unknown>
  created_at: string
  updated_at: string
}

// Company Profile Table
export interface CompaniesProfile {
  id: number
  created_at: string
  englishName?: string
  companyName?: string
  EvaluationDate?: string
  basicInformation?: string
  missionVisionValues?: string
  historyBackground?: string
  productServices?: string
  productTags?: string
  marketPosition?: string
  visualElement?: string
  narrative?: string
  key: number
  executiveTeam?: string
  customerSegments?: string
  products?: string
  news_md?: string
  sentiment_md?: string
  strategicFit?: number
  abilityToExecute?: number
  overallScore?: number
  website?: string
  sec_code?: string
  ticker?: string
  stock_market?: string
  country?: string
  ceres_region?: string
  company_state?: string
  parent_company_name?: string
  primaryMarket?: string
  marketShare?: number
  secondaryMarket?: string
  marketRegion?: string
  businessModel?: string
  logoUrl?: string
  parentRevenue?: number
  Tier?: string
  rankingCategory?: string
  rankingRationale?: string
  rankingLicenseRationale?: string
  rankingData?: string
  rankingFocus?: string
}

// Company Financial Table
export interface CompanyFinancial {
  id: number
  created_at: string
  companyName?: string
  englishName?: string
  annual_revenue?: number
  revenue_score?: number
  revenue_justification?: string
  '3Y_score'?: number
  '3Y_justification'?: string
  netProfitScore?: number
  netProfitJustification?: string
  investCapacityScore?: number
  investCapacityJustification?: string
  overallRating?: string
  financialSummary?: string
  revenueTrend?: string
  profitabilityAssessment?: string
  investmentReadiness?: string
  financialReserach?: Record<string, unknown>
  evaluation_date?: string
  finance_score?: number
  key?: number
  structure?: string
  groupName?: string
  groupRevenue?: number
  revenueScoreRev?: number
  growthRate?: number
  netProfitMargin?: number
}

// Companies Calibration Table
export interface CompaniesCalibration {
  Territory?: string
  Category?: string
  'Category rationale'?: string
  Company: string
  'Licensing Rationale'?: string
  'Data point'?: string
  'Technology focus'?: string
}

// Companies Hydrogen Table
export interface CompaniesHydrogen {
  id: number
  created_at?: string
  englishName: string
  companyName: string
  EvaluationDate?: string
  H2investScore?: number
  H2investJustification?: string
  H2partnersScore?: number
  H2partnersJustification?: string
  H2TechScore?: number
  H2TechJustification?: string
  H2CommitScore?: number
  H2CommitJustification?: string
  H2ParticipationScore?: number
  H2ParticipationJustification?: string
  H2OverallRating?: string
  H2Summary?: string
  H2investmentFocus?: string
  H2partnershipStrategy?: string
  H2technologyReadiness?: string
  H2marketPositioning?: string
  H2Research?: string
  key?: number
  H2Score?: number
}

// Companies Industry Table
export interface CompaniesIndustry {
  id: number
  created_at: string
  companyName?: string
  evaluation_date?: string
  core_business_score?: number
  core_business_justification?: string
  technology_score?: number
  technology_justification?: string
  market_score?: number
  market_justification?: string
  rationale?: string
  opportunities?: string
  industry_output?: Record<string, unknown>
  englishName?: string
  key?: number
  industry_score?: number
}

// Companies IP Revision Table
export interface CompaniesIpRevision {
  id: number
  created_at: string
  englishName?: string
  companyName?: string
  IPRelevantPatentsScore?: number
  IPRelevantPatentsJustification?: string
  IPCeresCitationsScore?: number
  IPCeresCitationsJustification?: string
  IPPortfolioGrowthScore?: number
  IPPortfolioGrowthJustification?: string
  IPFilingRecencyScore?: number
  IPFilingRecencyJustification?: string
  IPOverallRating?: string
  IPStrategySummary?: string
  IPResearch?: Record<string, unknown>
  IPActivityScore?: number
  key?: number
  evaluationDate?: string
  ipInsights?: Record<string, unknown>
  patentResearch?: Record<string, unknown>
  sofcCount?: number
  sofcDescription?: string
  sofcTrend?: string
  soecCount?: number
  soecDescription?: string
  soecTrend?: string
  fcCount?: number
  fcDescription?: string
  fcTrend?: string
  industryPosition?: string
  differentiators?: string
  emergingFocus?: string
  innovation_activity?: string
  competitive_position?: string
  technology_alignment?: string
  partnership_potential?: string
}

// Companies Manufacturing Table
export interface CompaniesManufacturing {
  id: number
  englishName?: string
  companyName?: string
  EvaluationDate?: string
  ManufacturingMaterialsScore?: number
  ManufacturingMaterialsJustification?: string
  ManufacturingScaleScore?: number
  ManufacturingScaleJustification?: string
  ManufacturingQualityScore?: number
  ManufacturingQualityJustification?: string
  ManufacturingSupplyChainScore?: number
  ManufacturingSupplyChainJustification?: string
  ManufacturingRDScore?: number
  ManufacturingRDJustification?: string
  ManufacturingOverallRating?: string
  ManufacturingSummary?: string
  ManufacturingResearch?: string
  key?: number
  manufacturing_score?: number
}

// Company Overview Table
export interface CompanyOverview {
  key?: number
  englishName?: string
  companyName?: string
  logoUrl?: string
  website?: string
  country?: string
  ceres_region?: string
  company_state?: string
  parent_company_name?: string
  ticker?: string
  visualElement?: string
  primaryMarket?: string
  businessModel?: string
  Tier?: string
  overallScore?: number
  strategicFit?: number
  abilityToExecute?: number
  annual_revenue?: number
  finance_score?: number
  financial_rating?: string
  industry_score?: number
  industry_rationale?: string
  H2Score?: number
  H2OverallRating?: string
  IPActivityScore?: number
  IPOverallRating?: string
  manufacturing_score?: number
  ManufacturingOverallRating?: string
  OwnershipScore?: number
  OwnershipOverallRating?: string
}

// Scoring Weights Table
export interface ScoringWeights {
  id: number
  created_at: string
  criteria?: string
  weight?: number
}

// Example queries and mutations
export const queries = {
  // Add your query functions here
}

export const mutations = {
  // Add your mutation functions here
}
