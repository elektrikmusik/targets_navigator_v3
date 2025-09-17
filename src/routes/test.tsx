import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Github,
  Mail,
  Plus,
  Minus,
  MoreHorizontal,
  Users,
  CreditCard,
  Activity,
  DollarSign,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar } from '@/components/ui/calendar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function TestPage() {
  const [goalValue, setGoalValue] = useState(350)
  const [sliderValue, setSliderValue] = useState([300])
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              shadcn/ui Component Test
            </h1>
            <p className="text-muted-foreground">
              Testing your shadcn/ui configuration with various components
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,231.89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+20.1%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+180.1%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+19%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+201</span> since last hour
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Forms Section */}
            <Card>
              <CardHeader>
                <CardTitle>Form Components</CardTitle>
                <CardDescription>
                  Testing various form inputs and controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    <TabsTrigger value="auth">Auth</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Enter your message" />
                    </div>

                    <div className="space-y-2">
                      <Label>Plan Selection</Label>
                      <RadioGroup defaultValue="starter">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="starter" id="starter" />
                          <Label htmlFor="starter">Starter Plan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pro" id="pro" />
                          <Label htmlFor="pro">Pro Plan</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Budget Range: ${sliderValue[0]}</Label>
                      <Slider
                        value={sliderValue}
                        onValueChange={setSliderValue}
                        max={1000}
                        step={10}
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="notifications" />
                      <Label htmlFor="notifications">
                        Enable notifications
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms">
                        I agree to the terms and conditions
                      </Label>
                    </div>
                  </TabsContent>

                  <TabsContent value="auth" className="space-y-4">
                    <div className="space-y-4">
                      <Button
                        className="w-full bg-transparent"
                        variant="outline"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Continue with GitHub
                      </Button>
                      <Button
                        className="w-full bg-transparent"
                        variant="outline"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Continue with Google
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Input placeholder="Email" type="email" />
                        <Input placeholder="Password" type="password" />
                        <Button className="w-full">Create account</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Data Table */}
            <Card>
              <CardHeader>
                <CardTitle>Payments</CardTitle>
                <CardDescription>
                  Manage your payments and transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Badge variant="default">Success</Badge>
                      </TableCell>
                      <TableCell>ken99@example.com</TableCell>
                      <TableCell>$316.00</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Refund</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Badge variant="secondary">Processing</Badge>
                      </TableCell>
                      <TableCell>abe45@example.com</TableCell>
                      <TableCell>$242.00</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Badge variant="destructive">Failed</Badge>
                      </TableCell>
                      <TableCell>carmella@example.com</TableCell>
                      <TableCell>$837.00</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Retry</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Goal Tracker */}
            <Card>
              <CardHeader>
                <CardTitle>Move Goal</CardTitle>
                <CardDescription>Set your daily activity goal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGoalValue(Math.max(0, goalValue - 50))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{goalValue}</div>
                    <div className="text-sm text-muted-foreground">
                      CALORIES/DAY
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGoalValue(goalValue + 50)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Progress value={75} className="w-full" />
                <Button className="w-full">Set Goal</Button>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Invite your team members to collaborate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Sofia Davis</p>
                    <p className="text-sm text-muted-foreground">
                      m@example.com
                    </p>
                  </div>
                  <Badge>Owner</Badge>
                </div>

                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Jackson Lee</p>
                    <p className="text-sm text-muted-foreground">
                      p@example.com
                    </p>
                  </div>
                  <Badge variant="secondary">Developer</Badge>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/test')({
  component: TestPage,
})
