import { clsx } from "clsx";

interface CodeSandboxProps extends React.ComponentPropsWithoutRef<"iframe"> {
  id: string;
  title: string;
  file?: string;
}

export const CodeSandbox = ({
  id,
  title,
  file,
  className,
}: CodeSandboxProps) => {
  return (
    <>
      <h2>Try It Out</h2>
      <div className="@container">
        <iframe
          src={createCodeSandboxUrl(id, file)}
          title={title}
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          className={clsx("h-150 w-full rounded-lg", className)}
        />
      </div>
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
