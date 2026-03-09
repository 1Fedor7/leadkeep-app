"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
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

export const description = "A bar chart with a custom label"

const chartData = [
  { month: "Deutschland", desktop: 305, mobile: 200 },  
  { month: "USA", desktop: 186, mobile: 80 },
  { month: "Österreich", desktop: 237, mobile: 120 },
  { month: "Mauritius", desktop: 73, mobile: 190 },
  { month: "Niederlande", desktop: 209, mobile: 130 },
  { month: "Schweiz", desktop: 214, mobile: 140 },
  { month: "Australien", desktop: 214, mobile: 140 },
  { month: "Neuseeland", desktop: 214, mobile: 140 },
  { month: "Schweden", desktop: 214, mobile: 140 },
  { month: "Südafrika", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Besucher",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

export function ChartBarLabelCustom2() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top-Länder</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="desktop" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="desktop"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="desktop"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Steigt diesen Monat um 5,2 % <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Besucher insgesamt in den letzten 6 Monaten
        </div>
      </CardFooter>
    </Card>
  )
}