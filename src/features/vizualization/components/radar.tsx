"use client";
import { ResponsiveRadar } from "@nivo/radar";
import { useRouter } from "next/navigation";

export function Radar({ data }: { data: Record<string, unknown>[] }) {

  const router = useRouter();

  function handleClick(event: any) {
    router.replace(`/petal-notes/${event.id}`)
  }

  const chartTheme = {
    fontSize: 16,
    fontFamily: "Hikasami, sans-serif",
    axis: {
      legend: {
        text: {
          fontSize: 16,
          fill: "#333333",
        },
      },
      ticks: {
        text: {
          fontSize: 16,
          fill: "#999",
        },
      },
    },
    labels: {
      text: {
        fontSize: 12,
        fontWeight: "bold",
        fill: "#000000",
      },
    },
    grid: {
      line: {
        cursor: "pointer",
      },
    },
  };

  return (
    <ResponsiveRadar
      data={data}
      keys={["value"]}
      indexBy="wheelKey"
      margin={{ top: 70, right: 80, bottom: 60, left: 80 }}
      gridLabelOffset={24}
      dotSize={10}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      blendMode="multiply"
      colors={{ scheme: "blue_green" }}
      // colors={["#06592A", "#999", "#023217"]}
      onClick={handleClick}
      theme={chartTheme}
    />
  );
}
