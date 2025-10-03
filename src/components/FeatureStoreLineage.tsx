'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  Database,
  GitBranch,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  BarChart3,
  Link,
  FileText,
  Shield,
  TrendingUp,
  Hash,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react'

interface FeatureView {
  id: string
  name: string
  description: string
  status: 'active' | 'pending' | 'error'
  lastUpdated: string
  dataFreshness: number
  version: string
  rowCount: number
  schema: string[]
  lineage: string[]
  antiLeakageChecked: boolean
}

interface DataLineage {
  id: string
  sourceHash: string
  featureView: string
  modelArtifact: string
  backtestConfig: string
  deploymentBundle: string
  liveRunId: string
  timestamp: string
  status: 'verified' | 'pending' | 'failed'
}

interface DataContract {
  id: string
  name: string
  version: string
  status: 'active' | 'deprecated' | 'draft'
  schema: string
  lastValidated: string
  validationScore: number
  evolutionHistory: number
}

export default function FeatureStoreLineage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [lineageData, setLineageData] = useState<DataLineage[]>([])
  const [featureViews, setFeatureViews] = useState<FeatureView[]>([])
  const [dataContracts, setDataContracts] = useState<DataContract[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      // Simulate feature views data
      const mockFeatureViews: FeatureView[] = [
        {
          id: 'fv-001',
          name: 'market_ohlc_features',
          description: 'OHLCV technical indicators and price features',
          status: 'active',
          lastUpdated: '2024-01-15T10:30:00Z',
          dataFreshness: 98,
          version: 'v3.2.1',
          rowCount: 1250000,
          schema: ['open', 'high', 'low', 'close', 'volume', 'rsi', 'macd', 'bollinger_upper', 'bollinger_lower'],
          lineage: ['market_data_feed', 'technical_indicators', 'price_normalization'],
          antiLeakageChecked: true
        },
        {
          id: 'fv-002',
          name: 'sentiment_features',
          description: 'Social media sentiment and news analysis features',
          status: 'active',
          lastUpdated: '2024-01-15T10:25:00Z',
          dataFreshness: 95,
          version: 'v2.1.4',
          rowCount: 890000,
          schema: ['sentiment_score', 'news_volume', 'social_mentions', 'emotion_classification', 'topic_modeling'],
          lineage: ['twitter_api', 'news_api', 'sentiment_model', 'topic_extraction'],
          antiLeakageChecked: true
        },
        {
          id: 'fv-003',
          name: 'alternative_data_features',
          description: 'Satellite imagery and supply chain alternative data',
          status: 'pending',
          lastUpdated: '2024-01-15T09:45:00Z',
          dataFreshness: 87,
          version: 'v1.5.2',
          rowCount: 450000,
          schema: ['satellite_index', 'shipping_volume', 'inventory_levels', 'weather_impact', 'geospatial_features'],
          lineage: ['satellite_imagery', 'ais_data', 'weather_api', 'image_processing'],
          antiLeakageChecked: false
        },
        {
          id: 'fv-004',
          name: 'risk_features',
          description: 'Risk metrics and volatility features',
          status: 'active',
          lastUpdated: '2024-01-15T10:35:00Z',
          dataFreshness: 99,
          version: 'v4.0.1',
          rowCount: 2100000,
          schema: ['var_1d', 'var_5d', 'expected_shortfall', 'volatility', 'correlation_matrix', 'beta'],
          lineage: ['market_data', 'risk_models', 'correlation_analysis', 'volatility_surface'],
          antiLeakageChecked: true
        }
      ]

      // Simulate lineage data
      const mockLineageData: DataLineage[] = [
        {
          id: 'line-001',
          sourceHash: 'sha256:abc123...',
          featureView: 'market_ohlc_features',
          modelArtifact: 'neural_network_v3.2',
          backtestConfig: 'config_2024_01',
          deploymentBundle: 'bundle_789',
          liveRunId: 'run_20240115_001',
          timestamp: '2024-01-15T10:00:00Z',
          status: 'verified'
        },
        {
          id: 'line-002',
          sourceHash: 'sha256:def456...',
          featureView: 'sentiment_features',
          modelArtifact: 'sentiment_classifier_v2.1',
          backtestConfig: 'config_2024_01',
          deploymentBundle: 'bundle_790',
          liveRunId: 'run_20240115_002',
          timestamp: '2024-01-15T10:05:00Z',
          status: 'verified'
        },
        {
          id: 'line-003',
          sourceHash: 'sha256:ghi789...',
          featureView: 'alternative_data_features',
          modelArtifact: 'alternative_signal_v1.5',
          backtestConfig: 'config_2024_01',
          deploymentBundle: 'bundle_791',
          liveRunId: 'run_20240115_003',
          timestamp: '2024-01-15T09:50:00Z',
          status: 'pending'
        }
      ]

      // Simulate data contracts
      const mockDataContracts: DataContract[] = [
        {
          id: 'contract-001',
          name: 'market_data_contract',
          version: 'v2.1.0',
          status: 'active',
          schema: 'OHLCV + technical indicators',
          lastValidated: '2024-01-15T10:00:00Z',
          validationScore: 98.5,
          evolutionHistory: 12
        },
        {
          id: 'contract-002',
          name: 'sentiment_data_contract',
          version: 'v1.8.0',
          status: 'active',
          schema: 'Sentiment scores + classification',
          lastValidated: '2024-01-15T09:30:00Z',
          validationScore: 94.2,
          evolutionHistory: 8
        },
        {
          id: 'contract-003',
          name: 'alternative_data_contract',
          version: 'v1.2.0',
          status: 'draft',
          schema: 'Satellite + supply chain data',
          lastValidated: '2024-01-14T16:45:00Z',
          validationScore: 87.8,
          evolutionHistory: 5
        }
      ]

      setFeatureViews(mockFeatureViews)
      setLineageData(mockLineageData)
      setDataContracts(mockDataContracts)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'verified':
        return 'bg-green-500'
      case 'pending':
        return 'bg-yellow-500'
      case 'error':
      case 'failed':
        return 'bg-red-500'
      case 'deprecated':
        return 'bg-orange-500'
      case 'draft':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Feature Store & Lineage</h2>
          <p className="text-muted-foreground">
            Data versioning, point-in-time joins, and complete lineage tracking
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="features" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">Feature Views</TabsTrigger>
          <TabsTrigger value="lineage">Data Lineage</TabsTrigger>
          <TabsTrigger value="contracts">Data Contracts</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureViews.map((feature) => (
              <Card 
                key={feature.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedFeature === feature.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedFeature(feature.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{feature.name}</CardTitle>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(feature.status)}`} />
                  </div>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Version</span>
                    <Badge variant="secondary">{feature.version}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rows</span>
                    <span className="font-medium">{feature.rowCount.toLocaleString()}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Freshness</span>
                      <span className="font-medium">{feature.dataFreshness}%</span>
                    </div>
                    <Progress value={feature.dataFreshness} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Anti-Leakage</span>
                    {feature.antiLeakageChecked ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="font-medium">
                      {new Date(feature.lastUpdated).toLocaleTimeString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedFeature && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Feature Details: {featureViews.find(f => f.id === selectedFeature)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Schema</h4>
                    <div className="flex flex-wrap gap-1">
                      {featureViews.find(f => f.id === selectedFeature)?.schema.map((field, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Lineage</h4>
                    <div className="flex flex-wrap gap-1">
                      {featureViews.find(f => f.id === selectedFeature)?.lineage.map((source, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="lineage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Data Lineage Tracking
              </CardTitle>
              <CardDescription>
                Complete traceability from data source to live deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {lineageData.map((lineage) => (
                    <div key={lineage.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(lineage.status)}`} />
                          <span className="font-medium">{lineage.liveRunId}</span>
                        </div>
                        <Badge variant="outline">{lineage.timestamp}</Badge>
                      </div>
                      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Hash className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Source:</span>
                          <span className="font-mono text-xs">{lineage.sourceHash}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Feature:</span>
                          <span>{lineage.featureView}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Model:</span>
                          <span>{lineage.modelArtifact}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Config:</span>
                          <span>{lineage.backtestConfig}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Download className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Bundle:</span>
                          <span>{lineage.deploymentBundle}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dataContracts.map((contract) => (
              <Card key={contract.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{contract.name}</CardTitle>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(contract.status)}`} />
                  </div>
                  <CardDescription>{contract.schema}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Version</span>
                    <Badge variant="secondary">{contract.version}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Validation Score</span>
                      <span className="font-medium">{contract.validationScore}%</span>
                    </div>
                    <Progress value={contract.validationScore} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Evolution History</span>
                    <span className="font-medium">{contract.evolutionHistory} versions</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Validated</span>
                    <span className="font-medium">
                      {new Date(contract.lastValidated).toLocaleTimeString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Policy Enforcement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Data Licensing Compliance</span>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Privacy Restrictions</span>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Regional Data Rules</span>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Pre-trade Validation</span>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Overall Compliance</span>
                  <Badge className="bg-green-500">100%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Data Freshness</span>
                    <span className="font-medium">96.8%</span>
                  </div>
                  <Progress value={96.8} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Lineage Coverage</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Contract Validation</span>
                    <span className="font-medium">98.1%</span>
                  </div>
                  <Progress value={98.1} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Anti-Leakage Checks</span>
                    <span className="font-medium">91.7%</span>
                  </div>
                  <Progress value={91.7} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}