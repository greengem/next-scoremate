"use client";

import { IconDeviceDesktop, IconMoonStars, IconSunHigh } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import clsx from "clsx";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = [
    { name: 'light', icon: <IconSunHigh />, label: 'Light theme' },
    { name: 'dark', icon: <IconMoonStars />, label: 'Dark theme' },
    { name: 'system', icon: <IconDeviceDesktop />, label: 'System theme' },
  ];

  return (
    <ul className="flex flex-col gap-2 justify-center items center">
      {themes.map(({ name, icon, label }) => (
        <li key={name} className="flex justify-center">
          <button 
            aria-label={label}
            onClick={() => setTheme(name)} 
            className={clsx("dark:hover:bg-ctp-mantle dark:hover:text-ctp-mauve hover:bg-zinc-200 p-2 rounded-full", {
              'text-black dark:text-ctp-mauve bg-primary dark:bg-ctp-mantle ring-1 ring-ctp-mauve': theme === name
            })}
          >
            {icon}
          </button>
        </li>
      ))}
    </ul>
  );
};