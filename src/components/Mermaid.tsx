import type { MermaidConfig } from "mermaid";

import { useEffect, useMemo, useRef, useState } from "react";

import { useStore } from "@nanostores/react";
import mermaid from "mermaid";

import { colorScheme } from "@/store";

interface Props {
  diagram: string;
  caption?: string;
  layout?: "dagre" | "elk";
}

export const Mermaid = ({ diagram, caption, layout = "dagre" }: Props) => {
  const $colorScheme = useStore(colorScheme);
  const diagramId = useRef(`diagram-${getPreciseTime()}`).current;
  const svg = useMermaid(
    diagramId,
    diagram,
    useMemo(
      () => ({
        colorScheme: $colorScheme,
        layout,
      }),
      [$colorScheme, layout],
    ),
  );

  return (
    <figure
      aria-labelledby={caption ? `fig-caption-${diagramId}` : undefined}
      className="flex flex-col items-center"
    >
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: We know what we're doing
        dangerouslySetInnerHTML={{ __html: svg }}
        className="flex w-full justify-center"
      />
      {caption && (
        <figcaption id={`fig-caption-${diagramId}`} className="text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

interface Config extends MermaidConfig {
  colorScheme: ColorScheme;
}

function useMermaid(diagramId: string, diagram: string, config: Config) {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    const initAndRender = async () => {
      await initializeMermaid(config);
      renderMermaidDiagram(diagramId, diagram, setSvg);
    };
    initAndRender();
  }, [config, diagram, diagramId]);

  return svg;
}

async function initializeMermaid({ colorScheme, ...config }: Config) {
  if (config.layout === "elk") {
    const elkLayouts = await import("@mermaid-js/layout-elk");
    mermaid.registerLayoutLoaders(elkLayouts.default);
  }

  mermaid.initialize({
    ...config,
    startOnLoad: true,
    theme:
      colorScheme === "dark" ||
      (colorScheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "default",
    sequence: { diagramMarginX: 0, diagramMarginY: 0 },
  });
}

async function renderMermaidDiagram(
  diagramId: string,
  diagramDefinition: string,
  setSvg: (svg: string) => void,
) {
  try {
    const { svg } = await mermaid.render(diagramId, diagramDefinition);
    setSvg(svg);
  } catch (error) {
    console.error("Error rendering Mermaid diagram:", error);
    setSvg(`<div class="text-red-500">Error rendering diagram</div>`);
  }
}

function getPreciseTime() {
  return Math.floor((Date.now() + performance.now()) * 1000);
}
