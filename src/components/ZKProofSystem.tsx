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
  Eye,
  EyeOff,
  Hash,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Download,
  RefreshCw,
  Calculator,
  TrendingUp,
  BarChart3,
  FileText,
  Zap,
  Lock,
  Key,
  Database,
  Activity,
  Cpu,
  Link2,
  Certificate,
  Fingerprint
} from 'lucide-react'

interface ZKProof {
  id: string
  type: 'pnl' | 'backtest' | 'risk' | 'execution'
  name: string
  status: 'generating' | 'verified' | 'failed' | 'pending'
  circuitHash: string
  proofHash: string
  publicInputs: string[]
  verificationKey: string
  prover: 'groth16' | 'plonk' | 'marlin' | 'halo2'
  timestamp: string
  gasUsed?: number
  verificationTime: number
  confidence: number
}

interface ZKBacktest {
  id: string
  strategyName: string
  startDate: string
  endDate: string
  totalReturn: number
  sharpeRatio: number
  maxDrawdown: number
  winRate: number
  proofId: string
  dataHash: string
  modelHash: string
  fillHash: string
  marketDataHash: string
  verificationStatus: 'verified' | 'failed' | 'pending'
  proofSize: number
  constraints: number
  witnesses: number
}

interface ZKPnL {
  id: string
  date: string
  grossPnL: number
  netPnL: number
  commissions: number
  slippage: number
  tradingVolume: number
  positions: number
  proofId: string
  fillsHash: string
  marketDataHash: string
  portfolioHash: string
  verificationStatus: 'verified' | 'failed' | 'pending'
  proofComplexity: 'low' | 'medium' | 'high'
  generationTime: number
}

interface ZKCircuit {
  id: string
  name: string
  description: string
  type: 'pnl_calculation' | 'backtest_validation' | 'risk_metrics' | 'execution_proof'
  constraints: number
  variables: number
  witnesses: number
  provingTime: number
  verificationTime: number
  proofSize: number
  securityLevel: 128 | 192 | 256
  arithmetization: 'R1CS' | 'PLONKish' | 'AIR'
  status: 'active' | 'development' | 'deprecated'
}

interface ZKVerificationSession {
  id: string
  proofId: string
  timestamp: string
  status: 'initiated' | 'verifying' | 'verified' | 'failed'
  verifierAddress: string
  publicInputsHash: string
  verificationResult: {
    valid: boolean
    errorMessage?: string
    gasUsed: number
    blockNumber?: number
  }
  batchVerification?: boolean
  batchSize?: number
}

export default function ZKProofSystem() {
  const [selectedProof, setSelectedProof] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [zkProofs, setZkProofs] = useState<ZKProof[]>([])
  const [zkBacktests, setZkBacktests] = useState<ZKBacktest[]>([])
  const [zkPnLs, setZkPnLs] = useState<ZKPnL[]>([])
  const [zkCircuits, setZkCircuits] = useState<ZKCircuit[]>([])
  const [verificationSessions, setVerificationSessions] = useState<ZKVerificationSession[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      // Simulate ZK proofs
      const mockProofs: ZKProof[] = [
        {
          id: 'proof-001',
          type: 'pnl',
          name: 'Daily PnL Proof - Oct 3, 2025',
          status: 'verified',
          circuitHash: 'sha256:8f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',
          proofHash: 'sha256:9g5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5',
          publicInputs: [
            '0x1a2b3c4d5e6f7890abcdef1234567890',
            '0x2b3c4d5e6f7890abcdef12345678901a',
            '0x3c4d5e6f7890abcdef12345678901a2b'
          ],
          verificationKey: '0x4d5e6f7890abcdef12345678901a2b3c',
          prover: 'groth16',
          timestamp: '2025-10-03T10:30:00Z',
          gasUsed: 245000,
          verificationTime: 12,
          confidence: 99.8
        },
        {
          id: 'proof-002',
          type: 'backtest',
          name: 'Momentum Strategy Backtest Proof',
          status: 'verified',
          circuitHash: 'sha256:a1b2c3d4e5f6789012345678901234567890abcdef',
          proofHash: 'sha256:b2c3d4e5f6789012345678901234567890abcdef1',
          publicInputs: [
            '0x5e6f7890abcdef12345678901a2b3c4d',
            '0x6f7890abcdef12345678901a2b3c4d5e',
            '0x7890abcdef12345678901a2b3c4d5e6f'
          ],
          verificationKey: '0x890abcdef12345678901a2b3c4d5e6f7',
          prover: 'plonk',
          timestamp: '2025-10-03T10:25:00Z',
          gasUsed: 389000,
          verificationTime: 18,
          confidence: 99.5
        },
        {
          id: 'proof-003',
          type: 'risk',
          name: 'VaR Calculation Proof',
          status: 'generating',
          circuitHash: 'sha256:c3d4e5f6789012345678901234567890abcdef12',
          proofHash: '',
          publicInputs: [],
          verificationKey: '0x90abcdef12345678901a2b3c4d5e6f78',
          prover: 'halo2',
          timestamp: '2025-10-03T10:20:00Z',
          verificationTime: 0,
          confidence: 0
        }
      ]

      // Simulate ZK backtests
      const mockBacktests: ZKBacktest[] = [
        {
          id: 'backtest-001',
          strategyName: 'Mean Reversion Alpha',
          startDate: '2024-01-01',
          endDate: '2025-10-01',
          totalReturn: 0.187,
          sharpeRatio: 1.42,
          maxDrawdown: -0.089,
          winRate: 0.67,
          proofId: 'proof-002',
          dataHash: 'sha256:d4e5f6789012345678901234567890abcdef123',
          modelHash: 'sha256:e5f6789012345678901234567890abcdef1234',
          fillHash: 'sha256:f6789012345678901234567890abcdef12345',
          marketDataHash: 'sha256:7890abcdef1234567890abcdef1234567890ab',
          verificationStatus: 'verified',
          proofSize: 2048,
          constraints: 1048576,
          witnesses: 524288
        },
        {
          id: 'backtest-002',
          strategyName: 'Momentum Factor',
          startDate: '2024-01-01',
          endDate: '2025-10-01',
          totalReturn: 0.234,
          sharpeRatio: 1.68,
          maxDrawdown: -0.112,
          winRate: 0.72,
          proofId: 'proof-004',
          dataHash: 'sha256:890abcdef1234567890abcdef1234567890abcd',
          modelHash: 'sha256:90abcdef1234567890abcdef1234567890abcde',
          fillHash: 'sha256:0abcdef1234567890abcdef1234567890abcdef',
          marketDataHash: 'sha256:abcdef1234567890abcdef1234567890abcdef1',
          verificationStatus: 'verified',
          proofSize: 3072,
          constraints: 2097152,
          witnesses: 1048576
        }
      ]

      // Simulate ZK PnL records
      const mockPnLs: ZKPnL[] = [
        {
          id: 'pnl-001',
          date: '2025-10-03',
          grossPnL: 125430.50,
          netPnL: 118920.75,
          commissions: 4520.25,
          slippage: 1989.50,
          tradingVolume: 8750000,
          positions: 42,
          proofId: 'proof-001',
          fillsHash: 'sha256:bcdef1234567890abcdef1234567890abcdef12',
          marketDataHash: 'sha256:cdef1234567890abcdef1234567890abcdef123',
          portfolioHash: 'sha256:def1234567890abcdef1234567890abcdef1234',
          verificationStatus: 'verified',
          proofComplexity: 'medium',
          generationTime: 8.5
        },
        {
          id: 'pnl-002',
          date: '2025-10-02',
          grossPnL: 87230.80,
          netPnL: 82150.40,
          commissions: 3120.60,
          slippage: 1959.80,
          tradingVolume: 6200000,
          positions: 38,
          proofId: 'proof-005',
          fillsHash: 'sha256:ef1234567890abcdef1234567890abcdef12345',
          marketDataHash: 'sha256:f1234567890abcdef1234567890abcdef123456',
          portfolioHash: 'sha256:1234567890abcdef1234567890abcdef1234567',
          verificationStatus: 'verified',
          proofComplexity: 'low',
          generationTime: 5.2
        }
      ]

      // Simulate ZK circuits
      const mockCircuits: ZKCircuit[] = [
        {
          id: 'circuit-001',
          name: 'PnL Calculation Circuit',
          description: 'Verifies daily PnL from fills and market data without revealing individual trades',
          type: 'pnl_calculation',
          constraints: 524288,
          variables: 262144,
          witnesses: 131072,
          provingTime: 8.5,
          verificationTime: 12,
          proofSize: 2048,
          securityLevel: 128,
          arithmetization: 'R1CS',
          status: 'active'
        },
        {
          id: 'circuit-002',
          name: 'Backtest Validation Circuit',
          description: 'Proves backtest results were computed correctly from historical data',
          type: 'backtest_validation',
          constraints: 2097152,
          variables: 1048576,
          witnesses: 524288,
          provingTime: 15.2,
          verificationTime: 18,
          proofSize: 3072,
          securityLevel: 128,
          arithmetization: 'PLONKish',
          status: 'active'
        },
        {
          id: 'circuit-003',
          name: 'VaR Risk Metrics Circuit',
          description: 'Zero-knowledge proof of Value-at-Risk calculations',
          type: 'risk_metrics',
          constraints: 1048576,
          variables: 524288,
          witnesses: 262144,
          provingTime: 12.8,
          verificationTime: 15,
          proofSize: 2560,
          securityLevel: 192,
          arithmetization: 'AIR',
          status: 'active'
        }
      ]

      // Simulate verification sessions
      const mockSessions: ZKVerificationSession[] = [
        {
          id: 'session-001',
          proofId: 'proof-001',
          timestamp: '2025-10-03T10:30:00Z',
          status: 'verified',
          verifierAddress: '0x1234567890abcdef1234567890abcdef12345678',
          publicInputsHash: 'sha256:234567890abcdef1234567890abcdef1234567890',
          verificationResult: {
            valid: true,
            gasUsed: 245000,
            blockNumber: 18923456
          },
          batchVerification: false
        },
        {
          id: 'session-002',
          proofId: 'proof-002',
          timestamp: '2025-10-03T10:25:00Z',
          status: 'verified',
          verifierAddress: '0x234567890abcdef1234567890abcdef1234567890',
          publicInputsHash: 'sha256:34567890abcdef1234567890abcdef12345678901',
          verificationResult: {
            valid: true,
            gasUsed: 389000,
            blockNumber: 18923455
          },
          batchVerification: true,
          batchSize: 5
        }
      ]

      setZkProofs(mockProofs)
      setZkBacktests(mockBacktests)
      setZkPnLs(mockPnLs)
      setZkCircuits(mockCircuits)
      setVerificationSessions(mockSessions)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'active':
        return 'text-green-500'
      case 'generating':
      case 'verifying':
      case 'pending':
        return 'text-yellow-500'
      case 'failed':
        return 'text-red-500'
      case 'development':
        return 'text-orange-500'
      case 'deprecated':
        return 'text-gray-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
      case 'active':
        return <CheckCircle className="h-4 w-4" />
      case 'generating':
      case 'verifying':
      case 'pending':
        return <AlertTriangle className="h-4 w-4" />
      case 'failed':
        return <XCircle className="h-4 w-4" />
      case 'development':
        return <Clock className="h-4 w-4" />
      case 'deprecated':
        return <EyeOff className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getProverIcon = (prover: string) => {
    switch (prover) {
      case 'groth16':
        return <Zap className="h-4 w-4" />
      case 'plonk':
        return <Cpu className="h-4 w-4" />
      case 'marlin':
        return <Calculator className="h-4 w-4" />
      case 'halo2':
        return <Activity className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const handleGenerateProof = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
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
          <h2 className="text-3xl font-bold tracking-tight">Zero-Knowledge Proof System</h2>
          <p className="text-muted-foreground">
            zk-PnL & zk-Backtest: verifiable returns without trade revelation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateProof}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Fingerprint className="mr-2 h-4 w-4 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <Fingerprint className="mr-2 h-4 w-4" />
                Generate Proof
              </>
            )}
          </Button>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="proofs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="proofs">ZK Proofs</TabsTrigger>
          <TabsTrigger value="backtests">zk-Backtests</TabsTrigger>
          <TabsTrigger value="pnl">zk-PnL</TabsTrigger>
          <TabsTrigger value="circuits">Circuits</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="proofs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {zkProofs.map((proof) => (
              <Card 
                key={proof.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedProof === proof.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedProof(proof.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getProverIcon(proof.prover)}
                      {proof.name}
                    </CardTitle>
                    <div className={getStatusColor(proof.status)}>
                      {getStatusIcon(proof.status)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{proof.type}</Badge>
                    <span className="ml-2 text-xs">{proof.prover.toUpperCase()}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Verification Time</span>
                      <div className="font-medium">{proof.verificationTime}ms</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Confidence</span>
                      <div className="font-medium">{proof.confidence}%</div>
                    </div>
                  </div>
                  {proof.gasUsed && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Gas Used</span>
                      <span className="font-medium">{proof.gasUsed.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Circuit Hash</span>
                      <Hash className="h-3 w-3" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {proof.circuitHash.slice(0, 32)}...
                    </div>
                  </div>
                  {proof.proofHash && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Proof Hash</span>
                        <Shield className="h-3 w-3" />
                      </div>
                      <div className="text-xs font-mono text-muted-foreground">
                        {proof.proofHash.slice(0, 32)}...
                      </div>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Generated: {new Date(proof.timestamp).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="backtests" className="space-y-4">
          <div className="grid gap-4">
            {zkBacktests.map((backtest) => (
              <Card key={backtest.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      {backtest.strategyName}
                    </CardTitle>
                    <div className={getStatusColor(backtest.verificationStatus)}>
                      {getStatusIcon(backtest.verificationStatus)}
                    </div>
                  </div>
                  <CardDescription>
                    {backtest.startDate} to {backtest.endDate}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Total Return</div>
                      <div className="font-medium text-green-600">
                        {(backtest.totalReturn * 100).toFixed(2)}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                      <div className="font-medium">{backtest.sharpeRatio.toFixed(2)}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Max Drawdown</div>
                      <div className="font-medium text-red-600">
                        {(backtest.maxDrawdown * 100).toFixed(2)}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Win Rate</div>
                      <div className="font-medium">{(backtest.winRate * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Proof Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Proof Size</span>
                          <span className="font-medium">{backtest.proofSize} bytes</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Constraints</span>
                          <span className="font-medium">{backtest.constraints.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Witnesses</span>
                          <span className="font-medium">{backtest.witnesses.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Hash Verification</h4>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Data Hash</span>
                            <Database className="h-3 w-3" />
                          </div>
                          <div className="text-xs font-mono text-muted-foreground">
                            {backtest.dataHash.slice(0, 20)}...
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Model Hash</span>
                            <Cpu className="h-3 w-3" />
                          </div>
                          <div className="text-xs font-mono text-muted-foreground">
                            {backtest.modelHash.slice(0, 20)}...
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Fills Hash</span>
                            <FileText className="h-3 w-3" />
                          </div>
                          <div className="text-xs font-mono text-muted-foreground">
                            {backtest.fillHash.slice(0, 20)}...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pnl" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {zkPnLs.map((pnl) => (
              <Card key={pnl.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      PnL Proof - {pnl.date}
                    </CardTitle>
                    <div className={getStatusColor(pnl.verificationStatus)}>
                      {getStatusIcon(pnl.verificationStatus)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant={pnl.proofComplexity === 'high' ? 'destructive' : 
                                   pnl.proofComplexity === 'medium' ? 'default' : 'secondary'}>
                      {pnl.proofComplexity} complexity
                    </Badge>
                    <span className="ml-2 text-xs">{pnl.generationTime}s generation</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Gross PnL</span>
                      <div className="font-medium text-green-600">
                        ${pnl.grossPnL.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Net PnL</span>
                      <div className="font-medium text-green-600">
                        ${pnl.netPnL.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Commissions</span>
                      <div className="font-medium">${pnl.commissions.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Slippage</span>
                      <div className="font-medium">${pnl.slippage.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Trading Volume</span>
                      <div className="font-medium">${(pnl.tradingVolume / 1000000).toFixed(1)}M</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Positions</span>
                      <div className="font-medium">{pnl.positions}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Fills Hash</span>
                      <Hash className="h-3 w-3" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {pnl.fillsHash.slice(0, 32)}...
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Market Data Hash</span>
                      <div className="font-mono">{pnl.marketDataHash.slice(0, 16)}...</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Portfolio Hash</span>
                      <div className="font-mono">{pnl.portfolioHash.slice(0, 16)}...</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="circuits" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {zkCircuits.map((circuit) => (
              <Card key={circuit.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{circuit.name}</CardTitle>
                    <div className={getStatusColor(circuit.status)}>
                      {getStatusIcon(circuit.status)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{circuit.type.replace(/_/g, ' ')}</Badge>
                    <span className="ml-2 text-xs">{circuit.arithmetization}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {circuit.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Constraints</span>
                      <div className="font-medium">{circuit.constraints.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Variables</span>
                      <div className="font-medium">{circuit.variables.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Witnesses</span>
                      <div className="font-medium">{circuit.witnesses.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Proof Size</span>
                      <div className="font-medium">{circuit.proofSize} bytes</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Proving Time</span>
                      <div className="font-medium">{circuit.provingTime}s</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Verification</span>
                      <div className="font-medium">{circuit.verificationTime}ms</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Security Level</span>
                    <Badge variant="secondary">{circuit.securityLevel}-bit</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <div className="grid gap-4">
            {verificationSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Fingerprint className="h-5 w-5" />
                      Verification Session
                    </CardTitle>
                    <div className={getStatusColor(session.status)}>
                      {getStatusIcon(session.status)}
                    </div>
                  </div>
                  <CardDescription>
                    Proof ID: {session.proofId}
                    {session.batchVerification && (
                      <Badge variant="secondary" className="ml-2">
                        Batch ({session.batchSize} proofs)
                      </Badge>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Session Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Verifier Address</span>
                          <span className="font-mono text-xs">{session.verifierAddress.slice(0, 10)}...</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Timestamp</span>
                          <span className="text-xs">{new Date(session.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Public Inputs Hash</span>
                          <Hash className="h-3 w-3" />
                        </div>
                        <div className="text-xs font-mono text-muted-foreground">
                          {session.publicInputsHash.slice(0, 24)}...
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Verification Result</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Valid</span>
                          <Badge variant={session.verificationResult.valid ? "default" : "destructive"}>
                            {session.verificationResult.valid ? "Valid" : "Invalid"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Gas Used</span>
                          <span className="font-medium">{session.verificationResult.gasUsed.toLocaleString()}</span>
                        </div>
                        {session.verificationResult.blockNumber && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Block Number</span>
                            <span className="font-medium">{session.verificationResult.blockNumber.toLocaleString()}</span>
                          </div>
                        )}
                        {session.verificationResult.errorMessage && (
                          <div className="text-sm text-red-600">
                            Error: {session.verificationResult.errorMessage}
                          </div>
                        )}
                      </div>
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