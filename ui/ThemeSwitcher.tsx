"use client";

import { IconDeviceDesktop, IconMoonStars, IconSunHigh } from "@tabler/icons-react";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => setTheme('light')}><IconSunHigh /></button>
      <button onClick={() => setTheme('dark')}><IconMoonStars /></button>
      <button onClick={() => setTheme('system')}><IconDeviceDesktop /></button>
    </div>
  )
};