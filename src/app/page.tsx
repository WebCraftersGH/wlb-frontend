import { PolarBar } from "../features/vizualization/components/polar-bar";
import { Radar } from "../features/vizualization/components/radar";

export default function Home() {
  const radarData: Record<string, unknown>[] = [
    {
      wheelKey: "свойство 1",
      value: 10,
    },
    {
      wheelKey: "свойство 2",
      value: 5,
    },
    {
      wheelKey: "свойство 1",
      value: 10,
    },
    {
      wheelKey: "свойство 1",
      value: 10,
    },
  ];

  const polarBarData: Record<string, unknown>[] = [
    {
      wheelKey: "prop 1",
      value: 173,
    },
    {
      wheelKey: "prop 2",
      value: 72,
    },
    {
      wheelKey: "prop 3",
      value: 109,
    },
    {
      wheelKey: "prop 4",
      value: 141,
    }
  ];

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center space-y-2">
      <h1 className="self-center justify-center">just example text</h1>
      <div className="h-[500px] w-[500px] rounded-2xl bg-[#191919]">
        <Radar data={radarData} />
      </div>
      <div className="h-[500px] w-[500px] rounded-2xl bg-[#191919]">
        <PolarBar data={polarBarData} />
      </div>
    </div>
  );
}
