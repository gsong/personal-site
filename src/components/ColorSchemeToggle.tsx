import { useLayoutEffect, useState } from "react";

import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";

// TODO:
//   - Toggle expressive-code theme properly
//   - a11y and style this properly
//   - can we share code with inline script?

export const ColorSchemeToggle = () => {
  const { colorScheme, getNextColorScheme, cycleColorScheme } =
    useColorScheme();

  return (
    <button
      onClick={cycleColorScheme}
      className="btn-circle btn-soft size-[48px]"
      type="button"
    >
      <DesktopIcon
        className={clsx({ hidden: colorScheme !== "system" }, "size-7")}
      />
      <SunIcon
        className={clsx({ hidden: colorScheme !== "light" }, "size-7")}
      />
      <MoonIcon
        className={clsx({ hidden: colorScheme !== "dark" }, "size-7")}
      />
      <span className="sr-only">
        Activate {getNextColorScheme(colorScheme)} color scheme
      </span>
    </button>
  );
};

const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("system");

  const getNextColorScheme = (prev: ColorScheme): ColorScheme => {
    if (prev === "light") return "dark";
    if (prev === "dark") return "system";
    return "light";
  };

  const cycleColorScheme = () => {
    setColorScheme(getNextColorScheme);
  };

  useLayoutEffect(() => {
    setColorScheme(window.colorScheme.get());
  }, []);

  useLayoutEffect(() => {
    window.colorScheme.set(colorScheme);
  }, [colorScheme]);

  return { colorScheme, getNextColorScheme, cycleColorScheme };
};
