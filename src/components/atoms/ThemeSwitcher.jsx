"use client"

import { MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme()

	return (
		<Button
			size="icon"
			variant="outline"
			suppressHydrationWarning
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			{theme === "dark" ? (
				<MoonStarIcon className="size-5" />
			) : (
				<SunIcon className="size-5" />
			)}
		</Button>
	)
}

export default ThemeSwitcher
