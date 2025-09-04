import { cn } from "@/lib/utils"
import Link from "next/link"
import { SparklesText } from "../magicui/SparklesText"
import { AuroraText } from "./AuroraText"

const Logo = ({ className, link = false, sparkles = false, aurora = false, sparklesCount = 6 }) => {
    const content = sparkles ? (
        <SparklesText
            sparklesCount={sparklesCount}
            className={cn("text-3xl font-bold", className)}
        >
            {aurora ? <AuroraText>Plane AI</AuroraText> : "Plane AI"}
        </SparklesText>
    ) : (
        <span className={cn("text-3xl font-bold", className)}>
            {aurora ? <AuroraText>Plane AI</AuroraText> : "Plane AI"}
        </span>
    )

    const Wrapper = link ? Link : "div"

    return (
        <Wrapper href={link ? "/" : undefined} className="w-fit font-mono">
            {content}
        </Wrapper>
    )
}

export default Logo
