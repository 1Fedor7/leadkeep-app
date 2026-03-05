"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import * as htmlToImage from "html-to-image"
import jsPDF from "jspdf"

export const description = "An interactive pie chart"

// ----- DATA -----
const desktopData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
]

const chartConfig = {
  visitors: { label: "Visitors" },
  desktop: { label: "Desktop" },
  mobile: { label: "Mobile" },

  january: { label: "January", color: "var(--chart-1)" },
  february: { label: "February", color: "var(--chart-2)" },
  march: { label: "March", color: "var(--chart-3)" },
  april: { label: "April", color: "var(--chart-4)" },
  may: { label: "May", color: "var(--chart-5)" },
} satisfies ChartConfig

// ----- EXPORT HELPERS -----
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function downloadText(content: string, filename: string, mimeType: string) {
  downloadBlob(new Blob([content], { type: mimeType }), filename)
}

function toCSV(rows: Array<Record<string, unknown>>) {
  if (!rows.length) return ""
  const headers = Object.keys(rows[0])

  const escape = (value: unknown) => {
    const s = String(value ?? "").replaceAll('"', '""')
    return `"${s}"`
  }

  return [
    headers.join(","),
    ...rows.map((row) => headers.map((h) => escape(row[h])).join(",")),
  ].join("\n")
}

async function exportElementAsPNG(el: HTMLElement, filename: string) {
  const dataUrl = await htmlToImage.toPng(el, {
    pixelRatio: 2,
    backgroundColor: "#ffffff", // чтобы фон был белым
  })

  const a = document.createElement("a")
  a.href = dataUrl
  a.download = filename
  a.click()
}

async function exportElementAsPDF(el: HTMLElement, filename: string) {
  // Сначала получаем картинку
  const dataUrl = await htmlToImage.toPng(el, {
    pixelRatio: 2,
    backgroundColor: "#ffffff",
  })

  // Загружаем картинку, чтобы узнать размеры
  const img = new Image()
  img.src = dataUrl
  await new Promise((res) => (img.onload = () => res(true)))

  // PDF в px — удобно подгонять
  const pdf = new jsPDF({ orientation: "landscape", unit: "px" })
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()

  const ratio = Math.min(pageW / img.width, pageH / img.height)
  const w = img.width * ratio
  const h = img.height * ratio
  const x = (pageW - w) / 2
  const y = (pageH - h) / 2

  pdf.addImage(dataUrl, "PNG", x, y, w, h)
  pdf.save(filename)
}

export function ChartPieInteractive() {
  const id = "pie-interactive"
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month)

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  )

  const months = React.useMemo(() => desktopData.map((item) => item.month), [])

  // 👉 Этот ref мы экспортируем в PNG/PDF (карточка целиком)
  const exportRef = React.useRef<HTMLDivElement>(null)

  const exportAsCSV = () => {
    // Можно экспортировать и больше полей, если нужно
    const rows = desktopData.map(({ month, desktop }) => ({ month, desktop }))
    const csv = toCSV(rows)
    downloadText(csv, "leadkeep-chart-data.csv", "text/csv;charset=utf-8;")
  }

  const exportAsPNG = async () => {
    if (!exportRef.current) return
    await exportElementAsPNG(exportRef.current, "leadkeep-chart.png")
  }

  const exportAsPDF = async () => {
    if (!exportRef.current) return
    await exportElementAsPDF(exportRef.current, "leadkeep-chart.pdf")
  }

  return (
    <Card data-chart={id} className="flex flex-col" ref={exportRef}>
      <ChartStyle id={id} config={chartConfig} />

      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Pie Chart - Interactive</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-2 rounded-lg">
                Exportieren
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportAsPNG}>
                Als PNG exportieren
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportAsCSV}>
                Als CSV exportieren
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportAsPDF}>
                Als PDF exportieren
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Month Select */}
          <Select value={activeMonth} onValueChange={setActiveMonth}>
            <SelectTrigger
              className="h-8 w-[140px] rounded-lg pl-2.5"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {months.map((key) => {
                const config = chartConfig[key as keyof typeof chartConfig]
                if (!config) return null

                return (
                  <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-xs"
                        style={{ backgroundColor: `var(--color-${key})` }}
                      />
                      {config.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 justify-center pb-4">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[320px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const value = desktopData[activeIndex]?.desktop ?? 0

                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                  return null
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}