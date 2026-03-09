"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A stacked bar chart with a legend"

const chartData = [
  { month: "18-24", desktop: 186, mobile: 80 },
  { month: "25-34", desktop: 305, mobile: 200 },
  { month: "35-44", desktop: 237, mobile: 120 },
  { month: "45-54", desktop: 73, mobile: 190 },
  { month: "55-64", desktop: 209, mobile: 130 },
  { month: "65+", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Männer",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Frauen",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartBarStacked() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alter und Geschlecht</CardTitle>
        <CardDescription>Aggregierte demografische Daten basieren auf einer Reihe von Faktoren wie beispielsweise Angaben zu Alter und Geschlecht, die Nutzer in ihren Facebook- und Instagram-Profilen machen. Diese Zahl ist ein Schätzwert.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--color-mobile)"
              radius={[4, 4, 0, 0]}
            />
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