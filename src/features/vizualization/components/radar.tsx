"use client";
import { ResponsiveRadar } from "@nivo/radar";

export function Radar({ data }: { data: Record<string, unknown>[] }) {
  return (
    <ResponsiveRadar
      data={data}
      keys={["value"]}
      indexBy="wheelKey"
      margin={{ top: 70, right: 80, bottom: 60, left: 80 }}
      gridLabelOffset={36}
      dotSize={10}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      blendMode="multiply"
    />
  );
}
