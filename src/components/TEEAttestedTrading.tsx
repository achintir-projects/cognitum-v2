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
  Cpu,
  Lock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Hash,
  Eye,
  EyeOff,
  Download,
  RefreshCw,
  Fingerprint,
  Key,
  Server,
  Activity,
  Zap,
  Database,
  FileText,
  Certificate,
  Link2
} from 'lucide-react'

interface TEEEnclave {
  id: string
  name: string
  type: 'SGX' | 'SEV' | 'TDX'
  status: 'active' | 'attesting' | 'failed' | 'maintenance'
  mrenclave: string
  mrsigner: string
  quote: string
  lastAttested: string
  measurements: {
    hash: string
    algorithm: 'SHA256' | 'SHA384'
    verified: boolean
  }
  capabilities: string[]
}

interface AttestationReport {
  id: string
  enclaveId: string
  timestamp: string
  status: 'verified' | 'failed' | 'pending'
  quoteHash: string
  pcrValues: Record<string, string>
  measurements: {
    model: string
    data: string
    configuration: string
  }
  verificationDetails: {
    quoteValid: boolean
    signatureValid: boolean
    pcrValid: boolean
    timestampValid: boolean
  }
}

interface SealedData {
  id: string
  type: 'pnl' | 'positions' | 'strategy' | 'model'
  name: string
  sealedHash: string
  policyHash: string
  accessCount: number
  lastAccessed: string
  size: number
  encryptionAlgorithm: 'AES-GCM-256' | 'ChaCha20-Poly1305'
  integrity: 'verified' | 'corrupted' | 'pending'
}

interface RemoteAttestation {
  id: string
  sessionId: string
  timestamp: string
  status: 'initiated' | 'challenged' | 'verified' | 'failed'
  challengeHash: string
  responseHash: string
  nonce: string
  enclaveInfo: {
    id: string
    type: string
    securityVersion: number
  }
  modelHash: string
  dataHash: string
  verificationScore: number
}

export default function TEEAttestedTrading() {
  const [selectedEnclave, setSelectedEnclave] = useState<string | null>(null)
  const [isAttesting, setIsAttesting] = useState(false)
  const [enclaves, setEnclaves] = useState<TEEEnclave[]>([])
  const [attestationReports, setAttestationReports] = useState<AttestationReport[]>([])
  const [sealedData, setSealedData] = useState<SealedData[]>([])
  const [remoteAttestations, setRemoteAttestations] = useState<RemoteAttestation[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      // Simulate TEE enclaves
      const mockEnclaves: TEEEnclave[] = [
        {
          id: 'enclave-001',
          name: 'Allocator Engine SGX',
          type: 'SGX',
          status: 'active',
          mrenclave: 'a1b2c3d4e5f6789012345678901234567890abcd',
          mrsigner: 'fedcba0987654321fedcba0987654321fedcba09',
          quote: 'sgx_quote_v4_base64_encoded_string_here',
          lastAttested: '2025-10-03T10:30:00Z',
          measurements: {
            hash: 'sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
            algorithm: 'SHA256',
            verified: true
          },
          capabilities: ['allocation', 'risk_management', 'portfolio_optimization']
        },
        {
          id: 'enclave-002',
          name: 'OMS Core SEV',
          type: 'SEV',
          status: 'active',
          mrenclave: 'b2c3d4e5f6789012345678901234567890abcdef1',
          mrsigner: '0fedcba9876543210fedcba9876543210fedcba9',
          quote: 'sev_attestation_report_base64_encoded_here',
          lastAttested: '2025-10-03T10:25:00Z',
          measurements: {
            hash: 'sha384:38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b',
            algorithm: 'SHA384',
            verified: true
          },
          capabilities: ['order_management', 'execution', 'compliance']
        },
        {
          id: 'enclave-003',
          name: 'Model Inference TDX',
          type: 'TDX',
          status: 'attesting',
          mrenclave: 'c3d4e5f6789012345678901234567890abcdef12',
          mrsigner: '1dcba09876543210fedcba09876543210fedcba',
          quote: 'tdx_quote_base64_encoded_string_here',
          lastAttested: '2025-10-03T10:20:00Z',
          measurements: {
            hash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            algorithm: 'SHA256',
            verified: false
          },
          capabilities: ['model_inference', 'feature_computation', 'prediction']
        }
      ]

      // Simulate attestation reports
      const mockReports: AttestationReport[] = [
        {
          id: 'report-001',
          enclaveId: 'enclave-001',
          timestamp: '2025-10-03T10:30:00Z',
          status: 'verified',
          quoteHash: 'sha256:5d41402abc4b2a76b9719d911017c592',
          pcrValues: {
            'PCR0': '0000000000000000000000000000000000000000000000000000000000000000',
            'PCR1': '5d41402abc4b2a76b9719d911017c592',
            'PCR2': '098f6bcd4621d373cade4e832627b4f6',
            'PCR3': 'ad0234829205b9033196ba818f7a872b'
          },
          measurements: {
            model: 'sha256:a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
            data: 'sha256:7c222fb2927d828af22f592134e8932480637c0d494e6a9ca1e3d8a0b5c5d4a0',
            configuration: 'sha256:486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7'
          },
          verificationDetails: {
            quoteValid: true,
            signatureValid: true,
            pcrValid: true,
            timestampValid: true
          }
        },
        {
          id: 'report-002',
          enclaveId: 'enclave-002',
          timestamp: '2025-10-03T10:25:00Z',
          status: 'verified',
          quoteHash: 'sha256:098f6bcd4621d373cade4e832627b4f6',
          pcrValues: {
            'PCR0': '0000000000000000000000000000000000000000000000000000000000000000',
            'PCR1': '098f6bcd4621d373cade4e832627b4f6',
            'PCR2': '5d41402abc4b2a76b9719d911017c592',
            'PCR3': 'ad0234829205b9033196ba818f7a872b'
          },
          measurements: {
            model: 'sha256:b6d81b360a5672d80c27430f39153e2c4c3b6b5c5e5b5e5b5e5b5e5b5e5b5e5b',
            data: 'sha256:c4ca4238a0b923820dcc509a6f75849b',
            configuration: 'sha256:d85b1213473c2fd7c2045020a6b9c62b'
          },
          verificationDetails: {
            quoteValid: true,
            signatureValid: true,
            pcrValid: true,
            timestampValid: true
          }
        }
      ]

      // Simulate sealed data
      const mockSealedData: SealedData[] = [
        {
          id: 'sealed-001',
          type: 'pnl',
          name: 'Daily PnL Records',
          sealedHash: 'sha256:a54d88e06612d82112c20f29a86dc85477599c4f',
          policyHash: 'sha256:7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730',
          accessCount: 147,
          lastAccessed: '2025-10-03T10:15:00Z',
          size: 2048576,
          encryptionAlgorithm: 'AES-GCM-256',
          integrity: 'verified'
        },
        {
          id: 'sealed-002',
          type: 'positions',
          name: 'Current Portfolio Positions',
          sealedHash: 'sha256:6b51d431df5d7f141cbececcf79edf3dd861c3b4069f0b11661a3e36acb09ce6',
          policyHash: 'sha256:8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
          accessCount: 89,
          lastAccessed: '2025-10-03T10:20:00Z',
          size: 1048576,
          encryptionAlgorithm: 'ChaCha20-Poly1305',
          integrity: 'verified'
        },
        {
          id: 'sealed-003',
          type: 'strategy',
          name: 'Strategy Parameters',
          sealedHash: 'sha256:03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
          policyHash: 'sha256:e1d9c16aa7f9b1d5b5e5b5e5b5e5b5e5b5e5b5e5b5e5b5e5b5e5b5e5b5e5b5e',
          accessCount: 23,
          lastAccessed: '2025-10-03T09:45:00Z',
          size: 524288,
          encryptionAlgorithm: 'AES-GCM-256',
          integrity: 'verified'
        }
      ]

      // Simulate remote attestations
      const mockRemoteAttestations: RemoteAttestation[] = [
        {
          id: 'remote-001',
          sessionId: 'session-abc123',
          timestamp: '2025-10-03T10:30:00Z',
          status: 'verified',
          challengeHash: 'sha256:4a5d6b7c8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5',
          responseHash: 'sha256:5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
          nonce: 'random_nonce_123456789',
          enclaveInfo: {
            id: 'enclave-001',
            type: 'SGX',
            securityVersion: 2
          },
          modelHash: 'sha256:a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
          dataHash: 'sha256:7c222fb2927d828af22f592134e8932480637c0d494e6a9ca1e3d8a0b5c5d4a0',
          verificationScore: 98.7
        },
        {
          id: 'remote-002',
          sessionId: 'session-def456',
          timestamp: '2025-10-03T10:25:00Z',
          status: 'verified',
          challengeHash: 'sha256:6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7',
          responseHash: 'sha256:7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8',
          nonce: 'random_nonce_987654321',
          enclaveInfo: {
            id: 'enclave-002',
            type: 'SEV',
            securityVersion: 1
          },
          modelHash: 'sha256:b6d81b360a5672d80c27430f39153e2c4c3b6b5c5e5b5e5b5e5b5e5b5e5b5e5b',
          dataHash: 'sha256:c4ca4238a0b923820dcc509a6f75849b',
          verificationScore: 97.2
        }
      ]

      setEnclaves(mockEnclaves)
      setAttestationReports(mockReports)
      setSealedData(mockSealedData)
      setRemoteAttestations(mockRemoteAttestations)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'verified':
        return 'text-green-500'
      case 'attesting':
      case 'pending':
        return 'text-yellow-500'
      case 'failed':
        return 'text-red-500'
      case 'maintenance':
        return 'text-orange-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'verified':
        return <CheckCircle className="h-4 w-4" />
      case 'attesting':
      case 'pending':
        return <AlertTriangle className="h-4 w-4" />
      case 'failed':
        return <XCircle className="h-4 w-4" />
      case 'maintenance':
        return <Clock className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getEnclaveIcon = (type: string) => {
    switch (type) {
      case 'SGX':
        return <Cpu className="h-4 w-4" />
      case 'SEV':
        return <Server className="h-4 w-4" />
      case 'TDX':
        return <Zap className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const handleAttest = () => {
    setIsAttesting(true)
    setTimeout(() => {
      setIsAttesting(false)
    }, 3000)
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
          <h2 className="text-3xl font-bold tracking-tight">TEE-Attested Trading</h2>
          <p className="text-muted-foreground">
            Intel SGX/AMD SEV enclaves with remote attestation and sealed PnL
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAttest}
            disabled={isAttesting}
          >
            {isAttesting ? (
              <>
                <Fingerprint className="mr-2 h-4 w-4 animate-pulse" />
                Attesting...
              </>
            ) : (
              <>
                <Fingerprint className="mr-2 h-4 w-4" />
                Remote Attest
              </>
            )}
          </Button>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="enclaves" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="enclaves">TEE Enclaves</TabsTrigger>
          <TabsTrigger value="attestation">Attestation</TabsTrigger>
          <TabsTrigger value="sealed">Sealed Data</TabsTrigger>
          <TabsTrigger value="remote">Remote Sessions</TabsTrigger>
          <TabsTrigger value="evidence">Evidence Pack</TabsTrigger>
        </TabsList>

        <TabsContent value="enclaves" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {enclaves.map((enclave) => (
              <Card 
                key={enclave.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedEnclave === enclave.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedEnclave(enclave.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getEnclaveIcon(enclave.type)}
                      {enclave.name}
                    </CardTitle>
                    <div className={getStatusColor(enclave.status)}>
                      {getStatusIcon(enclave.status)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{enclave.type}</Badge>
                    <span className="ml-2 text-xs">Security v{enclave.type === 'SGX' ? '2' : '1'}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">MRENCLAVE</span>
                      <span className="font-mono text-xs">{enclave.mrenclave.slice(0, 12)}...</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">MRSIGNER</span>
                      <span className="font-mono text-xs">{enclave.mrsigner.slice(0, 12)}...</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Measurement</span>
                      <Badge variant={enclave.measurements.verified ? "default" : "destructive"}>
                        {enclave.measurements.verified ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {enclave.measurements.hash.slice(0, 20)}...
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Capabilities</div>
                    <div className="flex flex-wrap gap-1">
                      {enclave.capabilities.map((cap, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {cap}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last attested: {new Date(enclave.lastAttested).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="attestation" className="space-y-4">
          <div className="grid gap-4">
            {attestationReports.map((report) => (
              <Card key={report.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Certificate className="h-5 w-5" />
                      Attestation Report
                    </CardTitle>
                    <div className={getStatusColor(report.status)}>
                      {getStatusIcon(report.status)}
                    </div>
                  </div>
                  <CardDescription>
                    Enclave: {enclaves.find(e => e.id === report.enclaveId)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Verification Details</h4>
                      <div className="space-y-2">
                        {Object.entries(report.verificationDetails).map(([key, value]) => (
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
                    <div className="space-y-3">
                      <h4 className="font-semibold">Measurements</h4>
                      <div className="space-y-2">
                        {Object.entries(report.measurements).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground capitalize">{key}</span>
                              <Hash className="h-3 w-3" />
                            </div>
                            <div className="text-xs font-mono text-muted-foreground">
                              {value.slice(0, 16)}...
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Quote Hash</div>
                      <div className="text-xs font-mono">{report.quoteHash.slice(0, 24)}...</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">PCR Values</div>
                      <div className="text-xs font-mono">{Object.keys(report.pcrValues).length} registers</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Timestamp</div>
                      <div className="text-xs">{new Date(report.timestamp).toLocaleString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sealed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {sealedData.map((data) => (
              <Card key={data.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      {data.name}
                    </CardTitle>
                    <div className={getStatusColor(data.integrity)}>
                      {getStatusIcon(data.integrity)}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{data.type}</Badge>
                    <span className="ml-2 text-xs">{data.encryptionAlgorithm}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Size</span>
                      <div className="font-medium">{(data.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Access Count</span>
                      <div className="font-medium">{data.accessCount}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sealed Hash</span>
                      <Hash className="h-3 w-3" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {data.sealedHash.slice(0, 32)}...
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Policy Hash</span>
                      <Key className="h-3 w-3" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {data.policyHash.slice(0, 32)}...
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last accessed: {new Date(data.lastAccessed).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="remote" className="space-y-4">
          <div className="grid gap-4">
            {remoteAttestations.map((attestation) => (
              <Card key={attestation.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Link2 className="h-5 w-5" />
                      Remote Attestation Session
                    </CardTitle>
                    <div className={getStatusColor(attestation.status)}>
                      {getStatusIcon(attestation.status)}
                    </div>
                  </div>
                  <CardDescription>
                    Session ID: {attestation.sessionId}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Session Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Verification Score</span>
                          <Badge variant={attestation.verificationScore > 95 ? "default" : "secondary"}>
                            {attestation.verificationScore}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Nonce</span>
                          <span className="font-mono text-xs">{attestation.nonce.slice(0, 12)}...</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Timestamp</span>
                          <span className="text-xs">{new Date(attestation.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Hash Verification</h4>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Challenge</span>
                            <Hash className="h-3 w-3" />
                          </div>
                          <div className="text-xs font-mono text-muted-foreground">
                            {attestation.challengeHash.slice(0, 20)}...
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Response</span>
                            <Hash className="h-3 w-3" />
                          </div>
                          <div className="text-xs font-mono text-muted-foreground">
                            {attestation.responseHash.slice(0, 20)}...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Enclave</div>
                      <div className="text-xs font-mono">{attestation.enclaveInfo.type} v{attestation.enclaveInfo.securityVersion}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Model Hash</div>
                      <div className="text-xs font-mono">{attestation.modelHash.slice(0, 16)}...</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Data Hash</div>
                      <div className="text-xs font-mono">{attestation.dataHash.slice(0, 16)}...</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="evidence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Evidence Pack Generator
              </CardTitle>
              <CardDescription>
                Download comprehensive evidence package for allocator due diligence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold">Included Evidence</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>TEE Attestation Reports</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Hash Chain Lineage</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Model & Data Measurements</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Remote Attestation Sessions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Sealed Data Integrity Proofs</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>External Timestamping Service Logs</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Verification Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Overall Trust Score</span>
                      <Badge className="bg-green-500">98.7%</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Active Enclaves</span>
                      <span className="font-medium">{enclaves.filter(e => e.status === 'active').length}/{enclaves.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Verified Reports</span>
                      <span className="font-medium">{attestationReports.filter(r => r.status === 'verified').length}/{attestationReports.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sealed Data Items</span>
                      <span className="font-medium">{sealedData.filter(d => d.integrity === 'verified').length}/{sealedData.length}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Generated: {new Date().toLocaleString()} | Size: ~2.3 MB | Format: ZIP + JSON
                </div>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download Evidence Pack
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}