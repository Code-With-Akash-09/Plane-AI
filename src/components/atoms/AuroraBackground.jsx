"use client"

import { memo } from "react";

const AuroraBackground = memo(
    ({
        className = "",
        colors = ["#0a0a0a", "#1e40af", "#0a0a0a"],
    }) => {

        const gradientStyle = {
            backgroundImage: `linear-gradient(180deg, ${colors.join(", ")})`,
            minHeight: "h-full",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
        };

        return (
            <div
                className={`absolute inset-0 ${className} `}
                style={gradientStyle}
            />
        );
    }
);

export default AuroraBackground
