import type { JSX } from "react";

import { useState } from "react";

import { KeyboardIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";

interface CodeSandboxProps extends React.ComponentPropsWithoutRef<"iframe"> {
  id: string;
  title: string;
  file?: string;
  heading?:
    | "hide"
    | keyof JSX.IntrinsicElements
    | React.ComponentType<React.HTMLAttributes<HTMLHeadingElement>>;
}

export const CodeSandbox = ({
  id,
  title,
  file,
  heading: Heading = "h3",
  className,
}: CodeSandboxProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  return (
    <>
      {Heading === "hide" ? null : (
        <Heading className="flex items-center gap-2">
          <KeyboardIcon className="size-[1.15em]" />
          Try It Out
        </Heading>
      )}

      {shouldLoad ? (
        <div className="@container">
          <iframe
            src={createCodeSandboxUrl(id, file)}
            title={title}
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            className={clsx("h-150 w-full rounded-md", className)}
          />
        </div>
      ) : (
        <button type="button" onClick={() => setShouldLoad(true)}>
          Load Sandbox
        </button>
      )}
    </>
  );
};

function createCodeSandboxUrl(id: string, file = "index.js") {
  const baseUrl = "https://codesandbox.io/p/devbox/";
  const url = new URL(baseUrl + id);

  const params = new URLSearchParams({
    embed: "1",
    file,
    showConsole: "true",
  });

  url.search = params.toString();
  return url.toString();
}
