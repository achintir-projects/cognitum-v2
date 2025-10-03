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
  Hash,
  Link2,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Download,
  RefreshCw,
  Shield,
  Database,
  GitBranch,
  Eye,
  EyeOff,
  FileText,
  Certificate,
  Activity,
  Zap,
  Key,
  Lock,
  Upload,
  ExternalLink,
  Fingerprint,
  Calendar,
  TrendingUp,
  TreePine
} from 'lucide-react'

interface HashChain {
  id: string
  name: string
  type: 'data' | 'features' | 'model' | 'orders' | 'execution'
  currentHash: string
  previousHash: string
  blockHeight: number
  timestamp: string
  merkleRoot: string
  dataIntegrity: 'verified' | 'corrupted' | 'pending'
  externalTimestamps: ExternalTimestamp[]
  chainLength: number
  lastVerified: string
}

interface ExternalTimestamp {
  id: string
  provider: 'bitcoin' | 'ethereum' | 'opentimestamps' | 'factom'
  transactionHash: string
  blockNumber: number
  timestamp: string
  confirmations: number
  status: 'confirmed' | 'pending' | 'failed'
  proof: string
}

interface LineageNode {
  id: string
  name: string
  type: 'datasource' | 'feature' | 'model' | 'strategy' | 'execution'
  hash: string
  parentHashes: string[]
  childHashes: string[]
  metadata: {
    version: string
    author: string
    timestamp: string
    size: number
    checksum: string
  }
  verification: {
    hashValid: boolean
    signatureValid: boolean
    timestampValid: boolean
    integrityValid: boolean
  }
  externalProofs: ExternalTimestamp[]
}

interface EvidencePack {
  id: string
  name: string
  description: string
  created: string
  size: number
  status: 'generating' | 'ready' | 'downloaded'
  includes: string[]
  hashChainProofs: string[]
  externalTimestamps: number
  verificationScore: number
  downloadUrl?: string
}

interface ComplianceReport {
  id: string
  type: 'audit' | 'regulatory' | 'internal'
  period: string
  status: 'completed' | 'in_progress' | 'failed'
  findings: {
    critical: number
    high: number
    medium: number
    low: number
  }
  coverage: {
    totalNodes: number
    verifiedNodes: number
    timestampedNodes: number
    integrityScore: number
  }
  evidencePackId: string
  generatedAt: string
}

export default function TamperProofLineage() {
  const [selectedChain, setSelectedChain] = useState<string | null>(null)
  const [isTimestamping, setIsTimestamping] = useState(false)
  const [hashChains, setHashChains] = useState<HashChain[]>([])
  const [lineageNodes, setLineageNodes] = useState<LineageNode[]>([])
  const [evidencePacks, setEvidencePacks] = useState<EvidencePack[]>([])
  const [complianceReports, setComplianceReports] = useState<ComplianceReport[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      // Simulate hash chains
      const mockHashChains: HashChain[] = [
        {
          id: 'chain-001',
          name: 'Market Data Lineage',
          type: 'data',
          currentHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
          previousHash: '0x098f6bcd4621d373cade4e832627b4f6',
          blockHeight: 89234,
          timestamp: '2025-10-03T10:30:00Z',
          merkleRoot: '0x5d41402abc4b2a76b9719d911017c592',
          dataIntegrity: 'verified',
          externalTimestamps: [
            {
              id: 'ts-001',
              provider: 'bitcoin',
              transactionHash: 'tx_1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
              blockNumber: 823456,
              timestamp: '2025-10-03T10:31:00Z',
              confirmations: 12,
              status: 'confirmed',
              proof: 'bitcoin_op_return_proof_base64'
            },
            {
              id: 'ts-002',
              provider: 'ethereum',
              transactionHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef12345678901',
              blockNumber: 19234567,
              timestamp: '2025-10-03T10:32:00Z',
              confirmations: 8,
              status: 'confirmed',
              proof: 'ethereum_transaction_receipt_base64'
            }
          ],
          chainLength: 1247,
          lastVerified: '2025-10-03T10:30:00Z'
        },
        {
          id: 'chain-002',
          name: 'Feature Engineering Pipeline',
          type: 'features',
          currentHash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef12345678901a2b',
          previousHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
          blockHeight: 89235,
          timestamp: '2025-10-03T10:25:00Z',
          merkleRoot: '0x098f6bcd4621d373cade4e832627b4f6',
          dataIntegrity: 'verified',
          externalTimestamps: [
            {
              id: 'ts-003',
              provider: 'opentimestamps',
              transactionHash: 'ots_3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef12345678901a2b',
              blockNumber: 0,
              timestamp: '2025-10-03T10:26:00Z',
              confirmations: 1,
              status: 'confirmed',
              proof: 'opentimestamps_stamp_base64'
            }
          ],
          chainLength: 856,
          lastVerified: '2025-10-03T10:25:00Z'
        },
        {
          id: 'chain-003',
          name: 'Model Training & Deployment',
          type: 'model',
          currentHash: '0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef12345678901a2b3c',
          previousHash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef12345678901a2b',
          blockHeight: 89236,
          timestamp: '2025-10-03T10:20:00Z',
          merkleRoot: '0x5d41402abc4b2a76b9719d911017c592',
          dataIntegrity: 'verified',
          externalTimestamps: [
            {
              id: 'ts-004',
              provider: 'factom',
              transactionHash: 'factom_4d5e6f7890abcdef1234567890abcdef1234567890abcdef12345678901a2b3c',
              blockNumber: 234567,
              timestamp: '2025-10-03T10:21:00Z',
              confirmations: 15,
              status: 'confirmed',
              proof: 'factom_entry_receipt_base64'
            }
          ],
          chainLength: 423,
          lastVerified: '2025-10-03T10:20:00Z'
        }
      ]

      // Simulate lineage nodes
      const mockLineageNodes: LineageNode[] = [
        {
          id: 'node-001',
          name: 'OHLC Market Data',
          type: 'datasource',
          hash: '0x5e6f7890abcdef1234567890abcdef1234567890abcdef12345678901a2b3c4d',
          parentHashes: [],
          childHashes: ['0x6f7890abcdef1234567890abcdef1234567890abcdef12345678901a2b3c4d5e'],
          metadata: {
            version: 'v2.1.0',
            author: 'data-engineering',
            timestamp: '2025-10-03T09:00:00Z',
            size: 2048576000,
            checksum: 'sha256:7c222fb2927d828af22f592134e8932480637c0d494e6a9ca1e3d8a0b5c5d4a0'
          },
          verification: {
            hashValid: true,
            signatureValid: true,
            timestampValid: true,
            integrityValid: true
          },
          externalProofs: [
            {
              id: 'ts-001',
              provider: 'bitcoin',
              transactionHash: 'tx_1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
              blockNumber: 823456,
              timestamp: '2025-10-03T10:31:00Z',
              confirmations: 12,
              status: 'confirmed',
              proof: 'bitcoin_op_return_proof_base64'
            }
          ]
        },
        {
          id: 'node-002',
          name: 'Technical Indicators',
          type: 'feature',
          hash: '0x6f7890abcdef1234567890abcdef1234567890abcdef12345678901a2b3c4d5e',
          parentHashes: ['0x5e6f7890abcdef1234567890abcdef1234567890abcdef12345678901a2b3c4d'],
          childHashes: ['0x7890abcdef1234567890abcdef1234567890abcdef12345678901a2b3c4d5e6f'],
          metadata: {
            version: 'v3.4.1',
            author: 'ml-team',
            timestamp: '2025-10-03T09:15:00Z',
            size: 1048576000,
            checksum: 'sha256:486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7'
          },
          verification: {
            hashValid: true,
            signatureValid: true,
            timestampValid: true,
            integrityValid: true
          },
          externalProofs: []
        },
        {
          id: 'node-003',
          name: 'Neural Network Model',
          type: 'model',
          hash: '0x7890abcdef1234567890abcdef1234567890abcdef12345678901a2b3c4d5e6f',
          parentHashes: ['0x6f7890abcdef1234567890abcdef1234567890abcdef12345678901a2b3c4d5e'],
          childHashes: ['0x890abcdef1234567890abcdef1234567890abcdef12345678901a2b3c4d5e6f7'],
          metadata: {
            version: 'v4.2.0',
            author: 'ml-team',
            timestamp: '2025-10-03T09:30:00Z',
            size: 524288000,
            checksum: 'sha256:d85b1213473c2fd7c2045020a6b9c62b'
          },
          verification: {
            hashValid: true,
            signatureValid: true,
            timestampValid: true,
            integrityValid: true
          },
          externalProofs: [
            {
              id: 'ts-004',
              provider: 'factom',
              transactionHash: 'factom_4d5e6f7890abcdef1234567890abcdef1234567890abcdef12345678901a2b3c',
              blockNumber: 234567,
              timestamp: '2025-10-03T10:21:00Z',
              confirmations: 15,
              status: 'confirmed',
              proof: 'factom_entry_receipt_base64'
            }
          ]
        }
      ]

      // Simulate evidence packs
      const mockEvidencePacks: EvidencePack[] = [
        {
          id: 'pack-001',
          name: 'Q3 2025 Compliance Evidence',
          description: 'Complete evidence package for Q3 2025 regulatory compliance',
          created: '2025-10-03T10:00:00Z',
          size: 15728640,
          status: 'ready',
          includes: [
            'Hash chain proofs',
            'External timestamps',
            'Lineage metadata',
            'Verification reports',
            'Compliance certificates'
          ],
          hashChainProofs: 1247,
          externalTimestamps: 48,
          verificationScore: 99.2,
          downloadUrl: 'https://secure-storage.cognitum.com/evidence/pack-001.zip'
        },
        {
          id: 'pack-002',
          name: 'Model Deployment Evidence',
          description: 'Evidence pack for recent model deployment and validation',
          created: '2025-10-03T09:45:00Z',
          size: 8388608,
          status: 'ready',
          includes: [
            'Model lineage',
            'Training data hashes',
            'Validation results',
            'Performance metrics'
          ],
          hashChainProofs: 423,
          externalTimestamps: 12,
          verificationScore: 98.7,
          downloadUrl: 'https://secure-storage.cognitum.com/evidence/pack-002.zip'
        }
      ]

      // Simulate compliance reports
      const mockComplianceReports: ComplianceReport[] = [
        {
          id: 'report-001',
          type: 'audit',
          period: 'Q3 2025',
          status: 'completed',
          findings: {
            critical: 0,
            high: 1,
            medium: 3,
            low: 7
          },
          coverage: {
            totalNodes: 2526,
            verifiedNodes: 2524,
            timestampedNodes: 2489,
            integrityScore: 99.4
          },
          evidencePackId: 'pack-001',
          generatedAt: '2025-10-03T10:00:00Z'
        },
        {
          id: 'report-002',
          type: 'regulatory',
          period: 'October 2025',
          status: 'in_progress',
          findings: {
            critical: 0,
            high: 0,
            medium: 1,
            low: 2
          },
          coverage: {
            totalNodes: 2526,
            verifiedNodes: 2526,
            timestampedNodes: 2526,
            integrityScore: 100.0
          },
          evidencePackId: 'pack-002',
          generatedAt: '2025-10-03T09:45:00Z'
        }
      ]

      setHashChains(mockHashChains)
      setLineageNodes(mockLineageNodes)
      setEvidencePacks(mockEvidencePacks)
      setComplianceReports(mockComplianceReports)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'confirmed':
      case 'completed':
      case 'ready':
        return 'text-green-500'
      case 'corrupted':
      case 'failed':
        return 'text-red-500'
      case 'pending':
      case 'in_progress':
      case 'generating':
        return 'text-yellow-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
      case 'confirmed':
      case 'completed':
      case 'ready':
        return <CheckCircle className="h-4 w-4" />
      case 'corrupted':
      case 'failed':
        return <XCircle className="h-4 w-4" />
      case 'pending':
      case 'in_progress':
      case 'generating':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'bitcoin':
        return <Hash className="h-4 w-4 text-orange-500" />
      case 'ethereum':
        return <Database className="h-4 w-4 text-blue-500" />
      case 'opentimestamps':
        return <Clock className="h-4 w-4 text-green-500" />
      case 'factom':
        return <Shield className="h-4 w-4 text-purple-500" />
      default:
        return <Link2 className="h-4 w-4" />
    }
  }

  const getNodeTypeIcon = (type: string) => {
    switch (type) {
      case 'datasource':
        return <Database className="h-4 w-4" />
      case 'feature':
        return <TrendingUp className="h-4 w-4" />
      case 'model':
        return <Zap className="h-4 w-4" />
      case 'strategy':
        return <Activity className="h-4 w-4" />
      case 'execution':
        return <ExternalLink className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleTimestamp = () => {
    setIsTimestamping(true)
    setTimeout(() => {
      setIsTimestamping(false)
    }, 4000)
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
          <h2 className="text-3xl font-bold tracking-tight">Tamper-Proof Lineage</h2>
          <p className="text-muted-foreground">
            Hash-chain every run with external timestamping service
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleTimestamp}
            disabled={isTimestamping}
          >
            {isTimestamping ? (
              <>
                <Fingerprint className="mr-2 h-4 w-4 animate-pulse" />
                Timestamping...
              </>
            ) : (
              <>
                <Fingerprint className="mr-2 h-4 w-4" />
                External Timestamp
              </>
            )}
          </Button>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="chains" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="chains">Hash Chains</TabsTrigger>
          <TabsTrigger value="lineage">Lineage Graph</TabsTrigger>
          <TabsTrigger value="timestamps">External Timestamps</TabsTrigger>
          <TabsTrigger value="evidence">Evidence Packs</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="chains" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hashChains.map((chain) => (
              <Card 
                key={chain.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedChain === chain.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedChain(chain.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GitBranch className="h-5 w-5" />
                      {chain.name}
                    </CardTitle>
                    <div className={getStatusColor(chain.dataIntegrity)}>
                      {getStatusIcon(chain.dataIntegrity)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{chain.type}</Badge>
                    <span className="ml-2 text-xs">Block #{chain.blockHeight}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Current Hash</span>
                      <Hash className="h-3 w-3" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {chain.currentHash.slice(0, 20)}...
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Previous Hash</span>
                      <Link2 className="h-3 w-3" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {chain.previousHash.slice(0, 20)}...
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Chain Length</span>
                      <div className="font-medium">{chain.chainLength.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Timestamps</span>
                      <div className="font-medium">{chain.externalTimestamps.length}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Merkle Root</span>
                      <TreePine className="h-3 w-3" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {chain.merkleRoot.slice(0, 20)}...
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last verified: {new Date(chain.lastVerified).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lineage" className="space-y-4">
          <div className="grid gap-4">
            {lineageNodes.map((node) => (
              <Card key={node.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getNodeTypeIcon(node.type)}
                      {node.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{node.type}</Badge>
                      <div className={getStatusColor(node.verification.integrityValid ? 'verified' : 'corrupted')}>
                        {getStatusIcon(node.verification.integrityValid ? 'verified' : 'corrupted')}
                      </div>
                    </div>
                  </div>
                  <CardDescription>
                    Version {node.metadata.version} by {node.metadata.author}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Node Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Size</span>
                          <span className="font-medium">{(node.metadata.size / 1024 / 1024).toFixed(1)} MB</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Created</span>
                          <span className="text-xs">{new Date(node.metadata.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Parents</span>
                          <span className="font-medium">{node.parentHashes.length}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Children</span>
                          <span className="font-medium">{node.childHashes.length}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Verification Status</h4>
                      <div className="space-y-2">
                        {Object.entries(node.verification).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <Badge variant={value ? "default" : "destructive"}>
                              {value ? "Valid" : "Invalid"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Node Hash</span>
                      <Hash className="h-3 w-3" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {node.hash.slice(0, 32)}...
                    </div>
                  </div>
                  {node.externalProofs.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-semibold">External Proofs</div>
                      <div className="flex flex-wrap gap-2">
                        {node.externalProofs.map((proof) => (
                          <Badge key={proof.id} variant="secondary" className="flex items-center gap-1">
                            {getProviderIcon(proof.provider)}
                            {proof.provider}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timestamps" className="space-y-4">
          <div className="grid gap-4">
            {hashChains.map((chain) => (
              <Card key={chain.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {chain.name} - External Timestamps
                  </CardTitle>
                  <CardDescription>
                    Blockchain-anchored timestamps for immutable proof
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {chain.externalTimestamps.map((timestamp) => (
                      <div key={timestamp.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getProviderIcon(timestamp.provider)}
                            <span className="font-medium capitalize">{timestamp.provider}</span>
                          </div>
                          <div className={getStatusColor(timestamp.status)}>
                            {getStatusIcon(timestamp.status)}
                          </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Transaction Hash</span>
                              <Hash className="h-3 w-3" />
                            </div>
                            <div className="text-xs font-mono text-muted-foreground">
                              {timestamp.transactionHash.slice(0, 32)}...
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Block Number</span>
                              <span className="font-medium">{timestamp.blockNumber.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Confirmations</span>
                              <span className="font-medium">{timestamp.confirmations}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Timestamp</span>
                          <span className="text-xs">{new Date(timestamp.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            Proof available: {timestamp.proof.slice(0, 20)}...
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-3 w-3" />
                            Download Proof
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="evidence" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {evidencePacks.map((pack) => (
              <Card key={pack.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {pack.name}
                    </CardTitle>
                    <div className={getStatusColor(pack.status)}>
                      {getStatusIcon(pack.status)}
                    </div>
                  </div>
                  <CardDescription>{pack.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Size</span>
                      <div className="font-medium">{(pack.size / 1024 / 1024).toFixed(1)} MB</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Verification Score</span>
                      <div className="font-medium">{pack.verificationScore}%</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Hash Chain Proofs</span>
                      <div className="font-medium">{pack.hashChainProofs.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">External Timestamps</span>
                      <div className="font-medium">{pack.externalTimestamps}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Includes:</div>
                    <div className="flex flex-wrap gap-1">
                      {pack.includes.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created: {new Date(pack.created).toLocaleString()}
                  </div>
                  <Button className="w-full" disabled={pack.status !== 'ready'}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Evidence Pack
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-4">
            {complianceReports.map((report) => (
              <Card key={report.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Certificate className="h-5 w-5" />
                      {report.type.charAt(0).toUpperCase() + report.type.slice(1)} Report
                    </CardTitle>
                    <div className={getStatusColor(report.status)}>
                      {getStatusIcon(report.status)}
                    </div>
                  </div>
                  <CardDescription>
                    Period: {report.period} | Generated: {new Date(report.generatedAt).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Findings Summary</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Critical</span>
                          <Badge variant="destructive">{report.findings.critical}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">High</span>
                          <Badge variant="destructive">{report.findings.high}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Medium</span>
                          <Badge variant="default">{report.findings.medium}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Low</span>
                          <Badge variant="secondary">{report.findings.low}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Coverage Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Total Nodes</span>
                          <span className="font-medium">{report.coverage.totalNodes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Verified Nodes</span>
                          <span className="font-medium">{report.coverage.verifiedNodes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Timestamped Nodes</span>
                          <span className="font-medium">{report.coverage.timestampedNodes.toLocaleString()}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Integrity Score</span>
                            <span className="font-medium">{report.coverage.integrityScore}%</span>
                          </div>
                          <Progress value={report.coverage.integrityScore} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Evidence Pack: {report.evidencePackId}
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Full Report
                    </Button>
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