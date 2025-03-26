import type { JSX } from "react";

import { useState } from "react";

import {
  ExclamationTriangleIcon,
  ExternalLinkIcon,
  KeyboardIcon,
} from "@radix-ui/react-icons";
import { clsx } from "clsx";

interface CodeSandboxProps extends React.ComponentPropsWithoutRef<"iframe"> {
  id: string;
  title: string;
  file?: string;
  heading?: {
    component?:
      | keyof JSX.IntrinsicElements
      | React.ComponentType<React.HTMLAttributes<HTMLHeadingElement>>;
    label?: string;
    hide?: boolean;
  };
}

export const CodeSandbox = ({
  id,
  title,
  file,
  heading = {},
  className,
}: CodeSandboxProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const isIphone = /iPhone/.test(navigator.userAgent);

  const {
    component: Heading = "h3",
    label = "Try It Out",
    hide: hideHeading = false,
  } = heading;

  return (
    <>
      {hideHeading ? null : (
        <Heading className="flex-center">
          <KeyboardIcon className="size-[1.15em]" />
          {label}
        </Heading>
      )}

      {isIphone ? (
        <>
          <a
            href={createCodeSandboxUrl(id, { file, isEmbedded: false })}
            target="_blank"
            rel="noreferrer"
            className="flex-center"
          >
            <ExternalLinkIcon className="size-[1.15em]" />
            Open Sandbox
          </a>
          <p className="flex-center mt-1 text-sm text-yellow-600">
            <ExclamationTriangleIcon className="size-[1.15em]" />
            CodeSandbox may not work on iPhones.
          </p>
        </>
      ) : shouldLoad ? (
        <div className="@container">
          <iframe
            src={createCodeSandboxUrl(id, { file })}
            title={title}
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            className={clsx(
              "mx-[calc((100%-100vw)/2)] h-[clamp(150px,60vh,800px)] w-[100vw]",
              className,
            )}
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

interface Options {
  file?: string;
  isEmbedded?: boolean;
}

function createCodeSandboxUrl(
  id: string,
  { file = "src/App.js", isEmbedded = true }: Options,
) {
  const baseUrl = "https://codesandbox.io/p/devbox/";
  const url = new URL(baseUrl + id);

  const params = new URLSearchParams({
    file,
    showConsole: "true",
  });

  if (isEmbedded) {
    params.append("embed", "1");
  }

  url.search = params.toString();
  return url.toString();
}
