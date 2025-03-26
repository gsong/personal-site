import { useLayoutEffect } from "react";

import { colorScheme as _colorScheme } from "@/store";
import { useStore } from "@nanostores/react";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

const COLOR_SCHEME_ICONS = {
  system: DesktopIcon,
  light: SunIcon,
  dark: MoonIcon,
} as const;

/**
 * A button that cycles through color scheme options (light/dark/system)
 * and displays the appropriate icon for the current scheme.
 */
export const ColorSchemeToggle = () => {
  const { currentScheme, nextScheme, cycleScheme } = useColorScheme();
  const IconComponent = COLOR_SCHEME_ICONS[currentScheme];

  return (
    <button
      onClick={cycleScheme}
      className="btn-circle btn-soft size-[48px]"
      type="button"
    >
      <IconComponent className="size-7" />
      <span className="sr-only">Activate {nextScheme} color scheme</span>
    </button>
  );
};

const useColorScheme = () => {
  const $colorScheme = useStore(_colorScheme);

  const SCHEME_CYCLE: Record<ColorScheme, ColorScheme> = {
    light: "dark",
    dark: "system",
    system: "light",
  };

  const nextScheme = SCHEME_CYCLE[$colorScheme];
  const cycleScheme = () => _colorScheme.set(nextScheme);

  useLayoutEffect(() => {
    window.colorScheme.set($colorScheme);
  }, [$colorScheme]);

  return {
    currentScheme: $colorScheme,
    nextScheme,
    cycleScheme,
  };
};
