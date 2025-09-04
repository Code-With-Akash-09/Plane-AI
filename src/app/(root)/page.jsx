"use client"

import { AuroraText } from "@/components/atoms/AuroraText"
import { MorphingText } from "@/components/atoms/MorphingText"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"
import { Rocket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Home = () => {

	const isMobile = useIsMobile()

	const MotionOrDiv = isMobile ? "div" : motion.div

	return (
		<div className="size-full flex pt-12">
			<div className="flex w-full md:h-full min-h-[600px] max-h-[1000px] mx-auto items-end justify-center overflow-hidden relative">
				<div className="flex w-full h-full">
					<MotionOrDiv
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
						className="flex h-full items-center justify-center w-full"
					>
						<span className="flex size-full translate-y-80 min-w-40 aspect-square max-w-full bg-blue-600/40 rounded-full blur-[300px]"></span>
					</MotionOrDiv>
					<div className="flex absolute z-10 bottom-0 inset-x-0 items-end justify-center h-full w-full">
						<MotionOrDiv
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
							className="flex w-full h-80 md:h-[90%] relative justify-center"
						>
							<MotionOrDiv
								initial={{ x: 0 }}
								animate={{ x: isMobile ? 0 : 350 }}
								transition={{ duration: 2.5, delay: 2, ease: "easeInOut" }}
								className="flex w-full max-w-2xl relative">
								<Image
									src={"/assets/banner-img/hero-img.avif"}
									alt="Hero Image"
									fill
									className="object-contain object-bottom-right md:object-bottom"
								/>
							</MotionOrDiv>
						</MotionOrDiv>
					</div>
				</div>
				<MotionOrDiv
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 2.5, delay: 2, ease: "easeInOut" }}
					className="flex w-full h-full absolute top-0 z-20 inset-0 md:items-center ,md:justify-center"
				>

					<MotionOrDiv
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 2.5, delay: 3, ease: "easeInOut" }}
						className="flex flex-col gap-4 md:gap-6 px-4 py-8 w-full max-w-7xl mx-auto">
						<h1 className="flex font-mono flex-col text-3xl lg:text-4xl xl:text-5xl font-bold max-w-xl gap-4 w-full">
							<span className="w-fit">Autonomous</span>
							<span className="w-fit space-x-4">
								<span className="bg-white w-fit rounded-lg px-4 py-0.5">
									<AuroraText>AI Agents</AuroraText>
								</span>
								<span className="w-fit">
									Built
								</span>
							</span>
							<span className="w-fit flex gap-3"> for
								<MorphingText texts={
									[
										"Interviews",
										"Developers",
										"Tech Jobs",
										"Job Skills",
										"Mock Rounds",
										"First Job",
										"Confidence",
										"Growth",
										"Coding",
										"Success"
									]
								}
								/>
							</span>
						</h1>
						<p className="text-sm md:text-base lg:text-lg max-w-full md:max-w-xl">
							Plane AI empowers businesses with next-gen autonomous agents that learn, adapt, and act - in real-time, across systems, at scale.
						</p>
						<Button asChild className={"cursor-pointer"}>
							<Link href={"/agents"}
								className="w-fit"
							>
								Get Started <Rocket />
							</Link>
						</Button>
					</MotionOrDiv>
				</MotionOrDiv>
			</div>
		</div>
	)
}

export default Home
