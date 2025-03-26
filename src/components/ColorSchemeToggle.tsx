import { useLayoutEffect } from "react";

import { useStore } from "@nanostores/react";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";

import { colorScheme as _colorScheme } from "@/store";

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
        Activate {getNextColorScheme()} color scheme
      </span>
    </button>
  );
};

const useColorScheme = () => {
  const $colorScheme = useStore(_colorScheme);

  const getNextColorScheme = (): ColorScheme => {
    if ($colorScheme === "light") return "dark";
    if ($colorScheme === "dark") return "system";
    return "light";
  };

  const cycleColorScheme = () => {
    _colorScheme.set(getNextColorScheme());
  };

  useLayoutEffect(() => {
    window.colorScheme.set($colorScheme);
  }, [$colorScheme]);

  return { colorScheme: $colorScheme, getNextColorScheme, cycleColorScheme };
};
