'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Link,
  Link2,
  Link2Off,
  Shield,
  DollarSign,
  TrendingUp,
  Activity,
  CheckCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Settings,
  Wallet
} from 'lucide-react'

export default function BrokerageConnectivity() {
  const [isRealTime, setIsRealTime] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Brokerage Connectivity</h2>
          <p className="text-muted-foreground">Connect and manage multiple brokerage accounts</p>
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
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>Status of connected brokerage accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="font-medium">Interactive Brokers</span>
                </div>
                <Badge variant="outline">Demo</Badge>
              </div>
              <div className="text-sm text-muted-foreground">Balance: $125,000</div>
              <div className="text-sm text-green-600">P&L: +$8,750</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="font-medium">Alpaca</span>
                </div>
                <Badge variant="outline">Paper</Badge>
              </div>
              <div className="text-sm text-muted-foreground">Balance: $50,000</div>
              <div className="text-sm text-green-600">P&L: +$3,200</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}