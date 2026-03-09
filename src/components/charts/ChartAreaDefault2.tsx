"use client"

import { TrendingUp } from "lucide-react"
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

export const description = "A simple area chart"

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
    label: "Aufrufe",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartAreaDefault2() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aufrufe</CardTitle>
        <CardDescription>
          So oft wurde dein Inhalt abgespielt oder angezeigt. Inhalte umfassen Videos, Beiträge, Stories und Werbeanzeigen.
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
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
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
              Januar – Juni 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}