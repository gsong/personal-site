import { useEffect, useMemo, useState } from "react";

import { useStore } from "@nanostores/react";
import mermaid from "mermaid";

import { colorScheme } from "@/store";

interface Props {
  chart: string;
}

export const Mermaid = ({ chart }: Props) => {
  const $colorScheme = useStore(colorScheme);
  const [svg, setSvg] = useState<string>("");
  const id = useMemo(() => getPreciseTime(), []);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: $colorScheme === "dark" ? "dark" : "default",
    });

    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(`chart-${id}`, chart);
        setSvg(svg);
      } catch (error) {
        console.error("Error rendering Mermaid chart:", error);
      }
    };

    renderChart();
  }, [$colorScheme, chart, id]);

  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: We know what we're doing
      dangerouslySetInnerHTML={{ __html: svg }}
      className="flex justify-center"
    />
  );
};

function getPreciseTime() {
  return Math.floor((Date.now() + performance.now()) * 1000);
}
