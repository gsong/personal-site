import type { JSX } from "react";

import { useState } from "react";

import {
  ArrowTopRightOnSquareIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { KeyboardIcon } from "@radix-ui/react-icons";
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
  const { shouldLoad, setShouldLoad, isIphone, buildUrl } = useCodeSandbox(
    id,
    file,
  );

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
        <IphoneFallback url={buildUrl(false)} />
      ) : shouldLoad ? (
        <SandboxIframe url={buildUrl()} title={title} className={className} />
      ) : (
        <button type="button" onClick={() => setShouldLoad(true)}>
          Load Sandbox
        </button>
      )}
    </>
  );
};

const useCodeSandbox = (id: string, file?: string) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const isIphone = /iPhone/.test(navigator.userAgent);

  const buildUrl = (isEmbedded = true) => {
    const baseUrl = "https://codesandbox.io/p/devbox/";
    const url = new URL(baseUrl + id);
    const params = new URLSearchParams({
      file: file || "src/App.js",
      showConsole: "true",
      ...(isEmbedded && { embed: "1" }),
    });
    url.search = params.toString();
    return url.toString();
  };

  return {
    shouldLoad,
    setShouldLoad,
    isIphone,
    buildUrl,
  };
};

const IphoneFallback = ({ url }: { url: string }) => (
  <>
    <a href={url} target="_blank" rel="noreferrer" className="flex-center">
      <ArrowTopRightOnSquareIcon className="size-[1.15em]" />
      Open Sandbox
    </a>
    <p className="flex-center mt-1 text-sm text-yellow-600">
      <ExclamationTriangleIcon className="size-[1.15em]" />
      CodeSandbox may not work on iPhones.
    </p>
  </>
);

const IFRAME_ALLOW = [
  "accelerometer",
  "ambient-light-sensor",
  "camera",
  "encrypted-media",
  "geolocation",
  "gyroscope",
  "hid",
  "microphone",
  "midi",
  "payment",
  "usb",
  "vr",
  "xr-spatial-tracking",
].join("; ");

const IFRAME_SANDBOX = [
  "allow-forms",
  "allow-modals",
  "allow-popups",
  "allow-presentation",
  "allow-same-origin",
  "allow-scripts",
].join(" ");

const SandboxIframe = ({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) => (
  <div className="@container">
    <iframe
      src={url}
      title={title}
      allow={IFRAME_ALLOW}
      sandbox={IFRAME_SANDBOX}
      className={clsx(
        "mx-[calc((100%-100vw)/2)] h-[clamp(150px,60vh,800px)] w-[100vw]",
        className,
      )}
    />
  </div>
);
