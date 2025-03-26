import { useEffect, useRef, useState } from "react";

import { useStore } from "@nanostores/react";
import mermaid from "mermaid";

import { colorScheme } from "@/store";

interface Props {
  chart: string;
}

/**
 * Component that renders a Mermaid diagram
 * @param {string} chart - The Mermaid diagram definition
 */
export const Mermaid = ({ chart }: Props) => {
  const $colorScheme = useStore(colorScheme);
  const svg = useMermaid(chart, $colorScheme);

  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: We know what we're doing
      dangerouslySetInnerHTML={{ __html: svg }}
      className="flex justify-center"
    />
  );
};

function useMermaid(chart: string, colorScheme: ColorScheme) {
  const [svg, setSvg] = useState<string>("");
  const chartId = useRef(`chart-${getPreciseTime()}`);

  useEffect(() => {
    initializeMermaid(colorScheme);
    renderMermaidChart(chartId.current, chart, setSvg);
  }, [colorScheme, chart]);

  return svg;
}

function initializeMermaid(colorScheme: ColorScheme) {
  mermaid.initialize({
    startOnLoad: true,
    theme: colorScheme === "dark" ? "dark" : "default",
  });
}

async function renderMermaidChart(
  chartId: string,
  chartDefinition: string,
  setSvg: (svg: string) => void,
) {
  try {
    const { svg } = await mermaid.render(chartId, chartDefinition);
    setSvg(svg);
  } catch (error) {
    console.error("Error rendering Mermaid chart:", error);
    setSvg(`<div class="text-red-500">Error rendering diagram</div>`);
  }
}

function getPreciseTime() {
  return Math.floor((Date.now() + performance.now()) * 1000);
}
