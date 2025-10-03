'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Globe, 
  Twitter, 
  Newspaper, 
  Satellite,
  Brain,
  Target,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  RefreshCw,
  Settings,
  Download,
  Upload
} from 'lucide-react'
import OODALoopSystem from '@/components/OODALoopSystem'
import StrategyDiscoveryEngine from '@/components/StrategyDiscoveryEngine'
import AlternativeDataIntegration from '@/components/AlternativeDataIntegration'
import SystemValidation from '@/components/SystemValidation'
import BrokerageConnectivity from '@/components/BrokerageConnectivity'
import BacktestingEngine from '@/components/BacktestingEngine'
import FeatureStoreLineage from '@/components/FeatureStoreLineage'
import AdvancedModelPlatform from '@/components/AdvancedModelPlatform'
import QuantumOptimization from '@/components/QuantumOptimization'
import AdvancedRiskManagement from '@/components/AdvancedRiskManagement'
import ExecutionStack from '@/components/ExecutionStack'

interface DataSource {
  id: string
  name: string
  type: 'news' | 'social' | 'satellite' | 'market' | 'alternative'
  status: 'active' | 'inactive' | 'error'
  lastUpdate: string
  signalCount: number
  confidence: number
  icon: React.ReactNode
}

interface KPICard {
  title: string
  value: string | number
  change: number
  changeType: 'positive' | 'negative' | 'neutral'
  description: string
  trend: 'up' | 'down' | 'stable'
}

interface Signal {
  id: string
  source: string
  type: string
  confidence: number
  timestamp: string
  description: string
  impact: 'high' | 'medium' | 'low'
}

export default function TradingPlatform() {
  const [activeDataSources, setActiveDataSources] = useState<DataSource[]>([
    {
      id: '1',
      name: 'Financial News API',
      type: 'news',
      status: 'active',
      lastUpdate: '2 mins ago',
      signalCount: 24,
      confidence: 87,
      icon: <Newspaper className="h-4 w-4" />
    },
    {
      id: '2',
      name: 'Twitter Sentiment',
      type: 'social',
      status: 'active',
      lastUpdate: '1 min ago',
      signalCount: 156,
      confidence: 72,
      icon: <Twitter className="h-4 w-4" />
    },
    {
      id: '3',
      name: 'Satellite Imagery',
      type: 'satellite',
      status: 'active',
      lastUpdate: '15 mins ago',
      signalCount: 8,
      confidence: 91,
      icon: <Satellite className="h-4 w-4" />
    },
    {
      id: '4',
      name: 'Market Data Feed',
      type: 'market',
      status: 'active',
      lastUpdate: 'Real-time',
      signalCount: 342,
      confidence: 95,
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      id: '5',
      name: 'Alternative Data',
      type: 'alternative',
      status: 'inactive',
      lastUpdate: '1 hour ago',
      signalCount: 12,
      confidence: 68,
      icon: <Globe className="h-4 w-4" />
    }
  ])

  const [kpiData, setKpiData] = useState<KPICard[]>([
    {
      title: 'Total Signals',
      value: '542',
      change: 12.5,
      changeType: 'positive',
      description: 'Signals from all sources',
      trend: 'up'
    },
    {
      title: 'Win Rate',
      value: '68.4%',
      change: 3.2,
      changeType: 'positive',
      description: 'Last 30 days performance',
      trend: 'up'
    },
    {
      title: 'Active Strategies',
      value: '7',
      change: 0,
      changeType: 'neutral',
      description: 'Currently running strategies',
      trend: 'stable'
    },
    {
      title: 'Data Sources',
      value: '4/5',
      change: -20,
      changeType: 'negative',
      description: 'Active connections',
      trend: 'down'
    }
  ])

  const [recentSignals, setRecentSignals] = useState<Signal[]>([
    {
      id: '1',
      source: 'Financial News',
      type: 'Earnings Alert',
      confidence: 89,
      timestamp: '2 mins ago',
      description: 'AAPL earnings beat expectations by 8%',
      impact: 'high'
    },
    {
      id: '2',
      source: 'Twitter Sentiment',
      type: 'Social Momentum',
      confidence: 76,
      timestamp: '5 mins ago',
      description: 'TSLA sentiment turning positive',
      impact: 'medium'
    },
    {
      id: '3',
      source: 'Satellite Imagery',
      type: 'Economic Activity',
      confidence: 92,
      timestamp: '12 mins ago',
      description: 'Increased shipping activity at major ports',
      impact: 'high'
    },
    {
      id: '4',
      source: 'Market Data',
      type: 'Volume Anomaly',
      confidence: 84,
      timestamp: '18 mins ago',
      description: 'Unusual volume detected in NVDA',
      impact: 'medium'
    }
  ])

  const [isRealTime, setIsRealTime] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')

  useEffect(() => {
    if (!isRealTime) return

    const interval = setInterval(() => {
      // Simulate real-time data updates
      setKpiData(prev => prev.map(kpi => ({
        ...kpi,
        change: kpi.change + (Math.random() - 0.5) * 2,
        value: typeof kpi.value === 'string' && kpi.value.includes('%') 
          ? `${(parseFloat(kpi.value) + (Math.random() - 0.5) * 0.5).toFixed(1)}%`
          : kpi.value
      })))

      // Add new random signal
      const sources = ['Financial News', 'Twitter Sentiment', 'Satellite Imagery', 'Market Data']
      const types = ['Earnings Alert', 'Social Momentum', 'Economic Activity', 'Volume Anomaly']
      const newSignal: Signal = {
        id: Date.now().toString(),
        source: sources[Math.floor(Math.random() * sources.length)],
        type: types[Math.floor(Math.random() * types.length)],
        confidence: Math.floor(Math.random() * 30) + 70,
        timestamp: 'Just now',
        description: 'New signal detected',
        impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low'
      }
      
      setRecentSignals(prev => [newSignal, ...prev.slice(0, 3)])
    }, 5000)

    return () => clearInterval(interval)
  }, [isRealTime])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-gray-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Advanced Trading Platform</h1>
            <p className="text-muted-foreground">Real-time alternative data integration and analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isRealTime ? "default" : "outline"}
              size="sm"
              onClick={() => setIsRealTime(!isRealTime)}
            >
              {isRealTime ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
              {isRealTime ? 'Live Mode' : 'Paused'}
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <div className="flex items-center">
                  {kpi.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                  {kpi.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                  {kpi.trend === 'stable' && <Activity className="h-4 w-4 text-blue-500" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className={kpi.changeType === 'positive' ? 'text-green-500' : kpi.changeType === 'negative' ? 'text-red-500' : 'text-gray-500'}>
                    {kpi.changeType === 'positive' && <ArrowUpRight className="inline h-3 w-3 mr-1" />}
                    {kpi.changeType === 'negative' && <ArrowDownRight className="inline h-3 w-3 mr-1" />}
                    {Math.abs(kpi.change)}%
                  </span>
                  <span className="ml-2">{kpi.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid w-full grid-cols-12">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="ooda">OODA</TabsTrigger>
            <TabsTrigger value="data-sources">Data</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="quantum">Quantum</TabsTrigger>
            <TabsTrigger value="risk">Risk</TabsTrigger>
            <TabsTrigger value="execution">Execution</TabsTrigger>
            <TabsTrigger value="brokerage">Brokerage</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Data Sources Status */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Data Sources Status
                  </CardTitle>
                  <CardDescription>Real-time status of all integrated data sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeDataSources.map((source) => (
                    <div key={source.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(source.status)}`} />
                        {source.icon}
                        <div>
                          <div className="font-medium">{source.name}</div>
                          <div className="text-sm text-muted-foreground">{source.lastUpdate}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{source.signalCount} signals</div>
                          <div className="text-xs text-muted-foreground">{source.confidence}% confidence</div>
                        </div>
                        <Progress value={source.confidence} className="w-16" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Signals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Recent Signals
                  </CardTitle>
                  <CardDescription>Latest signals from all sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentSignals.map((signal) => (
                    <div key={signal.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={getImpactColor(signal.impact)}>
                          {signal.impact}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{signal.timestamp}</span>
                      </div>
                      <div className="text-sm font-medium">{signal.type}</div>
                      <div className="text-xs text-muted-foreground">{signal.description}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{signal.source}</span>
                        <div className="flex items-center gap-1">
                          <div className="text-xs font-medium">{signal.confidence}%</div>
                          <Progress value={signal.confidence} className="w-12 h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* System Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  OODA Loop System Status
                </CardTitle>
                <CardDescription>Real-time decision-making and analysis framework</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-500">Observe</div>
                    <div className="text-sm text-muted-foreground mt-2">Collecting data from 5 sources</div>
                    <div className="text-xs text-green-500 mt-1">● Active</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-500">Orient</div>
                    <div className="text-sm text-muted-foreground mt-2">Processing 542 signals</div>
                    <div className="text-xs text-green-500 mt-1">● Active</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-500">Decide</div>
                    <div className="text-sm text-muted-foreground mt-2">12 decisions pending</div>
                    <div className="text-xs text-yellow-500 mt-1">● Processing</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-500">Act</div>
                    <div className="text-sm text-muted-foreground mt-2">7 strategies active</div>
                    <div className="text-xs text-green-500 mt-1">● Active</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ooda" className="space-y-4">
            <OODALoopSystem />
          </TabsContent>

          <TabsContent value="data-sources" className="space-y-4">
            <AlternativeDataIntegration />
          </TabsContent>

          <TabsContent value="strategies" className="space-y-4">
            <StrategyDiscoveryEngine />
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <FeatureStoreLineage />
          </TabsContent>

          <TabsContent value="models" className="space-y-4">
            <AdvancedModelPlatform />
          </TabsContent>

          <TabsContent value="quantum" className="space-y-4">
            <QuantumOptimization />
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <AdvancedRiskManagement />
          </TabsContent>

          <TabsContent value="execution" className="space-y-4">
            <ExecutionStack />
          </TabsContent>

          <TabsContent value="brokerage" className="space-y-4">
            <BrokerageConnectivity />
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <SystemValidation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}