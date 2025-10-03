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
  Cpu,
  Zap,
  BarChart3,
  TrendingUp,
  Target,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Download,
  Upload,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Brain,
  GitBranch,
  Hexagon,
  Layers
} from 'lucide-react'

interface OptimizationProblem {
  id: string
  name: string
  type: 'portfolio' | 'allocation' | 'risk' | 'execution'
  formulation: 'QUBO' | 'Ising' | 'classical' | 'hybrid'
  status: 'solved' | 'solving' | 'pending' | 'failed'
  objective: number
  constraints: number
  variables: number
  solveTime: number
  quality: number
  backend: 'quantum' | 'digital_annealing' | 'classical' | 'hybrid'
  lastRun: string
}

interface SolverPerformance {
  name: string
  type: 'quantum' | 'digital_annealing' | 'classical' | 'quantum_inspired'
  avgSolveTime: number
  successRate: number
  solutionQuality: number
  costPerRun: number
  scalability: number
  status: 'active' | 'maintenance' | 'deprecated'
}

interface QuantumStochasticWalk {
  id: string
  name: string
  graphType: 'correlation' | 'sector' | 'factor' | 'temporal'
  nodes: number
  edges: number
  walkType: 'continuous' | 'discrete'
  stability: number
  turnover: number
  performance: {
    sharpe: number
    return: number
    volatility: number
    maxDrawdown: number
  }
  comparison: {
    vsClassical: number
    vsEqualWeight: number
    vsMarketCap: number
  }
}

interface OptimizationResult {
  id: string
  problemId: string
  solver: string
  timestamp: string
  solution: number[]
  objectiveValue: number
  constraints: {
    satisfied: number
    total: number
  }
  metrics: {
    expectedReturn: number
    risk: number
    sharpeRatio: number
    turnover: number
    concentration: number
  }
  executionTime: number
  iterations: number
}

export default function QuantumOptimization() {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationProblems, setOptimizationProblems] = useState<OptimizationProblem[]>([])
  const [solverPerformance, setSolverPerformance] = useState<SolverPerformance[]>([])
  const [quantumWalks, setQuantumWalks] = useState<QuantumStochasticWalk[]>([])
  const [optimizationResults, setOptimizationResults] = useState<OptimizationResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      // Simulate optimization problems
      const mockProblems: OptimizationProblem[] = [
        {
          id: 'prob-001',
          name: 'Portfolio Optimization QUBO',
          type: 'portfolio',
          formulation: 'QUBO',
          status: 'solved',
          objective: 0.085,
          constraints: 12,
          variables: 500,
          solveTime: 2.3,
          quality: 94.2,
          backend: 'quantum',
          lastRun: '2024-01-15T10:30:00Z'
        },
        {
          id: 'prob-002',
          name: 'Risk Parity Allocation',
          type: 'allocation',
          formulation: 'Ising',
          status: 'solving',
          objective: 0.067,
          constraints: 8,
          variables: 250,
          solveTime: 1.8,
          quality: 89.7,
          backend: 'digital_annealing',
          lastRun: '2024-01-15T10:25:00Z'
        },
        {
          id: 'prob-003',
          name: 'Execution Cost Minimization',
          type: 'execution',
          formulation: 'hybrid',
          status: 'pending',
          objective: 0.023,
          constraints: 15,
          variables: 1000,
          solveTime: 5.2,
          quality: 91.5,
          backend: 'hybrid',
          lastRun: '2024-01-15T10:20:00Z'
        },
        {
          id: 'prob-004',
          name: 'Factor Portfolio Construction',
          type: 'portfolio',
          formulation: 'QUBO',
          status: 'solved',
          objective: 0.092,
          constraints: 10,
          variables: 750,
          solveTime: 3.1,
          quality: 96.8,
          backend: 'quantum_inspired',
          lastRun: '2024-01-15T10:15:00Z'
        }
      ]

      // Simulate solver performance
      const mockSolverPerformance: SolverPerformance[] = [
        {
          name: 'IBM Quantum',
          type: 'quantum',
          avgSolveTime: 4.2,
          successRate: 87.3,
          solutionQuality: 92.1,
          costPerRun: 125.50,
          scalability: 65,
          status: 'active'
        },
        {
          name: 'D-Wave Digital Annealer',
          type: 'digital_annealing',
          avgSolveTime: 1.8,
          successRate: 94.7,
          solutionQuality: 89.5,
          costPerRun: 45.00,
          scalability: 85,
          status: 'active'
        },
        {
          name: 'Gurobi MILP',
          type: 'classical',
          avgSolveTime: 0.8,
          successRate: 99.2,
          solutionQuality: 95.3,
          costPerRun: 15.00,
          scalability: 70,
          status: 'active'
        },
        {
          name: 'Simulated Bifurcation',
          type: 'quantum_inspired',
          avgSolveTime: 2.1,
          successRate: 91.8,
          solutionQuality: 90.7,
          costPerRun: 25.00,
          scalability: 95,
          status: 'active'
        }
      ]

      // Simulate quantum stochastic walks
      const mockQuantumWalks: QuantumStochasticWalk[] = [
        {
          id: 'qsw-001',
          name: 'Correlation Graph Walk',
          graphType: 'correlation',
          nodes: 100,
          edges: 2450,
          walkType: 'continuous',
          stability: 0.87,
          turnover: 0.12,
          performance: {
            sharpe: 1.85,
            return: 0.142,
            volatility: 0.077,
            maxDrawdown: -0.089
          },
          comparison: {
            vsClassical: 0.023,
            vsEqualWeight: 0.067,
            vsMarketCap: 0.045
          }
        },
        {
          id: 'qsw-002',
          name: 'Sector-based Walk',
          graphType: 'sector',
          nodes: 50,
          edges: 875,
          walkType: 'discrete',
          stability: 0.92,
          turnover: 0.08,
          performance: {
            sharpe: 2.12,
            return: 0.168,
            volatility: 0.079,
            maxDrawdown: -0.076
          },
          comparison: {
            vsClassical: 0.034,
            vsEqualWeight: 0.089,
            vsMarketCap: 0.056
          }
        },
        {
          id: 'qsw-003',
          name: 'Factor Model Walk',
          graphType: 'factor',
          nodes: 25,
          edges: 300,
          walkType: 'continuous',
          stability: 0.89,
          turnover: 0.15,
          performance: {
            sharpe: 1.67,
            return: 0.125,
            volatility: 0.075,
            maxDrawdown: -0.098
          },
          comparison: {
            vsClassical: 0.018,
            vsEqualWeight: 0.051,
            vsMarketCap: 0.032
          }
        }
      ]

      // Simulate optimization results
      const mockResults: OptimizationResult[] = [
        {
          id: 'res-001',
          problemId: 'prob-001',
          solver: 'IBM Quantum',
          timestamp: '2024-01-15T10:30:00Z',
          solution: [0.15, 0.12, 0.08, 0.18, 0.22, 0.25, 0.0, 0.0, 0.0, 0.0],
          objectiveValue: 0.085,
          constraints: {
            satisfied: 12,
            total: 12
          },
          metrics: {
            expectedReturn: 0.142,
            risk: 0.077,
            sharpeRatio: 1.85,
            turnover: 0.12,
            concentration: 0.25
          },
          executionTime: 2.3,
          iterations: 150
        },
        {
          id: 'res-002',
          problemId: 'prob-002',
          solver: 'D-Wave Digital Annealer',
          timestamp: '2024-01-15T10:25:00Z',
          solution: [0.10, 0.15, 0.20, 0.18, 0.12, 0.08, 0.17, 0.0, 0.0, 0.0],
          objectiveValue: 0.067,
          constraints: {
            satisfied: 8,
            total: 8
          },
          metrics: {
            expectedReturn: 0.118,
            risk: 0.064,
            sharpeRatio: 1.84,
            turnover: 0.08,
            concentration: 0.20
          },
          executionTime: 1.8,
          iterations: 200
        }
      ]

      setOptimizationProblems(mockProblems)
      setSolverPerformance(mockSolverPerformance)
      setQuantumWalks(mockQuantumWalks)
      setOptimizationResults(mockResults)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'solved':
      case 'active':
        return 'text-green-500'
      case 'solving':
      case 'pending':
        return 'text-yellow-500'
      case 'failed':
      case 'maintenance':
      case 'deprecated':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'solved':
      case 'active':
        return <CheckCircle className="h-4 w-4" />
      case 'solving':
      case 'pending':
        return <AlertTriangle className="h-4 w-4" />
      case 'failed':
      case 'maintenance':
      case 'deprecated':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getBackendIcon = (backend: string) => {
    switch (backend) {
      case 'quantum':
        return <Hexagon className="h-4 w-4" />
      case 'digital_annealing':
        return <Cpu className="h-4 w-4" />
      case 'classical':
        return <BarChart3 className="h-4 w-4" />
      case 'hybrid':
        return <Layers className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const handleOptimize = () => {
    setIsOptimizing(true)
    setTimeout(() => {
      setIsOptimizing(false)
    }, 5000)
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
          <h2 className="text-3xl font-bold tracking-tight">Quantum-Inspired Optimization</h2>
          <p className="text-muted-foreground">
            QUBO/Ising formulations and quantum-classical hybrid solvers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOptimizing(!isOptimizing)}
            disabled={isOptimizing}
          >
            {isOptimizing ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Optimizing...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Optimization
              </>
            )}
          </Button>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="problems" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="problems">Optimization Problems</TabsTrigger>
          <TabsTrigger value="solvers">Solver Performance</TabsTrigger>
          <TabsTrigger value="quantum-walks">Quantum Walks</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="comparison">Benchmark</TabsTrigger>
        </TabsList>

        <TabsContent value="problems" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {optimizationProblems.map((problem) => (
              <Card 
                key={problem.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedProblem === problem.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedProblem(problem.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{problem.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className={getStatusColor(problem.status)}>
                        {getStatusIcon(problem.status)}
                      </div>
                      {getBackendIcon(problem.backend)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{problem.formulation}</Badge>
                    <span className="ml-2 text-xs">{problem.type}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Objective</span>
                      <div className="font-medium">{(problem.objective * 100).toFixed(2)}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Variables</span>
                      <div className="font-medium">{problem.variables}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Constraints</span>
                      <div className="font-medium">{problem.constraints}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Solve Time</span>
                      <div className="font-medium">{problem.solveTime}s</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Solution Quality</span>
                      <span className="font-medium">{problem.quality}%</span>
                    </div>
                    <Progress value={problem.quality} className="h-2" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last run: {new Date(problem.lastRun).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="solvers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {solverPerformance.map((solver) => (
              <Card key={solver.name}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{solver.name}</CardTitle>
                    <div className={getStatusColor(solver.status)}>
                      {getStatusIcon(solver.status)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="secondary">{solver.type}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Avg Solve Time</span>
                      <div className="font-medium">{solver.avgSolveTime}s</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Success Rate</span>
                      <div className="font-medium">{solver.successRate}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Solution Quality</span>
                      <div className="font-medium">{solver.solutionQuality}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost/Run</span>
                      <div className="font-medium">${solver.costPerRun}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Scalability</span>
                      <span className="font-medium">{solver.scalability}%</span>
                    </div>
                    <Progress value={solver.scalability} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quantum-walks" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quantumWalks.map((walk) => (
              <Card key={walk.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{walk.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline">{walk.graphType}</Badge>
                    <span className="ml-2 text-xs">{walk.walkType}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Nodes</span>
                      <div className="font-medium">{walk.nodes}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Edges</span>
                      <div className="font-medium">{walk.edges}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Stability</span>
                      <div className="font-medium">{(walk.stability * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Turnover</span>
                      <div className="font-medium">{(walk.turnover * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Performance</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Sharpe</span>
                        <div className="font-medium">{walk.performance.sharpe}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Return</span>
                        <div className="font-medium">{(walk.performance.return * 100).toFixed(1)}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Vol</span>
                        <div className="font-medium">{(walk.performance.volatility * 100).toFixed(1)}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Max DD</span>
                        <div className="font-medium">{(walk.performance.maxDrawdown * 100).toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="text-sm font-medium">vs Benchmarks</div>
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Classical</span>
                        <span className="text-green-500">+{(walk.comparison.vsClassical * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Equal Weight</span>
                        <span className="text-green-500">+{(walk.comparison.vsEqualWeight * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Market Cap</span>
                        <span className="text-green-500">+{(walk.comparison.vsMarketCap * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Optimization Results
              </CardTitle>
              <CardDescription>
                Detailed solution analysis and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {optimizationResults.map((result) => (
                    <div key={result.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{result.solver}</span>
                          <Badge variant="outline">{result.problemId}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(result.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Objective Value</span>
                          <div className="font-medium">{(result.objectiveValue * 100).toFixed(3)}%</div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Constraints</span>
                          <div className="font-medium">
                            {result.constraints.satisfied}/{result.constraints.total}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Execution Time</span>
                          <div className="font-medium">{result.executionTime}s</div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Iterations</span>
                          <div className="font-medium">{result.iterations}</div>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                        <div>
                          <span className="text-sm text-muted-foreground">Expected Return</span>
                          <div className="font-medium">{(result.metrics.expectedReturn * 100).toFixed(2)}%</div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Risk</span>
                          <div className="font-medium">{(result.metrics.risk * 100).toFixed(2)}%</div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
                          <div className="font-medium">{result.metrics.sharpeRatio.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Turnover</span>
                          <div className="font-medium">{(result.metrics.turnover * 100).toFixed(2)}%</div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Concentration</span>
                          <div className="font-medium">{(result.metrics.concentration * 100).toFixed(2)}%</div>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Solution Vector</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {result.solution.map((weight, index) => (
                            <Badge 
                              key={index} 
                              variant={weight > 0 ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {index}: {weight > 0 ? weight.toFixed(3) : '0.000'}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Solver Comparison Matrix</CardTitle>
                <CardDescription>
                  Performance comparison across different optimization backends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2 text-sm font-medium">
                    <div>Solver</div>
                    <div>Speed</div>
                    <div>Quality</div>
                    <div>Cost</div>
                  </div>
                  {solverPerformance.map((solver) => (
                    <div key={solver.name} className="grid grid-cols-4 gap-2 text-sm">
                      <div className="font-medium">{solver.name}</div>
                      <div>
                        <Progress value={(10 - solver.avgSolveTime) * 10} className="h-2" />
                      </div>
                      <div>
                        <Progress value={solver.solutionQuality} className="h-2" />
                      </div>
                      <div>
                        <Progress value={100 - (solver.costPerRun / 125.5) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Problem-Solver Mapping</CardTitle>
                <CardDescription>
                  Optimal solver selection for different problem types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Portfolio Optimization</span>
                    <Badge>Quantum</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Risk Parity</span>
                    <Badge variant="secondary">Digital Annealing</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Execution Optimization</span>
                    <Badge variant="outline">Hybrid</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Factor Models</span>
                    <Badge>Quantum-Inspired</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Large Scale</span>
                    <Badge variant="secondary">Classical</Badge>
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