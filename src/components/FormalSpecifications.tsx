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
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Code,
  FileText,
  Play,
  RefreshCw,
  Settings,
  Zap,
  Database,
  GitBranch,
  Eye,
  EyeOff,
  Download,
  Upload,
  Terminal,
  Cpu,
  Lock,
  Key,
  Activity,
  TrendingUp,
  BarChart3,
  Target,
  AlertCircle,
  CheckSquare,
  Square
} from 'lucide-react'

interface FormalSpec {
  id: string
  name: string
  type: 'TLA+' | 'Ivy' | 'TLAPS' | 'Apalache'
  description: string
  status: 'verified' | 'failed' | 'checking' | 'draft'
  invariants: string[]
  properties: string[]
  lastChecked: string
  modelChecker: string
  statesExplored: number
  depth: number
  duration: number
  coverage: number
}

interface Invariant {
  id: string
  name: string
  description: string
  type: 'safety' | 'liveness' | 'fairness'
  spec: string
  status: 'proved' | 'violated' | 'checking' | 'pending'
  counterexample?: Counterexample
  proofMethod: 'model_checker' | 'theorem_prover' | 'manual'
  complexity: 'low' | 'medium' | 'high'
  lastVerified: string
}

interface Counterexample {
  id: string
  trace: string[]
  state: string
  step: number
  description: string
}

interface PropertyTest {
  id: string
  name: string
  description: string
  type: 'property_based' | 'model_based' | 'invariant'
  framework: 'QuickCheck' | 'Hypothesis' | 'TLC' | 'Apalache'
  status: 'passing' | 'failing' | 'running'
  testsRun: number
  passed: number
  failed: number
  coverage: number
  lastRun: string
  duration: number
}

interface ModelCheckResult {
  id: string
  specId: string
  timestamp: string
  status: 'success' | 'error' | 'timeout'
  checker: 'TLC' | 'Apalache' | 'Ivy'
  states: number
  distinctStates: number
  depth: number
  duration: number
  invariants: {
    checked: number
    passed: number
    violated: number
  }
  properties: {
    checked: number
    passed: number
    violated: number
  }
}

export default function FormalSpecifications() {
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [formalSpecs, setFormalSpecs] = useState<FormalSpec[]>([])
  const [invariants, setInvariants] = useState<Invariant[]>([])
  const [propertyTests, setPropertyTests] = useState<PropertyTest[]>([])
  const [modelCheckResults, setModelCheckResults] = useState<ModelCheckResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      // Simulate formal specifications
      const mockSpecs: FormalSpec[] = [
        {
          id: 'spec-001',
          name: 'OMS Safety Invariants',
          type: 'TLA+',
          description: 'Formal specification of Order Management System safety properties',
          status: 'verified',
          invariants: [
            'NoOversell',
            'PositionAccounting',
            'OrderUniqueness',
            'PriceCollarEnforcement',
            'IdempotentCancels'
          ],
          properties: [
            'TypeCorrectness',
            'StateConsistency',
            'DeadlockFreedom'
          ],
          lastChecked: '2025-10-03T10:30:00Z',
          modelChecker: 'TLC',
          statesExplored: 1048576,
          depth: 15,
          duration: 45,
          coverage: 98.7
        },
        {
          id: 'spec-002',
          name: 'EMS Execution Properties',
          type: 'Ivy',
          description: 'Execution Management System formal verification with Ivy',
          status: 'verified',
          invariants: [
            'NoOverExecution',
            'FillAccounting',
            'MarketDataIntegrity',
            'LatencyBounds',
            'VenueCompliance'
          ],
          properties: [
            'Fairness',
            'Progress',
            'Termination'
          ],
          lastChecked: '2025-10-03T10:25:00Z',
          modelChecker: 'Ivy',
          statesExplored: 524288,
          depth: 12,
          duration: 32,
          coverage: 96.4
        },
        {
          id: 'spec-003',
          name: 'Portfolio Risk Constraints',
          type: 'TLA+',
          description: 'Formal specification of portfolio risk management constraints',
          status: 'checking',
          invariants: [
            'LeverageLimits',
            'ConcentrationBounds',
            'VaRLimits',
            'LiquidityConstraints',
            'SectorExposure'
          ],
          properties: [
            'RiskBudgeting',
            'RebalancingCorrectness',
            'StressTestCoverage'
          ],
          lastChecked: '2025-10-03T10:20:00Z',
          modelChecker: 'Apalache',
          statesExplored: 2097152,
          depth: 20,
          duration: 120,
          coverage: 87.3
        }
      ]

      // Simulate invariants
      const mockInvariants: Invariant[] = [
        {
          id: 'inv-001',
          name: 'NoOversell',
          description: 'System cannot sell more shares than available in inventory',
          type: 'safety',
          spec: '∀ s ∈ Stocks : Sold(s) ≤ Available(s)',
          status: 'proved',
          proofMethod: 'model_checker',
          complexity: 'medium',
          lastVerified: '2025-10-03T10:30:00Z'
        },
        {
          id: 'inv-002',
          name: 'PositionAccounting',
          description: 'Position calculations are always accurate and consistent',
          type: 'safety',
          spec: '∀ p ∈ Positions : NetPosition(p) = Long(p) - Short(p)',
          status: 'proved',
          proofMethod: 'theorem_prover',
          complexity: 'low',
          lastVerified: '2025-10-03T10:30:00Z'
        },
        {
          id: 'inv-003',
          name: 'OrderUniqueness',
          description: 'No duplicate orders with same ID can exist',
          type: 'safety',
          spec: '∀ o1, o2 ∈ Orders : o1.id = o2.id ⇒ o1 = o2',
          status: 'proved',
          proofMethod: 'model_checker',
          complexity: 'low',
          lastVerified: '2025-10-03T10:30:00Z'
        },
        {
          id: 'inv-004',
          name: 'PriceCollarEnforcement',
          description: 'All orders respect price collar limits',
          type: 'safety',
          spec: '∀ o ∈ Orders : CollarLow ≤ o.price ≤ CollarHigh',
          status: 'violated',
          proofMethod: 'model_checker',
          complexity: 'medium',
          lastVerified: '2025-10-03T10:25:00Z',
          counterexample: {
            id: 'ce-001',
            trace: ['Init', 'SubmitOrder', 'MarketPriceUpdate', 'ExecuteOrder'],
            state: 'Order.price = 150.00, CollarHigh = 145.00',
            step: 3,
            description: 'Market price update allowed order execution above collar'
          }
        },
        {
          id: 'inv-005',
          name: 'IdempotentCancels',
          description: 'Multiple cancel requests for same order have same effect',
          type: 'safety',
          spec: '∀ o ∈ Orders : Cancel(Cancel(o)) = Cancel(o)',
          status: 'proved',
          proofMethod: 'theorem_prover',
          complexity: 'high',
          lastVerified: '2025-10-03T10:30:00Z'
        },
        {
          id: 'inv-006',
          name: 'DeadlockFreedom',
          description: 'System never reaches a deadlock state',
          type: 'liveness',
          spec: '∀ s ∈ States : ∃ action ∈ Actions : Enabled(action, s)',
          status: 'checking',
          proofMethod: 'model_checker',
          complexity: 'high',
          lastVerified: '2025-10-03T10:20:00Z'
        }
      ]

      // Simulate property tests
      const mockPropertyTests: PropertyTest[] = [
        {
          id: 'test-001',
          name: 'LeverageConstraints',
          description: 'Property-based test for portfolio leverage limits',
          type: 'property_based',
          framework: 'QuickCheck',
          status: 'passing',
          testsRun: 10000,
          passed: 10000,
          failed: 0,
          coverage: 95.2,
          lastRun: '2025-10-03T10:30:00Z',
          duration: 12
        },
        {
          id: 'test-002',
          name: 'TurnoverBounds',
          description: 'Model-based test for turnover rate constraints',
          type: 'model_based',
          framework: 'TLC',
          status: 'passing',
          testsRun: 5000,
          passed: 5000,
          failed: 0,
          coverage: 89.7,
          lastRun: '2025-10-03T10:25:00Z',
          duration: 8
        },
        {
          id: 'test-003',
          name: 'BorrowFeeApplication',
          description: 'Property test for correct borrow fee calculations',
          type: 'property_based',
          framework: 'Hypothesis',
          status: 'failing',
          testsRun: 7500,
          passed: 7498,
          failed: 2,
          coverage: 87.3,
          lastRun: '2025-10-03T10:20:00Z',
          duration: 15
        }
      ]

      // Simulate model check results
      const mockModelCheckResults: ModelCheckResult[] = [
        {
          id: 'result-001',
          specId: 'spec-001',
          timestamp: '2025-10-03T10:30:00Z',
          status: 'success',
          checker: 'TLC',
          states: 1048576,
          distinctStates: 524288,
          depth: 15,
          duration: 45,
          invariants: {
            checked: 5,
            passed: 4,
            violated: 1
          },
          properties: {
            checked: 3,
            passed: 3,
            violated: 0
          }
        },
        {
          id: 'result-002',
          specId: 'spec-002',
          timestamp: '2025-10-03T10:25:00Z',
          status: 'success',
          checker: 'Ivy',
          states: 524288,
          distinctStates: 262144,
          depth: 12,
          duration: 32,
          invariants: {
            checked: 5,
            passed: 5,
            violated: 0
          },
          properties: {
            checked: 3,
            passed: 3,
            violated: 0
          }
        },
        {
          id: 'result-003',
          specId: 'spec-003',
          timestamp: '2025-10-03T10:20:00Z',
          status: 'error',
          checker: 'Apalache',
          states: 2097152,
          distinctStates: 1048576,
          depth: 20,
          duration: 120,
          invariants: {
            checked: 5,
            passed: 3,
            violated: 2
          },
          properties: {
            checked: 3,
            passed: 2,
            violated: 1
          }
        }
      ]

      setFormalSpecs(mockSpecs)
      setInvariants(mockInvariants)
      setPropertyTests(mockPropertyTests)
      setModelCheckResults(mockModelCheckResults)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'proved':
      case 'passing':
      case 'success':
        return 'text-green-500'
      case 'failed':
      case 'violated':
      case 'failing':
      case 'error':
        return 'text-red-500'
      case 'checking':
      case 'running':
        return 'text-yellow-500'
      case 'draft':
      case 'pending':
        return 'text-gray-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
      case 'proved':
      case 'passing':
      case 'success':
        return <CheckCircle className="h-4 w-4" />
      case 'failed':
      case 'violated':
      case 'failing':
      case 'error':
        return <XCircle className="h-4 w-4" />
      case 'checking':
      case 'running':
        return <AlertTriangle className="h-4 w-4" />
      case 'draft':
      case 'pending':
        return <Clock className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getSpecIcon = (type: string) => {
    switch (type) {
      case 'TLA+':
        return <Code className="h-4 w-4" />
      case 'Ivy':
        return <Terminal className="h-4 w-4" />
      case 'TLAPS':
        return <FileText className="h-4 w-4" />
      case 'Apalache':
        return <Cpu className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low':
        return 'text-green-500'
      case 'medium':
        return 'text-yellow-500'
      case 'high':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const handleModelCheck = () => {
    setIsChecking(true)
    setTimeout(() => {
      setIsChecking(false)
    }, 8000)
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
          <h2 className="text-3xl font-bold tracking-tight">Formal Specifications</h2>
          <p className="text-muted-foreground">
            TLA+/Ivy specs for OMS/EMS invariants with automated verification
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleModelCheck}
            disabled={isChecking}
          >
            {isChecking ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-pulse" />
                Model Checking...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Run Model Check
              </>
            )}
          </Button>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="specifications" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="invariants">Invariants</TabsTrigger>
          <TabsTrigger value="tests">Property Tests</TabsTrigger>
          <TabsTrigger value="results">Model Check Results</TabsTrigger>
          <TabsTrigger value="ci">CI Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="specifications" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {formalSpecs.map((spec) => (
              <Card 
                key={spec.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedSpec === spec.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedSpec(spec.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getSpecIcon(spec.type)}
                      {spec.name}
                    </CardTitle>
                    <div className={getStatusColor(spec.status)}>
                      {getStatusIcon(spec.status)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{spec.type}</Badge>
                    <span className="ml-2 text-xs">{spec.modelChecker}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {spec.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">States Explored</span>
                      <div className="font-medium">{spec.statesExplored.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Depth</span>
                      <div className="font-medium">{spec.depth}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration</span>
                      <div className="font-medium">{spec.duration}s</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Coverage</span>
                      <div className="font-medium">{spec.coverage}%</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Coverage</span>
                      <span className="font-medium">{spec.coverage}%</span>
                    </div>
                    <Progress value={spec.coverage} className="h-2" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last checked: {new Date(spec.lastChecked).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invariants" className="space-y-4">
          <div className="grid gap-4">
            {invariants.map((invariant) => (
              <Card key={invariant.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      {invariant.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={invariant.type === 'safety' ? 'default' : 
                                     invariant.type === 'liveness' ? 'secondary' : 'outline'}>
                        {invariant.type}
                      </Badge>
                      <div className={getStatusColor(invariant.status)}>
                        {getStatusIcon(invariant.status)}
                      </div>
                    </div>
                  </div>
                  <CardDescription>{invariant.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Formal Specification</span>
                      <Code className="h-3 w-3" />
                    </div>
                    <div className="p-3 bg-muted rounded-md font-mono text-sm">
                      {invariant.spec}
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Proof Method</span>
                        <span className="font-medium capitalize">{invariant.proofMethod.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Complexity</span>
                        <span className={`font-medium ${getComplexityColor(invariant.complexity)}`}>
                          {invariant.complexity}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <div className={getStatusColor(invariant.status)}>
                          {getStatusIcon(invariant.status)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last Verified</span>
                        <span className="text-xs">{new Date(invariant.lastVerified).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {invariant.counterexample && (
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-red-600">Counterexample</div>
                          <div className="p-2 bg-red-50 border border-red-200 rounded-md text-xs">
                            <div className="font-medium">{invariant.counterexample.description}</div>
                            <div className="mt-1 font-mono">{invariant.counterexample.state}</div>
                            <div className="mt-1">Step: {invariant.counterexample.step}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {propertyTests.map((test) => (
              <Card key={test.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      {test.name}
                    </CardTitle>
                    <div className={getStatusColor(test.status)}>
                      {getStatusIcon(test.status)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{test.framework}</Badge>
                    <span className="ml-2 text-xs capitalize">{test.type.replace('_', ' ')}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {test.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Tests Run</span>
                      <div className="font-medium">{test.testsRun.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration</span>
                      <div className="font-medium">{test.duration}s</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Passed</span>
                      <div className="font-medium text-green-600">{test.passed.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Failed</span>
                      <div className="font-medium text-red-600">{test.failed.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Coverage</span>
                      <span className="font-medium">{test.coverage}%</span>
                    </div>
                    <Progress value={test.coverage} className="h-2" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last run: {new Date(test.lastRun).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <div className="grid gap-4">
            {modelCheckResults.map((result) => (
              <Card key={result.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Model Check Result
                    </CardTitle>
                    <div className={getStatusColor(result.status)}>
                      {getStatusIcon(result.status)}
                    </div>
                  </div>
                  <CardDescription>
                    Spec: {formalSpecs.find(s => s.id === result.specId)?.name} | 
                    Checker: {result.checker}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">States</div>
                      <div className="font-medium">{result.states.toLocaleString()}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Distinct States</div>
                      <div className="font-medium">{result.distinctStates.toLocaleString()}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Depth</div>
                      <div className="font-medium">{result.depth}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-medium">{result.duration}s</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Invariants</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Checked</span>
                          <span className="font-medium">{result.invariants.checked}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Passed</span>
                          <span className="font-medium text-green-600">{result.invariants.passed}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Violated</span>
                          <span className="font-medium text-red-600">{result.invariants.violated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Properties</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Checked</span>
                          <span className="font-medium">{result.properties.checked}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Passed</span>
                          <span className="font-medium text-green-600">{result.properties.passed}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Violated</span>
                          <span className="font-medium text-red-600">{result.properties.violated}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Executed: {new Date(result.timestamp).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ci" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                CI/CD Integration
              </CardTitle>
              <CardDescription>
                Automated formal verification in continuous integration pipeline
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold">CI Pipeline Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Model Check Stage</span>
                      <Badge className="bg-green-500">Passing</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Property Tests</span>
                      <Badge className="bg-green-500">Passing</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Coverage Check</span>
                      <Badge className="bg-yellow-500">Warning</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Deployment Gate</span>
                      <Badge className="bg-green-500">Passed</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Configuration</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Fail on Violation</span>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Timeout</span>
                      <span className="font-medium">10 minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Max Depth</span>
                      <span className="font-medium">20</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Parallel Workers</span>
                      <span className="font-medium">4</span>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-semibold">Recent CI Runs</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm p-2 border rounded">
                    <span>PR #234 - Feature/leverage-limits</span>
                    <Badge className="bg-green-500">Passed</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm p-2 border rounded">
                    <span>PR #233 - Fix/price-collar-violation</span>
                    <Badge className="bg-green-500">Passed</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm p-2 border rounded">
                    <span>PR #232 - Enh/risk-modeling</span>
                    <Badge className="bg-red-500">Failed</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Formal verification blocks deployments on invariant failures
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure CI
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}