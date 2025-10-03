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
  Network,
  GitBranch,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  ScatterChart,
  PieChart,
  Target,
  Zap,
  Brain,
  Eye,
  EyeOff,
  RefreshCw,
  Settings,
  Download,
  Upload,
  Calculator,
  Database,
  Cpu,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Hexagon,
  Layers,
  Box,
  Package
} from 'lucide-react'

interface TDAModel {
  id: string
  name: string
  type: 'mapper' | 'persistent_homology' | 'witness_complex' | 'alpha_complex'
  description: string
  status: 'trained' | 'training' | 'failed' | 'pending'
  lastTrained: string
  parameters: {
    resolution?: number
    gain?: number
    dimension?: number
    clusterSize?: number
    persistenceThreshold?: number
  }
  performance: {
    silhouetteScore: number
    daviesBouldin: number
    calinskiHarabasz: number
    regimeAccuracy: number
  }
  dataPoints: number
  features: number
  regimes: number
}

interface RegimeCluster {
  id: string
  name: string
  description: string
  characteristics: {
    volatility: 'low' | 'medium' | 'high'
    trend: 'bullish' | 'bearish' | 'sideways'
    correlation: 'low' | 'medium' | 'high'
    volume: 'low' | 'medium' | 'high'
  }
  persistence: number
  stability: number
  frequency: number
  duration: {
    min: number
    max: number
    avg: number
  }
  topologicalFeatures: {
    bettiNumbers: number[]
    persistenceDiagram: string
    eulerCharacteristic: number
  }
  performance: {
    avgReturn: number
    volatility: number
    sharpe: number
    maxDrawdown: number
  }
  lastObserved: string
}

interface MetaLabelingModel {
  id: string
  name: string
  baseSignals: string[]
  metaFeatures: string[]
  algorithm: 'random_forest' | 'gradient_boosting' | 'neural_network' | 'svm'
  status: 'active' | 'training' | 'failed'
  performance: {
    accuracy: number
    precision: number
    recall: number
    f1Score: number
    auc: number
  }
  featureImportance: {
    feature: string
    importance: number
  }[]
  lastTrained: string
  predictions: number
  hitRate: number
}

interface ForecastEvaluation {
  id: string
  modelName: string
  forecastType: 'regime' | 'return' | 'volatility' | 'correlation'
  scoringMethod: 'CRPS' | 'Brier' | 'LogLoss' | 'RMSE'
  score: number
  benchmark: number
  improvement: number
  samples: number
  timeHorizon: string
  lastEvaluated: string
  calibration: {
    reliability: number
    sharpness: number
    resolution: number
  }
}

interface TopologicalFeature {
  id: string
  type: 'connected_component' | 'loop' | 'void' | 'higher_dimension'
  dimension: number
  birth: number
  death: number
  persistence: number
  significance: number
  interpretation: string
  associatedRegime: string
}

export default function TopologicalDataAnalysis() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [isTraining, setIsTraining] = useState(false)
  const [tdaModels, setTdaModels] = useState<TDAModel[]>([])
  const [regimeClusters, setRegimeClusters] = useState<RegimeCluster[]>([])
  const [metaLabelingModels, setMetaLabelingModels] = useState<MetaLabelingModel[]>([])
  const [forecastEvaluations, setForecastEvaluations] = useState<ForecastEvaluation[]>([])
  const [topologicalFeatures, setTopologicalFeatures] = useState<TopologicalFeature[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      // Simulate TDA models
      const mockTDAModels: TDAModel[] = [
        {
          id: 'tda-001',
          name: 'Market Regime Mapper',
          type: 'mapper',
          description: 'Mapper algorithm for topological analysis of market regimes',
          status: 'trained',
          lastTrained: '2025-10-03T10:30:00Z',
          parameters: {
            resolution: 15,
            gain: 0.3,
            clusterSize: 10
          },
          performance: {
            silhouetteScore: 0.723,
            daviesBouldin: 0.456,
            calinskiHarabasz: 1234.56,
            regimeAccuracy: 0.847
          },
          dataPoints: 50000,
          features: 25,
          regimes: 5
        },
        {
          id: 'tda-002',
          name: 'Persistent Homology Engine',
          type: 'persistent_homology',
          description: 'Persistent homology analysis for market structure detection',
          status: 'trained',
          lastTrained: '2025-10-03T10:25:00Z',
          parameters: {
            dimension: 3,
            persistenceThreshold: 0.1
          },
          performance: {
            silhouetteScore: 0.689,
            daviesBouldin: 0.523,
            calinskiHarabasz: 987.65,
            regimeAccuracy: 0.812
          },
          dataPoints: 75000,
          features: 30,
          regimes: 4
        },
        {
          id: 'tda-003',
          name: 'Witness Complex Analyzer',
          type: 'witness_complex',
          description: 'Witness complex for high-dimensional market data analysis',
          status: 'training',
          lastTrained: '2025-10-03T10:20:00Z',
          parameters: {
            dimension: 4,
            clusterSize: 8
          },
          performance: {
            silhouetteScore: 0.645,
            daviesBouldin: 0.587,
            calinskiHarabasz: 876.54,
            regimeAccuracy: 0.789
          },
          dataPoints: 100000,
          features: 40,
          regimes: 6
        }
      ]

      // Simulate regime clusters
      const mockRegimeClusters: RegimeCluster[] = [
        {
          id: 'regime-001',
          name: 'Bull Market Low Vol',
          description: 'Strong uptrend with low volatility and high correlation',
          characteristics: {
            volatility: 'low',
            trend: 'bullish',
            correlation: 'high',
            volume: 'medium'
          },
          persistence: 0.78,
          stability: 0.85,
          frequency: 0.25,
          duration: {
            min: 30,
            max: 180,
            avg: 75
          },
          topologicalFeatures: {
            bettiNumbers: [1, 3, 1],
            persistenceDiagram: 'diagram_001_base64',
            eulerCharacteristic: -1
          },
          performance: {
            avgReturn: 0.0123,
            volatility: 0.087,
            sharpe: 1.41,
            maxDrawdown: -0.056
          },
          lastObserved: '2025-10-03T10:30:00Z'
        },
        {
          id: 'regime-002',
          name: 'Bear Market High Vol',
          description: 'Downtrend with high volatility and low correlation',
          characteristics: {
            volatility: 'high',
            trend: 'bearish',
            correlation: 'low',
            volume: 'high'
          },
          persistence: 0.65,
          stability: 0.72,
          frequency: 0.15,
          duration: {
            min: 15,
            max: 90,
            avg: 45
          },
          topologicalFeatures: {
            bettiNumbers: [1, 5, 2],
            persistenceDiagram: 'diagram_002_base64',
            eulerCharacteristic: -2
          },
          performance: {
            avgReturn: -0.0087,
            volatility: 0.234,
            sharpe: -0.37,
            maxDrawdown: -0.187
          },
          lastObserved: '2025-10-03T10:25:00Z'
        },
        {
          id: 'regime-003',
          name: 'Sideways Mean Reversion',
          description: 'Range-bound market with medium volatility and mean reversion',
          characteristics: {
            volatility: 'medium',
            trend: 'sideways',
            correlation: 'medium',
            volume: 'low'
          },
          persistence: 0.82,
          stability: 0.89,
          frequency: 0.35,
          duration: {
            min: 20,
            max: 120,
            avg: 60
          },
          topologicalFeatures: {
            bettiNumbers: [1, 2, 0],
            persistenceDiagram: 'diagram_003_base64',
            eulerCharacteristic: 0
          },
          performance: {
            avgReturn: 0.0023,
            volatility: 0.123,
            sharpe: 0.19,
            maxDrawdown: -0.089
          },
          lastObserved: '2025-10-03T10:20:00Z'
        },
        {
          id: 'regime-004',
          name: 'Transition Chaos',
          description: 'High-dimensional transition state with complex topology',
          characteristics: {
            volatility: 'high',
            trend: 'sideways',
            correlation: 'low',
            volume: 'high'
          },
          persistence: 0.45,
          stability: 0.56,
          frequency: 0.10,
          duration: {
            min: 5,
            max: 30,
            avg: 15
          },
          topologicalFeatures: {
            bettiNumbers: [1, 8, 4],
            persistenceDiagram: 'diagram_004_base64',
            eulerCharacteristic: -3
          },
          performance: {
            avgReturn: -0.0034,
            volatility: 0.198,
            sharpe: -0.17,
            maxDrawdown: -0.123
          },
          lastObserved: '2025-10-03T10:15:00Z'
        }
      ]

      // Simulate meta-labeling models
      const mockMetaLabelingModels: MetaLabelingModel[] = [
        {
          id: 'meta-001',
          name: 'Signal Filter Meta-Model',
          baseSignals: ['momentum', 'mean_reversion', 'breakout', 'sentiment'],
          metaFeatures: ['regime', 'volatility_regime', 'correlation_regime', 'volume_regime'],
          algorithm: 'gradient_boosting',
          status: 'active',
          performance: {
            accuracy: 0.734,
            precision: 0.712,
            recall: 0.689,
            f1Score: 0.700,
            auc: 0.789
          },
          featureImportance: [
            { feature: 'regime_bull_low_vol', importance: 0.234 },
            { feature: 'volatility_regime', importance: 0.187 },
            { feature: 'correlation_regime', importance: 0.156 },
            { feature: 'base_signal_strength', importance: 0.123 },
            { feature: 'volume_regime', importance: 0.098 }
          ],
          lastTrained: '2025-10-03T10:30:00Z',
          predictions: 1250,
          hitRate: 0.687
        },
        {
          id: 'meta-002',
          name: 'Position Sizer Meta-Model',
          baseSignals: ['momentum', 'mean_reversion'],
          metaFeatures: ['regime_persistence', 'topological_complexity', 'market_stress'],
          algorithm: 'neural_network',
          status: 'active',
          performance: {
            accuracy: 0.698,
            precision: 0.676,
            recall: 0.645,
            f1Score: 0.660,
            auc: 0.756
          },
          featureImportance: [
            { feature: 'regime_persistence', importance: 0.287 },
            { feature: 'topological_complexity', importance: 0.234 },
            { feature: 'market_stress', importance: 0.198 },
            { feature: 'base_signal_confidence', importance: 0.145 },
            { feature: 'liquidity_regime', importance: 0.089 }
          ],
          lastTrained: '2025-10-03T10:25:00Z',
          predictions: 890,
          hitRate: 0.654
        }
      ]

      // Simulate forecast evaluations
      const mockForecastEvaluations: ForecastEvaluation[] = [
        {
          id: 'eval-001',
          modelName: 'Regime Transition Forecaster',
          forecastType: 'regime',
          scoringMethod: 'CRPS',
          score: 0.123,
          benchmark: 0.156,
          improvement: 0.212,
          samples: 500,
          timeHorizon: '1W',
          lastEvaluated: '2025-10-03T10:30:00Z',
          calibration: {
            reliability: 0.876,
            sharpness: 0.234,
            resolution: 0.789
          }
        },
        {
          id: 'eval-002',
          modelName: 'Volatility Forecaster',
          forecastType: 'volatility',
          scoringMethod: 'CRPS',
          score: 0.089,
          benchmark: 0.112,
          improvement: 0.205,
          samples: 750,
          timeHorizon: '1M',
          lastEvaluated: '2025-10-03T10:25:00Z',
          calibration: {
            reliability: 0.823,
            sharpness: 0.198,
            resolution: 0.745
          }
        },
        {
          id: 'eval-003',
          modelName: 'Return Probabilistic Model',
          forecastType: 'return',
          scoringMethod: 'Brier',
          score: 0.234,
          benchmark: 0.267,
          improvement: 0.124,
          samples: 1000,
          timeHorizon: '2W',
          lastEvaluated: '2025-10-03T10:20:00Z',
          calibration: {
            reliability: 0.789,
            sharpness: 0.267,
            resolution: 0.712
          }
        }
      ]

      // Simulate topological features
      const mockTopologicalFeatures: TopologicalFeature[] = [
        {
          id: 'feature-001',
          type: 'connected_component',
          dimension: 0,
          birth: 0.1,
          death: 0.8,
          persistence: 0.7,
          significance: 0.89,
          interpretation: 'Primary market regime cluster',
          associatedRegime: 'Bull Market Low Vol'
        },
        {
          id: 'feature-002',
          type: 'loop',
          dimension: 1,
          birth: 0.2,
          death: 0.6,
          persistence: 0.4,
          significance: 0.76,
          interpretation: 'Cyclical pattern in market behavior',
          associatedRegime: 'Sideways Mean Reversion'
        },
        {
          id: 'feature-003',
          type: 'void',
          dimension: 2,
          birth: 0.15,
          death: 0.4,
          persistence: 0.25,
          significance: 0.65,
          interpretation: 'Market gap or discontinuity',
          associatedRegime: 'Transition Chaos'
        }
      ]

      setTdaModels(mockTDAModels)
      setRegimeClusters(mockRegimeClusters)
      setMetaLabelingModels(mockMetaLabelingModels)
      setForecastEvaluations(mockForecastEvaluations)
      setTopologicalFeatures(mockTopologicalFeatures)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'trained':
      case 'active':
      case 'passing':
        return 'text-green-500'
      case 'training':
      case 'monitoring':
      case 'running':
        return 'text-yellow-500'
      case 'failed':
      case 'closed':
      case 'failing':
        return 'text-red-500'
      case 'pending':
        return 'text-gray-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'trained':
      case 'active':
      case 'passing':
        return <CheckCircle className="h-4 w-4" />
      case 'training':
      case 'monitoring':
      case 'running':
        return <AlertTriangle className="h-4 w-4" />
      case 'failed':
      case 'closed':
      case 'failing':
        return <XCircle className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getModelIcon = (type: string) => {
    switch (type) {
      case 'mapper':
        return <Network className="h-4 w-4" />
      case 'persistent_homology':
        return <GitBranch className="h-4 w-4" />
      case 'witness_complex':
        return <Hexagon className="h-4 w-4" />
      case 'alpha_complex':
        return <Layers className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getAlgorithmIcon = (algorithm: string) => {
    switch (algorithm) {
      case 'random_forest':
        return <Package className="h-4 w-4" />
      case 'gradient_boosting':
        return <TrendingUp className="h-4 w-4" />
      case 'neural_network':
        return <Brain className="h-4 w-4" />
      case 'svm':
        return <Target className="h-4 w-4" />
      default:
        return <Calculator className="h-4 w-4" />
    }
  }

  const getCharacteristicColor = (characteristic: string) => {
    switch (characteristic) {
      case 'low':
        return 'text-green-500'
      case 'medium':
        return 'text-yellow-500'
      case 'high':
        return 'text-red-500'
      case 'bullish':
        return 'text-green-500'
      case 'bearish':
        return 'text-red-500'
      case 'sideways':
        return 'text-gray-500'
      default:
        return 'text-gray-500'
    }
  }

  const handleTrain = () => {
    setIsTraining(true)
    setTimeout(() => {
      setIsTraining(false)
    }, 8000)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const formatNumber = (num: number, decimals: number = 3) => {
    return num.toFixed(decimals)
  }

  const formatPercent = (num: number) => {
    return `${(num * 100).toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Topological Data Analysis</h2>
          <p className="text-muted-foreground">
            TDA for regime clustering beyond linear statistics with meta-labeling
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleTrain}
            disabled={isTraining}
          >
            {isTraining ? (
              <>
                <Brain className="mr-2 h-4 w-4 animate-pulse" />
                Training...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Train Models
              </>
            )}
          </Button>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="models" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="models">TDA Models</TabsTrigger>
          <TabsTrigger value="regimes">Regime Clusters</TabsTrigger>
          <TabsTrigger value="meta">Meta-Labeling</TabsTrigger>
          <TabsTrigger value="forecasts">Forecast Evaluation</TabsTrigger>
          <TabsTrigger value="features">Topological Features</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {tdaModels.map((model) => (
              <Card 
                key={model.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedModel === model.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedModel(model.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getModelIcon(model.type)}
                      {model.name}
                    </CardTitle>
                    <div className={getStatusColor(model.status)}>
                      {getStatusIcon(model.status)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{model.type.replace('_', ' ')}</Badge>
                    <span className="ml-2 text-xs">{model.regimes} regimes</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {model.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Data Points</span>
                      <div className="font-medium">{model.dataPoints.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Features</span>
                      <div className="font-medium">{model.features}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Silhouette</span>
                      <div className="font-medium">{formatNumber(model.performance.silhouetteScore)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Regime Accuracy</span>
                      <div className="font-medium">{formatPercent(model.performance.regimeAccuracy)}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Parameters</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(model.parameters).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="ml-1 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Calinski-Harabasz</span>
                      <span className="font-medium">{formatNumber(model.performance.calinskiHarabasz)}</span>
                    </div>
                    <Progress value={(model.performance.calinskiHarabasz / 1500) * 100} className="h-2" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last trained: {new Date(model.lastTrained).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="regimes" className="space-y-4">
          <div className="grid gap-4">
            {regimeClusters.map((regime) => (
              <Card key={regime.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Network className="h-5 w-5" />
                      {regime.name}
                    </CardTitle>
                    <Badge variant="outline">Frequency: {formatPercent(regime.frequency)}</Badge>
                  </div>
                  <CardDescription>{regime.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Characteristics</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(regime.characteristics).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className={`font-medium capitalize ${getCharacteristicColor(value)}`}>
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Regime Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Persistence</span>
                          <span className="font-medium">{formatNumber(regime.persistence)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Stability</span>
                          <span className="font-medium">{formatNumber(regime.stability)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Avg Duration</span>
                          <span className="font-medium">{regime.duration.avg} days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Performance</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Avg Return</span>
                          <span className={`font-medium ${regime.performance.avgReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatPercent(regime.performance.avgReturn)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Volatility</span>
                          <span className="font-medium">{formatPercent(regime.performance.volatility)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Sharpe</span>
                          <span className={`font-medium ${regime.performance.sharpe >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatNumber(regime.performance.sharpe)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Max DD</span>
                          <span className="font-medium text-red-600">{formatPercent(regime.performance.maxDrawdown)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Topological Features</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Betti Numbers</span>
                          <span className="font-medium">[{regime.topologicalFeatures.bettiNumbers.join(', ')}]</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Euler Characteristic</span>
                          <span className="font-medium">{regime.topologicalFeatures.eulerCharacteristic}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Persistence diagram available for analysis
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last observed: {new Date(regime.lastObserved).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="meta" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {metaLabelingModels.map((model) => (
              <Card key={model.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getAlgorithmIcon(model.algorithm)}
                      {model.name}
                    </CardTitle>
                    <div className={getStatusColor(model.status)}>
                      {getStatusIcon(model.status)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{model.algorithm.replace('_', ' ')}</Badge>
                    <span className="ml-2 text-xs">{model.predictions} predictions</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Base Signals</div>
                    <div className="flex flex-wrap gap-1">
                      {model.baseSignals.map((signal, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {signal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Meta Features</div>
                    <div className="flex flex-wrap gap-1">
                      {model.metaFeatures.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Accuracy</span>
                      <div className="font-medium">{formatPercent(model.performance.accuracy)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Hit Rate</span>
                      <div className="font-medium">{formatPercent(model.hitRate)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">AUC</span>
                      <div className="font-medium">{formatNumber(model.performance.auc)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">F1 Score</span>
                      <div className="font-medium">{formatNumber(model.performance.f1Score)}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Feature Importance</div>
                    <div className="space-y-1">
                      {model.featureImportance.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground truncate">{feature.feature}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${feature.importance * 100}%` }}
                              />
                            </div>
                            <span className="font-medium w-8 text-right">
                              {formatPercent(feature.importance)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last trained: {new Date(model.lastTrained).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forecasts" className="space-y-4">
          <div className="grid gap-4">
            {forecastEvaluations.map((evaluation) => (
              <Card key={evaluation.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {evaluation.modelName}
                    </CardTitle>
                    <Badge variant="outline">{evaluation.scoringMethod}</Badge>
                  </div>
                  <CardDescription>
                    {evaluation.forecastType} forecast evaluation over {evaluation.timeHorizon}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Performance Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Score</span>
                          <span className="font-medium">{formatNumber(evaluation.score)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Benchmark</span>
                          <span className="font-medium">{formatNumber(evaluation.benchmark)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Improvement</span>
                          <span className={`font-medium ${evaluation.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatPercent(evaluation.improvement)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Calibration</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Reliability</span>
                          <span className="font-medium">{formatNumber(evaluation.calibration.reliability)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Sharpness</span>
                          <span className="font-medium">{formatNumber(evaluation.calibration.sharpness)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Resolution</span>
                          <span className="font-medium">{formatNumber(evaluation.calibration.resolution)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Evaluation Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Samples</span>
                          <span className="font-medium">{evaluation.samples.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Time Horizon</span>
                          <span className="font-medium">{evaluation.timeHorizon}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Last Evaluated</span>
                          <span className="text-xs">{new Date(evaluation.lastEvaluated).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Score vs Benchmark</span>
                      <span className="font-medium">{formatPercent(evaluation.score / evaluation.benchmark)}</span>
                    </div>
                    <Progress value={(evaluation.score / evaluation.benchmark) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <div className="grid gap-4">
            {topologicalFeatures.map((feature) => (
              <Card key={feature.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Hexagon className="h-5 w-5" />
                      {feature.type.replace('_', ' ').toUpperCase()} Feature
                    </CardTitle>
                    <Badge variant="outline">Dimension {feature.dimension}</Badge>
                  </div>
                  <CardDescription>{feature.interpretation}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Topological Properties</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Birth</span>
                          <span className="font-medium">{formatNumber(feature.birth)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Death</span>
                          <span className="font-medium">{formatNumber(feature.death)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Persistence</span>
                          <span className="font-medium">{formatNumber(feature.persistence)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Significance</span>
                          <span className="font-medium">{formatNumber(feature.significance)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Market Association</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Associated Regime</span>
                          <Badge variant="secondary">{feature.associatedRegime}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Persistence</span>
                            <span className="font-medium">{formatNumber(feature.persistence)}</span>
                          </div>
                          <Progress value={feature.significance * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Higher persistence values indicate more robust topological features
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}