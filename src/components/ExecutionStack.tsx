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
  Zap,
  Activity,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Play,
  Pause,
  RefreshCw,
  Settings,
  TrendingUp,
  TrendingDown,
  Target,
  Layers,
  GitBranch,
  Radio,
  Cpu,
  Database,
  ArrowUpDown,
  Eye,
  EyeOff
} from 'lucide-react'

interface Order {
  id: string
  clientId: string
  symbol: string
  side: 'buy' | 'sell'
  quantity: number
  price?: number
  orderType: 'market' | 'limit' | 'stop' | 'twap' | 'vwap' | 'pov' | 'is'
  status: 'pending' | 'working' | 'filled' | 'cancelled' | 'rejected'
  filledQuantity: number
  avgPrice: number
  timestamp: string
  venue: string
  algorithm?: string
  urgency: 'low' | 'medium' | 'high'
}

interface ExecutionVenue {
  id: string
  name: string
  type: 'exchange' | 'dark_pool' | 'ecn' | 'broker'
  status: 'active' | 'inactive' | 'maintenance'
  latency: number
  fee: number
  rebate: number
  volume: number
  marketShare: number
  toxicity: number
  queuePosition: number
  spread: number
  depth: number
}

interface ExecutionAlgorithm {
  id: string
  name: string
  type: 'twap' | 'vwap' | 'pov' | 'is' | 'adaptive'
  status: 'active' | 'inactive' | 'testing'
  performance: {
    fillRate: number
    avgSlippage: number
    cost: number
    speed: number
  }
  parameters: {
    participationRate: number
    maxParticipation: number
    minSize: number
    maxSize: number
    timeWindow: number
  }
  lastOptimized: string
}

interface TCAMetric {
  id: string
  orderId: string
  venue: string
  arrivalPrice: number
  fillPrice: number
  slippageBps: number
  urgency: string
  childAlgorithm: string
  executionTime: number
  fees: number
  rebates: number
  netCost: number
  toxicity: number
  timestamp: string
}

interface OrderBookLevel {
  price: number
  quantity: number
  orders: number
  isOwn: boolean
}

interface OrderBook {
  symbol: string
  timestamp: string
  bid: OrderBookLevel[]
  ask: OrderBookLevel[]
  spread: number
  midPrice: number
  imbalance: number
  totalVolume: number
}

export default function ExecutionStack() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [venues, setVenues] = useState<ExecutionVenue[]>([])
  const [algorithms, setAlgorithms] = useState<ExecutionAlgorithm[]>([])
  const [tcaMetrics, setTCAMetrics] = useState<TCAMetric[]>([])
  const [orderBooks, setOrderBooks] = useState<OrderBook[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      // Simulate orders
      const mockOrders: Order[] = [
        {
          id: 'order-001',
          clientId: 'client-001',
          symbol: 'AAPL',
          side: 'buy',
          quantity: 10000,
          price: 175.50,
          orderType: 'twap',
          status: 'working',
          filledQuantity: 3500,
          avgPrice: 175.48,
          timestamp: '2025-10-03T10:30:00Z',
          venue: 'NASDAQ',
          algorithm: 'TWAP_V2',
          urgency: 'medium'
        },
        {
          id: 'order-002',
          clientId: 'client-002',
          symbol: 'MSFT',
          side: 'sell',
          quantity: 5000,
          price: 410.25,
          orderType: 'vwap',
          status: 'filled',
          filledQuantity: 5000,
          avgPrice: 410.27,
          timestamp: '2025-10-03T10:25:00Z',
          venue: 'NYSE',
          algorithm: 'VWAP_ADAPTIVE',
          urgency: 'low'
        },
        {
          id: 'order-003',
          clientId: 'client-003',
          symbol: 'GOOGL',
          side: 'buy',
          quantity: 2000,
          orderType: 'limit',
          status: 'pending',
          filledQuantity: 0,
          avgPrice: 0,
          timestamp: '2025-10-03T10:35:00Z',
          venue: 'ARCA',
          urgency: 'high'
        },
        {
          id: 'order-004',
          clientId: 'client-004',
          symbol: 'TSLA',
          side: 'sell',
          quantity: 8000,
          orderType: 'pov',
          status: 'working',
          filledQuantity: 1200,
          avgPrice: 238.91,
          timestamp: '2025-10-03T10:20:00Z',
          venue: 'DARK_POOL_1',
          algorithm: 'POV_DYNAMIC',
          urgency: 'medium'
        }
      ]

      // Simulate execution venues
      const mockVenues: ExecutionVenue[] = [
        {
          id: 'venue-001',
          name: 'NASDAQ',
          type: 'exchange',
          status: 'active',
          latency: 0.12,
          fee: 0.0025,
          rebate: 0.0015,
          volume: 45000000,
          marketShare: 18.5,
          toxicity: 0.12,
          queuePosition: 15,
          spread: 0.01,
          depth: 25000
        },
        {
          id: 'venue-002',
          name: 'NYSE',
          type: 'exchange',
          status: 'active',
          latency: 0.15,
          fee: 0.0030,
          rebate: 0.0012,
          volume: 38000000,
          marketShare: 15.2,
          toxicity: 0.08,
          queuePosition: 8,
          spread: 0.01,
          depth: 22000
        },
        {
          id: 'venue-003',
          name: 'ARCA',
          type: 'ecn',
          status: 'active',
          latency: 0.08,
          fee: 0.0020,
          rebate: 0.0018,
          volume: 28000000,
          marketShare: 11.8,
          toxicity: 0.15,
          queuePosition: 22,
          spread: 0.005,
          depth: 18000
        },
        {
          id: 'venue-004',
          name: 'Dark Pool 1',
          type: 'dark_pool',
          status: 'active',
          latency: 0.25,
          fee: 0.0015,
          rebate: 0,
          volume: 15000000,
          marketShare: 6.2,
          toxicity: 0.05,
          queuePosition: 0,
          spread: 0,
          depth: 50000
        }
      ]

      // Simulate execution algorithms
      const mockAlgorithms: ExecutionAlgorithm[] = [
        {
          id: 'algo-001',
          name: 'TWAP V2',
          type: 'twap',
          status: 'active',
          performance: {
            fillRate: 98.5,
            avgSlippage: 2.3,
            cost: 3.1,
            speed: 85
          },
          parameters: {
            participationRate: 15,
            maxParticipation: 25,
            minSize: 100,
            maxSize: 10000,
            timeWindow: 300
          },
          lastOptimized: '2025-10-02T16:00:00Z'
        },
        {
          id: 'algo-002',
          name: 'VWAP Adaptive',
          type: 'vwap',
          status: 'active',
          performance: {
            fillRate: 96.8,
            avgSlippage: 1.8,
            cost: 2.7,
            speed: 78
          },
          parameters: {
            participationRate: 20,
            maxParticipation: 30,
            minSize: 200,
            maxSize: 15000,
            timeWindow: 240
          },
          lastOptimized: '2025-10-02T18:30:00Z'
        },
        {
          id: 'algo-003',
          name: 'POV Dynamic',
          type: 'pov',
          status: 'active',
          performance: {
            fillRate: 94.2,
            avgSlippage: 3.1,
            cost: 2.9,
            speed: 92
          },
          parameters: {
            participationRate: 10,
            maxParticipation: 20,
            minSize: 500,
            maxSize: 20000,
            timeWindow: 360
          },
          lastOptimized: '2025-10-03T08:00:00Z'
        }
      ]

      // Simulate TCA metrics
      const mockTCAMetrics: TCAMetric[] = [
        {
          id: 'tca-001',
          orderId: 'order-001',
          venue: 'NASDAQ',
          arrivalPrice: 175.50,
          fillPrice: 175.48,
          slippageBps: -1.14,
          urgency: 'medium',
          childAlgorithm: 'TWAP_V2',
          executionTime: 180,
          fees: 8.75,
          rebates: 5.25,
          netCost: 3.50,
          toxicity: 0.12,
          timestamp: '2024-01-15T10:30:00Z'
        },
        {
          id: 'tca-002',
          orderId: 'order-002',
          venue: 'NYSE',
          arrivalPrice: 410.25,
          fillPrice: 410.27,
          slippageBps: 0.49,
          urgency: 'low',
          childAlgorithm: 'VWAP_ADAPTIVE',
          executionTime: 240,
          fees: 12.50,
          rebates: 6.00,
          netCost: 6.50,
          toxicity: 0.08,
          timestamp: '2024-01-15T10:25:00Z'
        }
      ]

      // Simulate order books
      const mockOrderBooks: OrderBook[] = [
        {
          symbol: 'AAPL',
          timestamp: '2025-10-03T10:30:00Z',
          bid: [
            { price: 175.48, quantity: 1500, orders: 12, isOwn: false },
            { price: 175.47, quantity: 2300, orders: 18, isOwn: false },
            { price: 175.46, quantity: 1800, orders: 15, isOwn: true },
            { price: 175.45, quantity: 3200, orders: 22, isOwn: false },
            { price: 175.44, quantity: 2100, orders: 16, isOwn: false }
          ],
          ask: [
            { price: 175.49, quantity: 1200, orders: 10, isOwn: false },
            { price: 175.50, quantity: 2800, orders: 20, isOwn: true },
            { price: 175.51, quantity: 1900, orders: 14, isOwn: false },
            { price: 175.52, quantity: 2500, orders: 19, isOwn: false },
            { price: 175.53, quantity: 1600, orders: 13, isOwn: false }
          ],
          spread: 0.01,
          midPrice: 175.485,
          imbalance: -0.08,
          totalVolume: 25000
        }
      ]

      setOrders(mockOrders)
      setVenues(mockVenues)
      setAlgorithms(mockAlgorithms)
      setTCAMetrics(mockTCAMetrics)
      setOrderBooks(mockOrderBooks)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'filled':
      case 'working':
        return 'text-green-500'
      case 'pending':
      case 'testing':
        return 'text-yellow-500'
      case 'inactive':
      case 'cancelled':
      case 'maintenance':
        return 'text-gray-500'
      case 'rejected':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'filled':
      case 'working':
        return <CheckCircle className="h-4 w-4" />
      case 'pending':
      case 'testing':
        return <AlertTriangle className="h-4 w-4" />
      case 'inactive':
      case 'cancelled':
      case 'maintenance':
        return <Pause className="h-4 w-4" />
      case 'rejected':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getSideColor = (side: string) => {
    return side === 'buy' ? 'text-green-500' : 'text-red-500'
  }

  const getSideIcon = (side: string) => {
    return side === 'buy' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
  }

  const handleExecutionToggle = () => {
    setIsExecuting(!isExecuting)
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
          <h2 className="text-3xl font-bold tracking-tight">Execution Stack (OMS/EMS)</h2>
          <p className="text-muted-foreground">
            Order management, execution algorithms, and microstructure intelligence
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExecutionToggle}
          >
            {isExecuting ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause Execution
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Resume Execution
              </>
            )}
          </Button>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="venues">Venues</TabsTrigger>
          <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
          <TabsTrigger value="orderbook">Order Book</TabsTrigger>
          <TabsTrigger value="tca">TCA</TabsTrigger>
          <TabsTrigger value="routing">Routing</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Order Management System (OMS)
              </CardTitle>
              <CardDescription>
                Real-time order tracking and execution management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedOrder === order.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedOrder(order.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={getSideColor(order.side)}>
                            {getSideIcon(order.side)}
                          </div>
                          <span className="font-medium">{order.symbol}</span>
                          <Badge variant="outline">{order.orderType.toUpperCase()}</Badge>
                          <Badge variant="secondary">{order.urgency}</Badge>
                          <div className={getStatusColor(order.status)}>
                            {getStatusIcon(order.status)}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(order.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Quantity</span>
                          <div className="font-medium">
                            {order.filledQuantity}/{order.quantity}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avg Price</span>
                          <div className="font-medium">
                            ${order.avgPrice.toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Venue</span>
                          <div className="font-medium">{order.venue}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Fill Rate</span>
                          <div className="font-medium">
                            {((order.filledQuantity / order.quantity) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      {order.algorithm && (
                        <div className="text-sm text-muted-foreground">
                          Algorithm: {order.algorithm}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="venues" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {venues.map((venue) => (
              <Card 
                key={venue.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedVenue === venue.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedVenue(venue.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{venue.name}</CardTitle>
                    <div className={getStatusColor(venue.status)}>
                      {getStatusIcon(venue.status)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{venue.type}</Badge>
                    <span className="ml-2 text-xs">{venue.marketShare}% market share</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Latency</span>
                      <div className="font-medium">{venue.latency}ms</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Spread</span>
                      <div className="font-medium">${venue.spread}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fee</span>
                      <div className="font-medium">{venue.fee}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rebate</span>
                      <div className="font-medium">{venue.rebate}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Toxicity</span>
                      <div className="font-medium">{(venue.toxicity * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Queue Pos</span>
                      <div className="font-medium">{venue.queuePosition}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Volume</span>
                      <span className="font-medium">
                        ${(venue.volume / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Depth</span>
                      <span className="font-medium">
                        {venue.depth.toLocaleString()} shares
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="algorithms" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {algorithms.map((algo) => (
              <Card key={algo.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{algo.name}</CardTitle>
                    <div className={getStatusColor(algo.status)}>
                      {getStatusIcon(algo.status)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{algo.type.toUpperCase()}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Fill Rate</span>
                      <div className="font-medium">{algo.performance.fillRate}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Slippage</span>
                      <div className="font-medium">{algo.performance.avgSlippage}bps</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost</span>
                      <div className="font-medium">{algo.performance.cost}bps</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Speed</span>
                      <div className="font-medium">{algo.performance.speed}%</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Parameters</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Participation</span>
                        <div className="font-medium">{algo.parameters.participationRate}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Max Size</span>
                        <div className="font-medium">{algo.parameters.maxSize}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time Window</span>
                        <div className="font-medium">{algo.parameters.timeWindow}s</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Min Size</span>
                        <div className="font-medium">{algo.parameters.minSize}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last optimized: {new Date(algo.lastOptimized).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orderbook" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Order Book Intelligence
              </CardTitle>
              <CardDescription>
                Real-time order book analysis and microstructure insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orderBooks.map((book) => (
                <div key={book.symbol} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{book.symbol}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span>Spread: ${book.spread}</span>
                      <span>Mid: ${book.midPrice}</span>
                      <span>Imbalance: {(book.imbalance * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-green-500">Bid</h4>
                      <div className="space-y-1">
                        {book.bid.map((level, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className={level.isOwn ? 'font-bold text-blue-500' : ''}>
                              ${level.price}
                            </span>
                            <span className={level.isOwn ? 'font-bold text-blue-500' : ''}>
                              {level.quantity.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground">
                              {level.orders} orders
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-red-500">Ask</h4>
                      <div className="space-y-1">
                        {book.ask.map((level, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className={level.isOwn ? 'font-bold text-blue-500' : ''}>
                              ${level.price}
                            </span>
                            <span className={level.isOwn ? 'font-bold text-blue-500' : ''}>
                              {level.quantity.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground">
                              {level.orders} orders
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tca" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Transaction Cost Analysis (TCA)
              </CardTitle>
              <CardDescription>
                Comprehensive execution cost analysis and venue performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {tcaMetrics.map((tca) => (
                    <div key={tca.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{tca.orderId}</span>
                          <Badge variant="outline">{tca.venue}</Badge>
                          <Badge variant="secondary">{tca.urgency}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(tca.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Arrival Price</span>
                          <div className="font-medium">${tca.arrivalPrice}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Fill Price</span>
                          <div className="font-medium">${tca.fillPrice}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Slippage</span>
                          <div className={`font-medium ${
                            tca.slippageBps < 0 ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {tca.slippageBps.toFixed(2)}bps
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Net Cost</span>
                          <div className="font-medium">${tca.netCost.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Execution Time</span>
                          <div className="font-medium">{tca.executionTime}s</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Fees</span>
                          <div className="font-medium">${tca.fees.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rebates</span>
                          <div className="font-medium">${tca.rebates.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Toxicity</span>
                          <div className="font-medium">{(tca.toxicity * 100).toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Algorithm: {tca.childAlgorithm}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Smart Order Routing
                </CardTitle>
                <CardDescription>
                  Intelligent venue selection and order routing logic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Latency Priority</span>
                    <Badge>ARCA</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cost Priority</span>
                    <Badge variant="secondary">Dark Pool 1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Liquidity Priority</span>
                    <Badge variant="outline">NASDAQ</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Toxicity Avoidance</span>
                    <Badge variant="secondary">NYSE</Badge>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium">Routing Rules</div>
                  <div className="text-sm text-muted-foreground">
                    • Orders {'>'} 10K shares → Dark Pool<br/>
                    • High urgency → Fastest venue<br/>
                    • Cost sensitive → Highest rebate<br/>
                    • Toxicity detected → Switch venue
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5" />
                  Multi-Broker Fallback
                </CardTitle>
                <CardDescription>
                  Broker redundancy and failover mechanisms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Primary Broker</span>
                    <Badge>Interactive Brokers</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Secondary Broker</span>
                    <Badge variant="secondary">Alpaca</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tertiary Broker</span>
                    <Badge variant="outline">Binance</Badge>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium">Failover Triggers</div>
                  <div className="text-sm text-muted-foreground">
                    • Latency {'>'} 100ms<br/>
                    • Error rate {'>'} 5%<br/>
                    • Connection timeout<br/>
                    • API rate limit
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}