import { Moon, Sun } from "lucide-react";
import { useTheme } from "../utils/useTheme";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center justify-center w-9 h-9 rounded-md text-vinted-green hover:bg-stone-100 dark:hover:bg-stone-800"
    >
      {isDark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}

export default ThemeToggle;
