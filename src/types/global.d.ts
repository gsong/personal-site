type ColorScheme = "light" | "dark" | "system";

interface Window {
  colorScheme: { get: () => ColorScheme; set: (colorScheme) => void };
  setThemes: (colorScheme: ColorScheme, doc: Document) => void;
}
