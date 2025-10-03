'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Newspaper,
  Twitter,
  Satellite,
  Globe,
  Activity,
  TrendingUp,
  Eye,
  EyeOff,
  RefreshCw,
  Settings
} from 'lucide-react'

export default function AlternativeDataIntegration() {
  const [isRealTime, setIsRealTime] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Alternative Data Integration</h2>
          <p className="text-muted-foreground">Real-time integration of non-traditional data sources</p>
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
          <CardTitle>Data Sources Overview</CardTitle>
          <CardDescription>Status of all integrated data sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Newspaper className="h-5 w-5" />
                <span className="font-medium">Financial News</span>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="text-sm text-muted-foreground">156 signals</div>
              <Progress value={87} className="mt-2" />
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Twitter className="h-5 w-5" />
                <span className="font-medium">Social Sentiment</span>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="text-sm text-muted-foreground">342 signals</div>
              <Progress value={76} className="mt-2" />
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Satellite className="h-5 w-5" />
                <span className="font-medium">Satellite Data</span>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="text-sm text-muted-foreground">23 signals</div>
              <Progress value={91} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}