"use client";
import { ResponsivePolarBar } from "@nivo/polar-bar";

export function PolarBar({ data }: { data: Record<string, unknown>[] }) {
  return (
    <ResponsivePolarBar
      data={data}
      keys={["value"]}
      indexBy="wheelKey"
      valueSteps={5}
      // valueFormat=">-$.0f"
      margin={{ top: 30, right: 20, bottom: 70, left: 20 }}
      // innerRadius={0.25}
      cornerRadius={8}
      borderWidth={2}
      arcLabelsSkipRadius={28}
      radialAxis={{
        angle: 180,
        ticksPosition: "after",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      circularAxisOuter={{ tickSize: 5, tickPadding: 15, tickRotation: 0 }}
    />
  );
}
