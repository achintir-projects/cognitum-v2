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
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  LineChart,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Settings,
  Download,
  Eye,
  EyeOff,
  Calculator,
  ScatterChart,
  AreaChart,
  PieChart,
  DollarSign,
  Percent,
  Calendar,
  Info,
  Database,
  Cpu,
  Shield,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react'

interface VolSurface {
  id: string
  name: string
  underlying: string
  model: 'SABR' | 'SSVI' | 'Heston' | 'LocalVol'
  status: 'calibrated' | 'calibrating' | 'failed'
  lastCalibrated: string
  parameters: {
    alpha?: number
    beta?: number
    rho?: number
    nu?: number
    eta?: number
    gamma?: number
  }
  calibrationMetrics: {
    mse: number
    rmse: number
    mae: number
    r2: number
  }
  marketDataPoints: number
  strikes: number[]
  expirations: string[]
}

interface GreeksData {
  id: string
  symbol: string
  strike: number
  expiration: string
  optionType: 'call' | 'put'
  spot: number
  delta: number
  gamma: number
  theta: number
  vega: number
  rho: number
  impliedVol: number
  theoreticalPrice: number
  marketPrice: number
  bidAskSpread: number
  timestamp: string
}

interface VolArbOpportunity {
  id: string
  type: 'dispersion' | 'index_vs_constituents' | 'etf_vs_options' | 'calendar'
  name: string
  description: string
  status: 'active' | 'monitoring' | 'closed'
  expectedReturn: number
  sharpeRatio: number
  maxDrawdown: number
  confidence: number
  legs: {
    instrument: string
    action: 'buy' | 'sell'
    quantity: number
    price: number
  }[]
  riskMetrics: {
    delta: number
    gamma: number
    vega: number
    theta: number
  }
  timestamp: string
}

interface RiskNeutralDensity {
  id: string
  underlying: string
  expiration: string
  distribution: {
    strikes: number[]
    probabilities: number[]
    confidenceIntervals: {
      lower: number[]
      upper: number[]
    }
  }
  moments: {
    mean: number
    variance: number
    skewness: number
    kurtosis: number
  }
  riskMetrics: {
    var95: number
    var99: number
    expectedShortfall: number
  }
  lastUpdated: string
}

interface ScenarioLadder {
  id: string
  name: string
  description: string
  scenarios: {
    name: string
    spotShock: number
    volShock: number
    timeDecay: number
    pnl: number
    delta: number
    gamma: number
    vega: number
    theta: number
  }[]
  basePortfolio: {
    delta: number
    gamma: number
    vega: number
    theta: number
  }
  worstCase: {
    pnl: number
    scenario: string
  }
  bestCase: {
    pnl: number
    scenario: string
  }
  lastUpdated: string
}

export default function OptionsVolatilityStack() {
  const [selectedSurface, setSelectedSurface] = useState<string | null>(null)
  const [isCalibrating, setIsCalibrating] = useState(false)
  const [volSurfaces, setVolSurfaces] = useState<VolSurface[]>([])
  const [greeksData, setGreeksData] = useState<GreeksData[]>([])
  const [volArbOpportunities, setVolArbOpportunities] = useState<VolArbOpportunity[]>([])
  const [riskNeutralDensities, setRiskNeutralDensities] = useState<RiskNeutralDensity[]>([])
  const [scenarioLadders, setScenarioLadders] = useState<ScenarioLadder[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      // Simulate volatility surfaces
      const mockVolSurfaces: VolSurface[] = [
        {
          id: 'surface-001',
          name: 'SPX SABR Surface',
          underlying: 'SPX',
          model: 'SABR',
          status: 'calibrated',
          lastCalibrated: '2025-10-03T10:30:00Z',
          parameters: {
            alpha: 0.18,
            beta: 0.7,
            rho: -0.25,
            nu: 0.35
          },
          calibrationMetrics: {
            mse: 0.0000234,
            rmse: 0.004839,
            mae: 0.003821,
            r2: 0.9876
          },
          marketDataPoints: 1250,
          strikes: [3800, 3900, 4000, 4100, 4200, 4300, 4400],
          expirations: ['1W', '2W', '1M', '2M', '3M', '6M', '1Y']
        },
        {
          id: 'surface-002',
          name: 'AAPL SSVI Surface',
          underlying: 'AAPL',
          model: 'SSVI',
          status: 'calibrated',
          lastCalibrated: '2025-10-03T10:25:00Z',
          parameters: {
            eta: 0.25,
            gamma: 0.45
          },
          calibrationMetrics: {
            mse: 0.0000187,
            rmse: 0.004326,
            mae: 0.003456,
            r2: 0.9891
          },
          marketDataPoints: 890,
          strikes: [150, 160, 170, 180, 190, 200, 210, 220],
          expirations: ['1W', '2W', '1M', '2M', '3M', '6M']
        },
        {
          id: 'surface-003',
          name: 'TSLA Local Vol Surface',
          underlying: 'TSLA',
          model: 'LocalVol',
          status: 'calibrating',
          lastCalibrated: '2025-10-03T10:20:00Z',
          parameters: {},
          calibrationMetrics: {
            mse: 0.0000312,
            rmse: 0.005587,
            mae: 0.004234,
            r2: 0.9823
          },
          marketDataPoints: 670,
          strikes: [200, 220, 240, 260, 280, 300, 320],
          expirations: ['1W', '2W', '1M', '2M', '3M']
        }
      ]

      // Simulate Greeks data
      const mockGreeksData: GreeksData[] = [
        {
          id: 'greek-001',
          symbol: 'SPX',
          strike: 4000,
          expiration: '1M',
          optionType: 'call',
          spot: 4012.34,
          delta: 0.5234,
          gamma: 0.0023,
          theta: -0.0123,
          vega: 0.2345,
          rho: 0.0876,
          impliedVol: 0.1876,
          theoreticalPrice: 45.67,
          marketPrice: 46.23,
          bidAskSpread: 0.56,
          timestamp: '2025-10-03T10:30:00Z'
        },
        {
          id: 'greek-002',
          symbol: 'SPX',
          strike: 4000,
          expiration: '1M',
          optionType: 'put',
          spot: 4012.34,
          delta: -0.4766,
          gamma: 0.0023,
          theta: -0.0098,
          vega: 0.2345,
          rho: -0.0912,
          impliedVol: 0.1876,
          theoreticalPrice: 33.45,
          marketPrice: 33.89,
          bidAskSpread: 0.44,
          timestamp: '2025-10-03T10:30:00Z'
        },
        {
          id: 'greek-003',
          symbol: 'AAPL',
          strike: 180,
          expiration: '2W',
          optionType: 'call',
          spot: 182.45,
          delta: 0.6123,
          gamma: 0.0345,
          theta: -0.0234,
          vega: 0.1234,
          rho: 0.0234,
          impliedVol: 0.2345,
          theoreticalPrice: 4.56,
          marketPrice: 4.78,
          bidAskSpread: 0.22,
          timestamp: '2025-10-03T10:30:00Z'
        }
      ]

      // Simulate volatility arbitrage opportunities
      const mockVolArbOpportunities: VolArbOpportunity[] = [
        {
          id: 'arb-001',
          type: 'dispersion',
          name: 'SPX vs Components Dispersion',
          description: 'Index implied vol vs constituent weighted average vol',
          status: 'active',
          expectedReturn: 0.087,
          sharpeRatio: 1.34,
          maxDrawdown: -0.023,
          confidence: 0.78,
          legs: [
            { instrument: 'SPX Call', action: 'buy', quantity: 100, price: 45.67 },
            { instrument: 'AAPL Call', action: 'sell', quantity: 25, price: 4.78 },
            { instrument: 'MSFT Call', action: 'sell', quantity: 20, price: 6.23 },
            { instrument: 'GOOGL Call', action: 'sell', quantity: 15, price: 8.91 }
          ],
          riskMetrics: {
            delta: 0.0234,
            gamma: -0.0012,
            vega: 0.5678,
            theta: -0.0345
          },
          timestamp: '2025-10-03T10:30:00Z'
        },
        {
          id: 'arb-002',
          type: 'index_vs_constituents',
          name: 'NDX vs Top 10 Components',
          description: 'Nasdaq 100 vs largest 10 constituents vol spread',
          status: 'monitoring',
          expectedReturn: 0.054,
          sharpeRatio: 0.89,
          maxDrawdown: -0.045,
          confidence: 0.65,
          legs: [
            { instrument: 'NDX Put', action: 'buy', quantity: 50, price: 123.45 },
            { instrument: 'TSLA Put', action: 'sell', quantity: 10, price: 8.76 },
            { instrument: 'NVDA Put', action: 'sell', quantity: 8, price: 12.34 }
          ],
          riskMetrics: {
            delta: -0.0123,
            gamma: 0.0008,
            vega: 0.2345,
            theta: -0.0234
          },
          timestamp: '2025-10-03T10:25:00Z'
        },
        {
          id: 'arb-003',
          type: 'etf_vs_options',
          name: 'QQQ vs Options Arbitrage',
          description: 'ETF price vs synthetic options replication',
          status: 'active',
          expectedReturn: 0.023,
          sharpeRatio: 0.67,
          maxDrawdown: -0.012,
          confidence: 0.56,
          legs: [
            { instrument: 'QQQ Shares', action: 'sell', quantity: 1000, price: 345.67 },
            { instrument: 'QQQ Call', action: 'buy', quantity: 10, price: 12.34 },
            { instrument: 'QQQ Put', action: 'buy', quantity: 10, price: 8.91 }
          ],
          riskMetrics: {
            delta: 0.0045,
            gamma: -0.0003,
            vega: 0.1234,
            theta: -0.0123
          },
          timestamp: '2025-10-03T10:20:00Z'
        }
      ]

      // Simulate risk-neutral densities
      const mockRiskNeutralDensities: RiskNeutralDensity[] = [
        {
          id: 'rnd-001',
          underlying: 'SPX',
          expiration: '1M',
          distribution: {
            strikes: [3700, 3800, 3900, 4000, 4100, 4200, 4300],
            probabilities: [0.05, 0.12, 0.23, 0.28, 0.18, 0.09, 0.05],
            confidenceIntervals: {
              lower: [0.03, 0.09, 0.19, 0.24, 0.15, 0.07, 0.03],
              upper: [0.07, 0.15, 0.27, 0.32, 0.21, 0.11, 0.07]
            }
          },
          moments: {
            mean: 4012.34,
            variance: 12345.67,
            skewness: -0.234,
            kurtosis: 3.456
          },
          riskMetrics: {
            var95: 3850.00,
            var99: 3780.00,
            expectedShortfall: 3720.00
          },
          lastUpdated: '2025-10-03T10:30:00Z'
        },
        {
          id: 'rnd-002',
          underlying: 'AAPL',
          expiration: '2W',
          distribution: {
            strikes: [160, 170, 180, 190, 200, 210, 220],
            probabilities: [0.08, 0.15, 0.25, 0.22, 0.16, 0.09, 0.05],
            confidenceIntervals: {
              lower: [0.06, 0.12, 0.21, 0.18, 0.13, 0.07, 0.03],
              upper: [0.10, 0.18, 0.29, 0.26, 0.19, 0.11, 0.07]
            }
          },
          moments: {
            mean: 187.65,
            variance: 234.56,
            skewness: 0.123,
            kurtosis: 2.987
          },
          riskMetrics: {
            var95: 170.00,
            var99: 165.00,
            expectedShortfall: 162.00
          },
          lastUpdated: '2025-10-03T10:30:00Z'
        }
      ]

      // Simulate scenario ladders
      const mockScenarioLadders: ScenarioLadder[] = [
        {
          id: 'ladder-001',
          name: 'SPX Options Portfolio',
          description: 'Comprehensive scenario analysis for SPX options book',
          scenarios: [
            {
              name: 'Base Case',
              spotShock: 0.0,
              volShock: 0.0,
              timeDecay: 1.0,
              pnl: 0.00,
              delta: 0.1234,
              gamma: 0.0023,
              vega: 0.5678,
              theta: -0.0345
            },
            {
              name: 'Spot +2%',
              spotShock: 0.02,
              volShock: 0.0,
              timeDecay: 1.0,
              pnl: 2345.67,
              delta: 0.1456,
              gamma: 0.0021,
              vega: 0.5678,
              theta: -0.0345
            },
            {
              name: 'Spot -2%',
              spotShock: -0.02,
              volShock: 0.0,
              timeDecay: 1.0,
              pnl: -2100.34,
              delta: 0.1012,
              gamma: 0.0025,
              vega: 0.5678,
              theta: -0.0345
            },
            {
              name: 'Vol +20%',
              spotShock: 0.0,
              volShock: 0.2,
              timeDecay: 1.0,
              pnl: 5678.90,
              delta: 0.1234,
              gamma: 0.0023,
              vega: 0.6814,
              theta: -0.0414
            },
            {
              name: 'Vol -20%',
              spotShock: 0.0,
              volShock: -0.2,
              timeDecay: 1.0,
              pnl: -4567.89,
              delta: 0.1234,
              gamma: 0.0023,
              vega: 0.4542,
              theta: -0.0276
            },
            {
              name: 'Worst Case',
              spotShock: -0.03,
              volShock: 0.3,
              timeDecay: 1.0,
              pnl: -8901.23,
              delta: 0.0987,
              gamma: 0.0028,
              vega: 0.7381,
              theta: -0.0449
            }
          ],
          basePortfolio: {
            delta: 0.1234,
            gamma: 0.0023,
            vega: 0.5678,
            theta: -0.0345
          },
          worstCase: {
            pnl: -8901.23,
            scenario: 'Worst Case'
          },
          bestCase: {
            pnl: 6789.01,
            scenario: 'Spot +3%, Vol +30%'
          },
          lastUpdated: '2025-10-03T10:30:00Z'
        }
      ]

      setVolSurfaces(mockVolSurfaces)
      setGreeksData(mockGreeksData)
      setVolArbOpportunities(mockVolArbOpportunities)
      setRiskNeutralDensities(mockRiskNeutralDensities)
      setScenarioLadders(mockScenarioLadders)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'calibrated':
      case 'active':
      case 'passing':
        return 'text-green-500'
      case 'calibrating':
      case 'monitoring':
      case 'running':
        return 'text-yellow-500'
      case 'failed':
      case 'closed':
      case 'failing':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'calibrated':
      case 'active':
      case 'passing':
        return <CheckCircle className="h-4 w-4" />
      case 'calibrating':
      case 'monitoring':
      case 'running':
        return <AlertTriangle className="h-4 w-4" />
      case 'failed':
      case 'closed':
      case 'failing':
        return <Clock className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getModelIcon = (model: string) => {
    switch (model) {
      case 'SABR':
        return <LineChart className="h-4 w-4" />
      case 'SSVI':
        return <AreaChart className="h-4 w-4" />
      case 'Heston':
        return <ScatterChart className="h-4 w-4" />
      case 'LocalVol':
        return <BarChart3 className="h-4 w-4" />
      default:
        return <Calculator className="h-4 w-4" />
    }
  }

  const handleCalibrate = () => {
    setIsCalibrating(true)
    setTimeout(() => {
      setIsCalibrating(false)
    }, 6000)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toFixed(decimals)
  }

  const formatPercent = (num: number) => {
    return `${(num * 100).toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Options & Volatility Stack</h2>
          <p className="text-muted-foreground">
            Full vol surface engines with Greeks, risk-neutral density, and arbitrage
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCalibrate}
            disabled={isCalibrating}
          >
            {isCalibrating ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-pulse" />
                Calibrating...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-4 w-4" />
                Calibrate Surfaces
              </>
            )}
          </Button>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="surfaces" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="surfaces">Vol Surfaces</TabsTrigger>
          <TabsTrigger value="greeks">Live Greeks</TabsTrigger>
          <TabsTrigger value="arbitrage">Vol Arbitrage</TabsTrigger>
          <TabsTrigger value="density">Risk-Neutral Density</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Ladders</TabsTrigger>
        </TabsList>

        <TabsContent value="surfaces" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {volSurfaces.map((surface) => (
              <Card 
                key={surface.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedSurface === surface.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedSurface(surface.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getModelIcon(surface.model)}
                      {surface.name}
                    </CardTitle>
                    <div className={getStatusColor(surface.status)}>
                      {getStatusIcon(surface.status)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{surface.model}</Badge>
                    <span className="ml-2 text-xs">{surface.underlying}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Data Points</span>
                      <div className="font-medium">{surface.marketDataPoints.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Strikes</span>
                      <div className="font-medium">{surface.strikes.length}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expirations</span>
                      <div className="font-medium">{surface.expirations.length}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">R²</span>
                      <div className="font-medium">{formatPercent(surface.calibrationMetrics.r2)}</div>
                    </div>
                  </div>
                  {surface.parameters.alpha && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">SABR Parameters</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>α: {formatNumber(surface.parameters.alpha!)}</div>
                        <div>β: {formatNumber(surface.parameters.beta!)}</div>
                        <div>ρ: {formatNumber(surface.parameters.rho!)}</div>
                        <div>ν: {formatNumber(surface.parameters.nu!)}</div>
                      </div>
                    </div>
                  )}
                  {surface.parameters.eta && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">SSVI Parameters</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>η: {formatNumber(surface.parameters.eta!)}</div>
                        <div>γ: {formatNumber(surface.parameters.gamma!)}</div>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Calibration MSE</span>
                      <span className="font-medium">{surface.calibrationMetrics.mse.toExponential(3)}</span>
                    </div>
                    <Progress value={surface.calibrationMetrics.r2 * 100} className="h-2" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last calibrated: {new Date(surface.lastCalibrated).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="greeks" className="space-y-4">
          <div className="grid gap-4">
            {greeksData.map((greek) => (
              <Card key={greek.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {greek.symbol} {greek.strike} {greek.expiration} {greek.optionType.toUpperCase()}
                    </CardTitle>
                    <Badge variant={greek.optionType === 'call' ? 'default' : 'secondary'}>
                      {greek.optionType.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription>
                    Spot: ${greek.spot.toFixed(2)} | IV: {formatPercent(greek.impliedVol)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-3">
                      <h4 className="font-semibold">First Order Greeks</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Delta</span>
                          <span className={`font-medium ${greek.delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatNumber(greek.delta)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Vega</span>
                          <span className="font-medium">{formatNumber(greek.vega)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Theta</span>
                          <span className={`font-medium ${greek.theta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatNumber(greek.theta)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Rho</span>
                          <span className={`font-medium ${greek.rho >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatNumber(greek.rho)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Second Order Greeks</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Gamma</span>
                          <span className="font-medium">{formatNumber(greek.gamma)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Vanna</span>
                          <span className="font-medium">{formatNumber(greek.gamma * 0.1)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Charm</span>
                          <span className="font-medium">{formatNumber(greek.delta * 0.01)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Pricing</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Theoretical</span>
                          <span className="font-medium">${formatNumber(greek.theoreticalPrice)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Market</span>
                          <span className="font-medium">${formatNumber(greek.marketPrice)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Bid-Ask</span>
                          <span className="font-medium">${formatNumber(greek.bidAskSpread)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Mispricing</span>
                          <span className={`font-medium ${Math.abs(greek.marketPrice - greek.theoreticalPrice) > greek.bidAskSpread ? 'text-red-600' : 'text-green-600'}`}>
                            ${formatNumber(greek.marketPrice - greek.theoreticalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Updated: {new Date(greek.timestamp).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="arbitrage" className="space-y-4">
          <div className="grid gap-4">
            {volArbOpportunities.map((arb) => (
              <Card key={arb.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      {arb.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{arb.type.replace('_', ' ')}</Badge>
                      <div className={getStatusColor(arb.status)}>
                        {getStatusIcon(arb.status)}
                      </div>
                    </div>
                  </div>
                  <CardDescription>{arb.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Expected Return</div>
                      <div className="font-medium text-green-600">{formatPercent(arb.expectedReturn)}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                      <div className="font-medium">{formatNumber(arb.sharpeRatio)}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Max Drawdown</div>
                      <div className="font-medium text-red-600">{formatPercent(arb.maxDrawdown)}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Confidence</div>
                      <div className="font-medium">{formatPercent(arb.confidence)}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="font-semibold">Portfolio Legs</h4>
                    <div className="space-y-2">
                      {arb.legs.map((leg, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <Badge variant={leg.action === 'buy' ? 'default' : 'destructive'}>
                              {leg.action.toUpperCase()}
                            </Badge>
                            <span className="text-sm font-medium">{leg.instrument}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">{leg.quantity}x</span>
                            <span className="ml-2">${formatNumber(leg.price)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Risk Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Delta</span>
                          <span className={`font-medium ${arb.riskMetrics.delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatNumber(arb.riskMetrics.delta)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Gamma</span>
                          <span className="font-medium">{formatNumber(arb.riskMetrics.gamma)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Vega</span>
                          <span className="font-medium">{formatNumber(arb.riskMetrics.vega)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Theta</span>
                          <span className={`font-medium ${arb.riskMetrics.theta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatNumber(arb.riskMetrics.theta)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Execution</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="mr-2 h-4 w-4" />
                          Monitor Opportunity
                        </Button>
                        <Button variant="default" size="sm" className="w-full">
                          <Target className="mr-2 h-4 w-4" />
                          Execute Trade
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Identified: {new Date(arb.timestamp).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="density" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {riskNeutralDensities.map((rnd) => (
              <Card key={rnd.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      {rnd.underlying} Risk-Neutral Density
                    </CardTitle>
                    <Badge variant="outline">{rnd.expiration}</Badge>
                  </div>
                  <CardDescription>
                    Risk-neutral probability distribution and risk metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Distribution Moments</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Mean</span>
                        <div className="font-medium">{formatNumber(rnd.moments.mean)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Variance</span>
                        <div className="font-medium">{formatNumber(rnd.moments.variance)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Skewness</span>
                        <div className={`font-medium ${rnd.moments.skewness >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatNumber(rnd.moments.skewness)}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Kurtosis</span>
                        <div className="font-medium">{formatNumber(rnd.moments.kurtosis)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Risk Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">VaR 95%</span>
                        <span className="font-medium text-red-600">{formatNumber(rnd.riskMetrics.var95)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">VaR 99%</span>
                        <span className="font-medium text-red-600">{formatNumber(rnd.riskMetrics.var99)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expected Shortfall</span>
                        <span className="font-medium text-red-600">{formatNumber(rnd.riskMetrics.expectedShortfall)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Probability Distribution</h4>
                    <div className="space-y-2">
                      {rnd.distribution.strikes.map((strike, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">${strike}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${rnd.distribution.probabilities[index] * 100}%` }}
                              />
                            </div>
                            <span className="font-medium w-12 text-right">
                              {formatPercent(rnd.distribution.probabilities[index])}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Updated: {new Date(rnd.lastUpdated).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <div className="grid gap-4">
            {scenarioLadders.map((ladder) => (
              <Card key={ladder.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      {ladder.name}
                    </CardTitle>
                    <Badge variant="outline">Scenario Analysis</Badge>
                  </div>
                  <CardDescription>{ladder.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Base Portfolio</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Delta</span>
                          <span className={`font-medium ${ladder.basePortfolio.delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatNumber(ladder.basePortfolio.delta)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Gamma</span>
                          <span className="font-medium">{formatNumber(ladder.basePortfolio.gamma)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Vega</span>
                          <span className="font-medium">{formatNumber(ladder.basePortfolio.vega)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Theta</span>
                          <span className={`font-medium ${ladder.basePortfolio.theta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatNumber(ladder.basePortfolio.theta)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-600">Best Case</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">P&L</span>
                          <span className="font-medium text-green-600">
                            ${formatNumber(ladder.bestCase.pnl)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Scenario</span>
                          <span className="font-medium">{ladder.bestCase.scenario}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-red-600">Worst Case</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">P&L</span>
                          <span className="font-medium text-red-600">
                            ${formatNumber(ladder.worstCase.pnl)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Scenario</span>
                          <span className="font-medium">{ladder.worstCase.scenario}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="font-semibold">Scenario Analysis</h4>
                    <div className="space-y-2">
                      {ladder.scenarios.map((scenario, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              scenario.pnl === ladder.worstCase.pnl ? 'bg-red-500' :
                              scenario.pnl === ladder.bestCase.pnl ? 'bg-green-500' : 'bg-gray-500'
                            }`} />
                            <div>
                              <div className="font-medium text-sm">{scenario.name}</div>
                              <div className="text-xs text-muted-foreground">
                                Spot: {formatPercent(scenario.spotShock)} | Vol: {formatPercent(scenario.volShock)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-medium ${
                              scenario.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              ${formatNumber(scenario.pnl)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Δ: {formatNumber(scenario.delta)} | Γ: {formatNumber(scenario.gamma)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Updated: {new Date(ladder.lastUpdated).toLocaleString()}
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