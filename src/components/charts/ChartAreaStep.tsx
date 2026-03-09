"use client"

import { Activity, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A step area chart"

const chartData = [
  { month: "Januar", desktop: 186 },
  { month: "Februar", desktop: 305 },
  { month: "März", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "Mai", desktop: 209 },
  { month: "Juni", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Aufrufe auf Facebook",
    color: "var(--chart-1)",
    icon: Activity,
  },
} satisfies ChartConfig

export function ChartAreaStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aufrufe auf Facebook</CardTitle>
        <CardDescription>
          So oft wurde deine Facebook-Seite bzw. dein Facebook-Profil aufgerufen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="desktop"
              type="step"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Steigt diesen Monat um 5,2 % <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Januar - Juni 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}