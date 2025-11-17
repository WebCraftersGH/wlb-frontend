"use client";
import { ResponsiveRadar } from "@nivo/radar";
import { useRouter } from "next/navigation";

interface IRadarProps {
  data: { data: Record<string, unknown>[] };
  type: "startRun" | "futureRun";
}

export function Radar(props: IRadarProps) {
  const { data, type } = props;
  const router = useRouter();

  function handleClick(event: any) {
    router.replace(`/petal-notes/${event.id}`);
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

  if (type === "startRun") {
    return (
      <ResponsiveRadar
        data={data}
        keys={["value", "run_value"]}
        indexBy="wheel_key"
        margin={{ top: 70, right: 80, bottom: 60, left: 80 }}
        gridLabelOffset={24}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        blendMode="multiply"
        colors={["#fff", "#5fb54e"]}
        onClick={handleClick}
        theme={chartTheme}
      />
    );
  } else if (type === "futureRun") {
    return (
      <ResponsiveRadar
        data={data}
        keys={["startValue", "runValue"]}
        indexBy="wheelKey"
        margin={{ top: 70, right: 80, bottom: 60, left: 80 }}
        gridLabelOffset={24}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        blendMode="multiply"
        colors={["#fff", "#b54e4e"]}
        onClick={handleClick}
        theme={chartTheme}
      />
    );
  }
}
