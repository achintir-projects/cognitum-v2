'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Brain, 
  Eye, 
  Compass, 
  Target, 
  Zap,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Play,
  Pause,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react'

interface OODAStage {
  id: string
  name: string
  description: string
  status: 'active' | 'completed' | 'pending' | 'error'
  progress: number
  metrics: {
    dataPoints: number
    processingTime: string
    confidence: number
  }
  icon: React.ReactNode
}

interface Decision {
  id: string
  timestamp: string
  stage: string
  action: string
  confidence: number
  outcome: 'success' | 'pending' | 'failure'
  details: string
  impact: 'high' | 'medium' | 'low'
}

export default function OODALoopSystem() {
  const [stages, setStages] = useState<OODAStage[]>([
    {
      id: 'observe',
      name: 'Observe',
      description: 'Collect data from multiple sources',
      status: 'active',
      progress: 85,
      metrics: {
        dataPoints: 1247,
        processingTime: '2.3s',
        confidence: 94
      },
      icon: <Eye className="h-5 w-5" />
    },
    {
      id: 'orient',
      name: 'Orient',
      description: 'Analyze and synthesize information',
      status: 'active',
      progress: 72,
      metrics: {
        dataPoints: 892,
        processingTime: '1.8s',
        confidence: 87
      },
      icon: <Compass className="h-5 w-5" />
    },
    {
      id: 'decide',
      name: 'Decide',
      description: 'Determine course of action',
      status: 'pending',
      progress: 45,
      metrics: {
        dataPoints: 324,
        processingTime: '0.9s',
        confidence: 76
      },
      icon: <Brain className="h-5 w-5" />
    },
    {
      id: 'act',
      name: 'Act',
      description: 'Execute decisions and monitor results',
      status: 'pending',
      progress: 23,
      metrics: {
        dataPoints: 156,
        processingTime: '0.4s',
        confidence: 82
      },
      icon: <Target className="h-5 w-5" />
    }
  ])

  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setStages(prev => prev.map(stage => ({
        ...stage,
        progress: Math.min(100, stage.progress + Math.random() * 5),
        metrics: {
          ...stage.metrics,
          dataPoints: stage.metrics.dataPoints + Math.floor(Math.random() * 10),
          confidence: Math.min(100, stage.metrics.confidence + (Math.random() - 0.5) * 2)
        }
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [isRunning])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'completed': return 'bg-blue-500'
      case 'pending': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">OODA Loop System</h2>
          <p className="text-muted-foreground">Real-time decision-making and analysis framework</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isRunning ? "default" : "outline"}
            size="sm"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isRunning ? 'Running' : 'Paused'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>OODA Loop Status</CardTitle>
          <CardDescription>Real-time status of each decision-making stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map((stage, index) => (
              <div key={stage.id} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(stage.status)}`} />
                    {stage.icon}
                    <span className="font-medium">{stage.name}</span>
                  </div>
                  {index < stages.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground absolute -right-3 top-2 hidden lg:block" />
                  )}
                </div>
                <div className="space-y-2">
                  <Progress value={stage.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">{stage.description}</div>
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    <div className="flex justify-between">
                      <span>Data Points:</span>
                      <span className="font-medium">{stage.metrics.dataPoints}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing:</span>
                      <span className="font-medium">{stage.metrics.processingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <span className="font-medium">{stage.metrics.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}