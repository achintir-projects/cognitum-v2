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
  GitBranch,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  BarChart3,
  Brain,
  Target,
  Zap,
  TrendingUp,
  FileText,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Layers,
  Activity,
  Database
} from 'lucide-react'

interface StrategyNode {
  id: string
  name: string
  type: 'feature' | 'model' | 'signal' | 'allocation' | 'order'
  status: 'active' | 'pending' | 'error' | 'completed'
  latency: number
  throughput: number
  errorRate: number
  lastRun: string
  description: string
}

interface ModelArtifact {
  id: string
  name: string
  version: string
  type: 'neural_network' | 'random_forest' | 'gradient_boosting' | 'reinforcement_learning'
  status: 'approved' | 'pending' | 'rejected' | 'deprecated'
  performance: {
    sharpeRatio: number
    maxDrawdown: number
    winRate: number
    totalReturn: number
  }
  validation: {
    walkForward: boolean
    purgedCV: boolean
    deflatedSharpe: boolean
    whiteRealityCheck: boolean
    hansenSPA: boolean
  }
  risk: {
    valueAtRisk: number
    expectedShortfall: number
    leverage: number
    concentration: number
  }
  deployedAt: string
  nextReview: string
}

interface ValidationBattery {
  name: string
  status: 'passed' | 'failed' | 'pending'
  score: number
  description: string
  lastRun: string
}

interface CausalInference {
  id: string
  name: string
  methodology: 'double_ml' | 'orf' | 'causal_forest'
  treatment: string
  outcome: string
  confounders: string[]
  ate: number
  confidence: number
  status: 'estimated' | 'validated' | 'rejected'
}

export default function AdvancedModelPlatform() {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [strategyNodes, setStrategyNodes] = useState<StrategyNode[]>([])
  const [modelArtifacts, setModelArtifacts] = useState<ModelArtifact[]>([])
  const [validationBatteries, setValidationBatteries] = useState<ValidationBattery[]>([])
  const [causalInferences, setCausalInferences] = useState<CausalInference[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      // Simulate strategy DAG nodes
      const mockStrategyNodes: StrategyNode[] = [
        {
          id: 'node-001',
          name: 'Market Data Ingestion',
          type: 'feature',
          status: 'active',
          latency: 12,
          throughput: 85000,
          errorRate: 0.02,
          lastRun: '2025-10-03T10:30:00Z',
          description: 'Real-time market data processing and feature extraction'
        },
        {
          id: 'node-002',
          name: 'Technical Indicators',
          type: 'feature',
          status: 'active',
          latency: 8,
          throughput: 75000,
          errorRate: 0.01,
          lastRun: '2025-10-03T10:30:00Z',
          description: 'Technical analysis indicators and momentum features'
        },
        {
          id: 'node-003',
          name: 'Neural Network Model',
          type: 'model',
          status: 'active',
          latency: 45,
          throughput: 12000,
          errorRate: 0.15,
          lastRun: '2025-10-03T10:30:00Z',
          description: 'Deep learning model for price prediction'
        },
        {
          id: 'node-004',
          name: 'Signal Generation',
          type: 'signal',
          status: 'active',
          latency: 15,
          throughput: 10000,
          errorRate: 0.08,
          lastRun: '2025-10-03T10:30:00Z',
          description: 'Trading signal generation and confidence scoring'
        },
        {
          id: 'node-005',
          name: 'Portfolio Allocation',
          type: 'allocation',
          status: 'active',
          latency: 22,
          throughput: 8000,
          errorRate: 0.05,
          lastRun: '2025-10-03T10:30:00Z',
          description: 'Risk-aware portfolio allocation and position sizing'
        },
        {
          id: 'node-006',
          name: 'Order Execution',
          type: 'order',
          status: 'pending',
          latency: 35,
          throughput: 5000,
          errorRate: 0.12,
          lastRun: '2025-10-03T10:29:00Z',
          description: 'Order routing and execution management'
        }
      ]

      // Simulate model artifacts
      const mockModelArtifacts: ModelArtifact[] = [
        {
          id: 'model-001',
          name: 'Quantum Neural Network v3.2',
          version: 'v3.2.1',
          type: 'neural_network',
          status: 'approved',
          performance: {
            sharpeRatio: 2.45,
            maxDrawdown: -12.3,
            winRate: 68.4,
            totalReturn: 28.5
          },
          validation: {
            walkForward: true,
            purgedCV: true,
            deflatedSharpe: true,
            whiteRealityCheck: true,
            hansenSPA: true
          },
          risk: {
            valueAtRisk: 2.8,
            expectedShortfall: 4.2,
            leverage: 2.1,
            concentration: 15.6
          },
          deployedAt: '2025-09-28T08:00:00Z',
          nextReview: '2024-02-10T08:00:00Z'
        },
        {
          id: 'model-002',
          name: 'Random Forest Ensemble v2.1',
          version: 'v2.1.4',
          type: 'random_forest',
          status: 'approved',
          performance: {
            sharpeRatio: 1.85,
            maxDrawdown: -18.7,
            winRate: 62.1,
            totalReturn: 19.8
          },
          validation: {
            walkForward: true,
            purgedCV: true,
            deflatedSharpe: false,
            whiteRealityCheck: true,
            hansenSPA: true
          },
          risk: {
            valueAtRisk: 3.5,
            expectedShortfall: 5.8,
            leverage: 1.8,
            concentration: 22.3
          },
          deployedAt: '2024-01-08T14:30:00Z',
          nextReview: '2024-02-08T14:30:00Z'
        },
        {
          id: 'model-003',
          name: 'DRL Agent v1.5',
          version: 'v1.5.2',
          type: 'reinforcement_learning',
          status: 'pending',
          performance: {
            sharpeRatio: 3.12,
            maxDrawdown: -8.9,
            winRate: 71.2,
            totalReturn: 35.7
          },
          validation: {
            walkForward: true,
            purgedCV: false,
            deflatedSharpe: true,
            whiteRealityCheck: false,
            hansenSPA: false
          },
          risk: {
            valueAtRisk: 2.1,
            expectedShortfall: 3.4,
            leverage: 2.8,
            concentration: 18.9
          },
          deployedAt: '2025-09-30T10:15:00Z',
          nextReview: '2025-10-10T10:15:00Z'
        }
      ]

      // Simulate validation batteries
      const mockValidationBatteries: ValidationBattery[] = [
        {
          name: 'Walk-Forward Analysis',
          status: 'passed',
          score: 94.2,
          description: 'Time-series cross-validation with rolling windows',
          lastRun: '2025-10-03T09:00:00Z'
        },
        {
          name: 'Purified Cross-Validation',
          status: 'passed',
          score: 91.8,
          description: 'CV with embargo periods to prevent leakage',
          lastRun: '2025-10-03T09:15:00Z'
        },
        {
          name: 'Deflated Sharpe Ratio',
          status: 'passed',
          score: 88.5,
          description: 'Sharpe ratio adjusted for multiple testing',
          lastRun: '2025-10-03T09:30:00Z'
        },
        {
          name: 'White\'s Reality Check',
          status: 'passed',
          score: 92.1,
          description: 'Test for data snooping bias',
          lastRun: '2025-10-03T09:45:00Z'
        },
        {
          name: 'Hansen SPA Test',
          status: 'failed',
          score: 76.3,
          description: 'Superior Predictive Ability test',
          lastRun: '2025-10-03T10:00:00Z'
        }
      ]

      // Simulate causal inference models
      const mockCausalInferences: CausalInference[] = [
        {
          id: 'causal-001',
          name: 'Interest Rate Impact',
          methodology: 'double_ml',
          treatment: 'fed_funds_rate',
          outcome: 'equity_returns',
          confounders: ['inflation', 'gdp_growth', 'market_volatility'],
          ate: -0.023,
          confidence: 0.89,
          status: 'validated'
        },
        {
          id: 'causal-002',
          name: 'Sentiment Effect',
          methodology: 'orf',
          treatment: 'news_sentiment',
          outcome: 'price_momentum',
          confounders: ['trading_volume', 'market_cap', 'sector'],
          ate: 0.041,
          confidence: 0.76,
          status: 'estimated'
        },
        {
          id: 'causal-003',
          name: 'Supply Chain Disruption',
          methodology: 'causal_forest',
          treatment: 'shipping_delays',
          outcome: 'stock_volatility',
          confounders: ['oil_price', 'geopolitical_risk', 'demand_forecast'],
          ate: 0.156,
          confidence: 0.82,
          status: 'validated'
        }
      ]

      setStrategyNodes(mockStrategyNodes)
      setModelArtifacts(mockModelArtifacts)
      setValidationBatteries(mockValidationBatteries)
      setCausalInferences(mockCausalInferences)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'passed':
      case 'completed':
      case 'validated':
        return 'text-green-500'
      case 'pending':
      case 'estimated':
        return 'text-yellow-500'
      case 'error':
      case 'failed':
      case 'rejected':
        return 'text-red-500'
      case 'deprecated':
        return 'text-orange-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'passed':
      case 'completed':
      case 'validated':
        return <CheckCircle className="h-4 w-4" />
      case 'pending':
      case 'estimated':
        return <AlertTriangle className="h-4 w-4" />
      case 'error':
      case 'failed':
      case 'rejected':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Database className="h-4 w-4" />
      case 'model':
        return <Brain className="h-4 w-4" />
      case 'signal':
        return <Target className="h-4 w-4" />
      case 'allocation':
        return <BarChart3 className="h-4 w-4" />
      case 'order':
        return <Zap className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
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
          <h2 className="text-3xl font-bold tracking-tight">Advanced Model Platform</h2>
          <p className="text-muted-foreground">
            Strategy DAG representation, model registry, and validation batteries
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dag" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dag">Strategy DAG</TabsTrigger>
          <TabsTrigger value="models">Model Registry</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="causal">Causal Inference</TabsTrigger>
          <TabsTrigger value="counterfactual">Counterfactual</TabsTrigger>
        </TabsList>

        <TabsContent value="dag" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Strategy DAG Representation
              </CardTitle>
              <CardDescription>
                Real-time strategy pipeline with node-level metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategyNodes.map((node, index) => (
                  <div key={node.id} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-full border-2 ${
                        node.status === 'active' ? 'border-green-500 bg-green-50' :
                        node.status === 'pending' ? 'border-yellow-500 bg-yellow-50' :
                        'border-red-50 bg-red-50'
                      }`}>
                        {getNodeIcon(node.type)}
                      </div>
                      {index < strategyNodes.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-300 mt-2" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{node.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {node.type}
                          </Badge>
                          <div className={getStatusColor(node.status)}>
                            {getStatusIcon(node.status)}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(node.lastRun).toLocaleTimeString()}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{node.description}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Latency:</span>
                          <span className="font-medium">{node.latency}ms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Throughput:</span>
                          <span className="font-medium">{node.throughput.toLocaleString()}/s</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Error Rate:</span>
                          <span className="font-medium">{(node.errorRate * 100).toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modelArtifacts.map((model) => (
              <Card key={model.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <div className={getStatusColor(model.status)}>
                      {getStatusIcon(model.status)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="secondary">{model.type}</Badge>
                    <span className="ml-2 text-xs">{model.version}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Sharpe</span>
                      <div className="font-medium">{model.performance.sharpeRatio}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Win Rate</span>
                      <div className="font-medium">{model.performance.winRate}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Max DD</span>
                      <div className="font-medium">{model.performance.maxDrawdown}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Return</span>
                      <div className="font-medium">{model.performance.totalReturn}%</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Validation Status</div>
                    <div className="grid grid-cols-2 gap-1">
                      {Object.entries(model.validation).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-1 text-xs">
                          {value ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <XCircle className="h-3 w-3 text-red-500" />
                          )}
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Next review: {new Date(model.nextReview).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Validation Batteries
              </CardTitle>
              <CardDescription>
                Comprehensive model validation and testing suite
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {validationBatteries.map((validation, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={getStatusColor(validation.status)}>
                          {getStatusIcon(validation.status)}
                        </div>
                        <span className="font-medium">{validation.name}</span>
                      </div>
                      <Badge variant={validation.status === 'passed' ? 'default' : 'destructive'}>
                        {validation.score}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{validation.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last run: {new Date(validation.lastRun).toLocaleString()}</span>
                      <Progress value={validation.score} className="w-24 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="causal" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {causalInferences.map((causal) => (
              <Card key={causal.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{causal.name}</CardTitle>
                    <div className={getStatusColor(causal.status)}>
                      {getStatusIcon(causal.status)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{causal.methodology}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Treatment</span>
                      <span className="font-medium">{causal.treatment}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Outcome</span>
                      <span className="font-medium">{causal.outcome}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">ATE</span>
                      <span className="font-medium">{causal.ate.toFixed(3)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-medium">{(causal.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm font-medium mb-1">Confounders</div>
                    <div className="flex flex-wrap gap-1">
                      {causal.confounders.map((confounder, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {confounder}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="counterfactual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Counterfactual Simulator
              </CardTitle>
              <CardDescription>
                What-if scenario analysis and counterfactual reasoning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Interest Rate Shock</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Rates +10 bps</span>
                          <span className="text-red-500">-2.3%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Rates +25 bps</span>
                          <span className="text-red-500">-5.8%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Rates +50 bps</span>
                          <span className="text-red-500">-12.1%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Oil Price Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Oil +5%</span>
                          <span className="text-green-500">+1.2%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Oil +10%</span>
                          <span className="text-green-500">+2.8%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Oil +20%</span>
                          <span className="text-green-500">+5.4%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Sentiment Shift</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Sentiment -10%</span>
                          <span className="text-red-500">-3.1%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Sentiment -20%</span>
                          <span className="text-red-500">-6.7%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Sentiment -30%</span>
                          <span className="text-red-500">-11.2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Scenarios saved and ready for portfolio impact analysis
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      Run Analysis
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}