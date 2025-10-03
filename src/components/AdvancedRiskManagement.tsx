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
  Shield,
  AlertTriangle,
  Activity,
  TrendingDown,
  BarChart3,
  Zap,
  Pause,
  Play,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  Clock,
  CheckCircle,
  XCircle,
  Target,
  Brain,
  GitBranch,
  Layers,
  Radio,
  Cpu
} from 'lucide-react'

interface RiskMetric {
  id: string
  name: string
  current: number
  limit: number
  warning: number
  unit: string
  status: 'normal' | 'warning' | 'critical'
  trend: 'up' | 'down' | 'stable'
  portfolio: string
  strategy: string
  symbol?: string
}

interface CircuitBreaker {
  id: string
  name: string
  type: 'fat_finger' | 'price_collar' | 'notional_cap' | 'concentration' | 'latency' | 'loss_threshold'
  status: 'active' | 'triggered' | 'disabled'
  triggerValue: number
  currentValue: number
  threshold: number
  action: 'pause' | 'reduce' | 'kill' | 'alert'
  lastTriggered?: string
  autoRecovery: boolean
  recoveryTime?: number
}

interface RiskEvent {
  id: string
  timestamp: string
  type: 'limit_breach' | 'circuit_breaker' | 'drift_detected' | 'latency_spike' | 'model_failure'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  scope: 'portfolio' | 'strategy' | 'symbol' | 'system'
  scopeId: string
  action: 'alert' | 'pause' | 'reduce' | 'kill' | 'auto_recovery'
  resolved: boolean
  resolvedAt?: string
}

interface StressTest {
  id: string
  name: string
  scenario: string
  status: 'completed' | 'running' | 'pending' | 'failed'
  results: {
    portfolioLoss: number
    maxDrawdown: number
    varBreach: boolean
    esBreach: boolean
    recoveryTime: number
  }
  baseline: {
    portfolioValue: number
    var: number
    expectedShortfall: number
  }
  timestamp: string
}

interface DigitalTwin {
  id: string
  name: string
  status: 'active' | 'syncing' | 'error'
  lastSync: string
  accuracy: number
  latency: number
  scenarios: number
  currentScenario?: string
}

export default function AdvancedRiskManagement() {
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null)
  const [isMonitoring, setIsMonitoring] = useState(true)
  const [riskMetrics, setRiskMetrics] = useState<RiskMetric[]>([])
  const [circuitBreakers, setCircuitBreakers] = useState<CircuitBreaker[]>([])
  const [riskEvents, setRiskEvents] = useState<RiskEvent[]>([])
  const [stressTests, setStressTests] = useState<StressTest[]>([])
  const [digitalTwins, setDigitalTwins] = useState<DigitalTwin[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      // Simulate risk metrics
      const mockRiskMetrics: RiskMetric[] = [
        {
          id: 'risk-001',
          name: 'Value at Risk (1d)',
          current: 2.8,
          limit: 3.5,
          warning: 3.0,
          unit: '%',
          status: 'normal',
          trend: 'stable',
          portfolio: 'master',
          strategy: 'all'
        },
        {
          id: 'risk-002',
          name: 'Expected Shortfall',
          current: 4.2,
          limit: 5.0,
          warning: 4.5,
          unit: '%',
          status: 'normal',
          trend: 'down',
          portfolio: 'master',
          strategy: 'all'
        },
        {
          id: 'risk-003',
          name: 'Portfolio Leverage',
          current: 2.1,
          limit: 3.0,
          warning: 2.5,
          unit: 'x',
          status: 'normal',
          trend: 'up',
          portfolio: 'master',
          strategy: 'all'
        },
        {
          id: 'risk-004',
          name: 'Concentration Risk',
          current: 18.5,
          limit: 25.0,
          warning: 20.0,
          unit: '%',
          status: 'warning',
          trend: 'up',
          portfolio: 'master',
          strategy: 'equity_long'
        },
        {
          id: 'risk-005',
          name: 'Drawdown',
          current: -8.7,
          limit: -15.0,
          warning: -10.0,
          unit: '%',
          status: 'normal',
          trend: 'stable',
          portfolio: 'master',
          strategy: 'all'
        },
        {
          id: 'risk-006',
          name: 'Order Latency',
          current: 45,
          limit: 100,
          warning: 75,
          unit: 'ms',
          status: 'normal',
          trend: 'down',
          portfolio: 'master',
          strategy: 'execution'
        }
      ]

      // Simulate circuit breakers
      const mockCircuitBreakers: CircuitBreaker[] = [
        {
          id: 'cb-001',
          name: 'Fat Finger Protection',
          type: 'fat_finger',
          status: 'active',
          triggerValue: 1000000,
          currentValue: 45000,
          threshold: 500000,
          action: 'pause',
          autoRecovery: true,
          recoveryTime: 300
        },
        {
          id: 'cb-002',
          name: 'Price Collar Check',
          type: 'price_collar',
          status: 'active',
          currentValue: 0.8,
          threshold: 5.0,
          action: 'alert',
          autoRecovery: false
        },
        {
          id: 'cb-003',
          name: 'Notional Cap',
          type: 'notional_cap',
          status: 'triggered',
          triggerValue: 50000000,
          currentValue: 52000000,
          threshold: 50000000,
          action: 'reduce',
          lastTriggered: '2024-01-15T10:25:00Z',
          autoRecovery: true,
          recoveryTime: 600
        },
        {
          id: 'cb-004',
          name: 'Concentration Limit',
          type: 'concentration',
          status: 'active',
          currentValue: 18.5,
          threshold: 25.0,
          action: 'alert',
          autoRecovery: false
        },
        {
          id: 'cb-005',
          name: 'Latency Monitor',
          type: 'latency',
          status: 'active',
          currentValue: 45,
          threshold: 100,
          action: 'pause',
          autoRecovery: true,
          recoveryTime: 120
        },
        {
          id: 'cb-006',
          name: 'Loss Threshold',
          type: 'loss_threshold',
          status: 'active',
          currentValue: -8.7,
          threshold: -15.0,
          action: 'kill',
          autoRecovery: false
        }
      ]

      // Simulate risk events
      const mockRiskEvents: RiskEvent[] = [
        {
          id: 'event-001',
          timestamp: '2024-01-15T10:25:00Z',
          type: 'limit_breach',
          severity: 'medium',
          description: 'Notional cap exceeded by $2M',
          scope: 'portfolio',
          scopeId: 'master',
          action: 'reduce',
          resolved: false
        },
        {
          id: 'event-002',
          timestamp: '2024-01-15T10:20:00Z',
          type: 'drift_detected',
          severity: 'low',
          description: 'Feature drift detected in sentiment model',
          scope: 'strategy',
          scopeId: 'sentiment_arbitrage',
          action: 'alert',
          resolved: true,
          resolvedAt: '2024-01-15T10:22:00Z'
        },
        {
          id: 'event-003',
          timestamp: '2024-01-15T10:15:00Z',
          type: 'latency_spike',
          severity: 'medium',
          description: 'Order latency spike to 150ms',
          scope: 'system',
          scopeId: 'execution_engine',
          action: 'pause',
          resolved: true,
          resolvedAt: '2024-01-15T10:17:00Z'
        },
        {
          id: 'event-004',
          timestamp: '2024-01-15T10:10:00Z',
          type: 'circuit_breaker',
          severity: 'high',
          description: 'Fat finger protection triggered',
          scope: 'symbol',
          scopeId: 'AAPL',
          action: 'pause',
          resolved: true,
          resolvedAt: '2024-01-15T10:12:00Z'
        }
      ]

      // Simulate stress tests
      const mockStressTests: StressTest[] = [
        {
          id: 'stress-001',
          name: 'Flash Crash Scenario',
          scenario: '30% market drop in 10 minutes',
          status: 'completed',
          results: {
            portfolioLoss: -28.5,
            maxDrawdown: -35.2,
            varBreach: true,
            esBreach: true,
            recoveryTime: 1800
          },
          baseline: {
            portfolioValue: 100000000,
            var: 3500000,
            expectedShortfall: 5000000
          },
          timestamp: '2024-01-15T09:00:00Z'
        },
        {
          id: 'stress-002',
          name: 'Liquidity Drought',
          scenario: '80% volume reduction',
          status: 'completed',
          results: {
            portfolioLoss: -12.3,
            maxDrawdown: -18.7,
            varBreach: false,
            esBreach: false,
            recoveryTime: 600
          },
          baseline: {
            portfolioValue: 100000000,
            var: 3500000,
            expectedShortfall: 5000000
          },
          timestamp: '2024-01-15T08:30:00Z'
        },
        {
          id: 'stress-003',
          name: 'Volatility Spike',
          scenario: 'VIX up 200%',
          status: 'running',
          results: {
            portfolioLoss: -15.8,
            maxDrawdown: -22.1,
            varBreach: false,
            esBreach: true,
            recoveryTime: 900
          },
          baseline: {
            portfolioValue: 100000000,
            var: 3500000,
            expectedShortfall: 5000000
          },
          timestamp: '2024-01-15T10:00:00Z'
        }
      ]

      // Simulate digital twins
      const mockDigitalTwins: DigitalTwin[] = [
        {
          id: 'twin-001',
          name: 'Portfolio Twin',
          status: 'active',
          lastSync: '2024-01-15T10:30:00Z',
          accuracy: 99.2,
          latency: 12,
          scenarios: 156,
          currentScenario: 'normal_market'
        },
        {
          id: 'twin-002',
          name: 'Risk Engine Twin',
          status: 'active',
          lastSync: '2024-01-15T10:29:00Z',
          accuracy: 97.8,
          latency: 8,
          scenarios: 89,
          currentScenario: 'volatility_spike'
        },
        {
          id: 'twin-003',
          name: 'Execution Twin',
          status: 'syncing',
          lastSync: '2024-01-15T10:28:00Z',
          accuracy: 95.5,
          latency: 15,
          scenarios: 234,
          currentScenario: 'high_latency'
        }
      ]

      setRiskMetrics(mockRiskMetrics)
      setCircuitBreakers(mockCircuitBreakers)
      setRiskEvents(mockRiskEvents)
      setStressTests(mockStressTests)
      setDigitalTwins(mockDigitalTwins)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
      case 'active':
      case 'completed':
      case 'resolved':
        return 'text-green-500'
      case 'warning':
      case 'triggered':
      case 'medium':
      case 'syncing':
        return 'text-yellow-500'
      case 'critical':
      case 'failed':
      case 'high':
      case 'error':
        return 'text-red-500'
      case 'disabled':
      case 'low':
      case 'pending':
        return 'text-gray-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
      case 'active':
      case 'completed':
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />
      case 'warning':
      case 'triggered':
      case 'medium':
      case 'syncing':
        return <AlertTriangle className="h-4 w-4" />
      case 'critical':
      case 'failed':
      case 'high':
      case 'error':
        return <XCircle className="h-4 w-4" />
      case 'disabled':
      case 'low':
      case 'pending':
        return <Pause className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingDown className="h-3 w-3 text-red-500 rotate-180" />
      case 'down':
        return <TrendingDown className="h-3 w-3 text-green-500" />
      default:
        return <Activity className="h-3 w-3 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'high':
        return 'bg-orange-500'
      case 'critical':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const handleMonitoringToggle = () => {
    setIsMonitoring(!isMonitoring)
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
          <h2 className="text-3xl font-bold tracking-tight">Advanced Risk Management</h2>
          <p className="text-muted-foreground">
            Real-time risk engine, circuit breakers, and digital twin stress testing
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMonitoringToggle}
          >
            {isMonitoring ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause Monitoring
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Resume Monitoring
              </>
            )}
          </Button>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="metrics">Risk Metrics</TabsTrigger>
          <TabsTrigger value="circuit-breakers">Circuit Breakers</TabsTrigger>
          <TabsTrigger value="events">Risk Events</TabsTrigger>
          <TabsTrigger value="stress-tests">Stress Tests</TabsTrigger>
          <TabsTrigger value="digital-twin">Digital Twin</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {riskMetrics.map((metric) => (
              <Card 
                key={metric.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedRisk === metric.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedRisk(metric.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{metric.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className={getStatusColor(metric.status)}>
                        {getStatusIcon(metric.status)}
                      </div>
                      {getTrendIcon(metric.trend)}
                    </div>
                  </div>
                  <CardDescription>
                    {metric.portfolio} / {metric.strategy}
                    {metric.symbol && ` / ${metric.symbol}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      {metric.current}{metric.unit}
                    </span>
                    <Badge variant="outline">
                      Limit: {metric.limit}{metric.unit}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Risk Level</span>
                      <span className="font-medium">
                        {((metric.current / metric.limit) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={(metric.current / metric.limit) * 100} 
                      className={`h-2 ${
                        metric.status === 'critical' ? 'bg-red-200' :
                        metric.status === 'warning' ? 'bg-yellow-200' :
                        'bg-green-200'
                      }`}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Warning at {metric.warning}{metric.unit}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="circuit-breakers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {circuitBreakers.map((breaker) => (
              <Card key={breaker.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{breaker.name}</CardTitle>
                    <div className={getStatusColor(breaker.status)}>
                      {getStatusIcon(breaker.status)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{breaker.type}</Badge>
                    <span className="ml-2 text-xs">Action: {breaker.action}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Current</span>
                      <div className="font-medium">
                        {breaker.currentValue.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Threshold</span>
                      <div className="font-medium">
                        {breaker.threshold.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  {breaker.lastTriggered && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Last Triggered: </span>
                      <span className="font-medium">
                        {new Date(breaker.lastTriggered).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Auto Recovery</span>
                    <Badge variant={breaker.autoRecovery ? 'default' : 'secondary'}>
                      {breaker.autoRecovery ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  {breaker.autoRecovery && breaker.recoveryTime && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Recovery Time: </span>
                      <span className="font-medium">{breaker.recoveryTime}s</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Events Timeline
              </CardTitle>
              <CardDescription>
                Real-time risk events and resolution tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {riskEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getSeverityColor(event.severity)}`} />
                          <span className="font-medium">{event.type}</span>
                          <Badge variant="outline">{event.scope}</Badge>
                          <div className={getStatusColor(event.resolved ? 'resolved' : 'warning')}>
                            {getStatusIcon(event.resolved ? 'resolved' : 'warning')}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{event.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Scope:</span>
                          <span className="font-medium">{event.scopeId}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Action:</span>
                          <Badge variant="secondary">{event.action}</Badge>
                        </div>
                      </div>
                      {event.resolved && event.resolvedAt && (
                        <div className="text-sm text-green-600">
                          Resolved at {new Date(event.resolvedAt).toLocaleString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stress-tests" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stressTests.map((test) => (
              <Card key={test.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                    <div className={getStatusColor(test.status)}>
                      {getStatusIcon(test.status)}
                    </div>
                  </div>
                  <CardDescription>{test.scenario}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Portfolio Loss</span>
                      <div className="font-medium text-red-500">
                        {test.results.portfolioLoss.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Max Drawdown</span>
                      <div className="font-medium text-red-500">
                        {test.results.maxDrawdown.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">VaR Breach</span>
                      <div className="font-medium">
                        {test.results.varBreach ? 'Yes' : 'No'}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ES Breach</span>
                      <div className="font-medium">
                        {test.results.esBreach ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="text-sm">
                    <span className="text-muted-foreground">Recovery Time: </span>
                    <span className="font-medium">{test.results.recoveryTime}s</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(test.timestamp).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="digital-twin" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {digitalTwins.map((twin) => (
              <Card key={twin.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{twin.name}</CardTitle>
                    <div className={getStatusColor(twin.status)}>
                      {getStatusIcon(twin.status)}
                    </div>
                  </div>
                  <CardDescription>
                    {twin.currentScenario && `Scenario: ${twin.currentScenario}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Accuracy</span>
                      <div className="font-medium">{twin.accuracy}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Latency</span>
                      <div className="font-medium">{twin.latency}ms</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Scenarios</span>
                      <div className="font-medium">{twin.scenarios}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Sync</span>
                      <div className="font-medium">
                        {new Date(twin.lastSync).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sync Status</span>
                      <Progress value={twin.accuracy} className="w-24 h-2" />
                    </div>
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