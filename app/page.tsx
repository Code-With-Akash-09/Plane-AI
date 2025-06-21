import ThemeSwitcher from "@/components/atoms/ThemeSwitcher"

const Home = () => {
	return (
		<div className="size-full flex">
			<div className="flex w-full">
				{/* <Image
				  src="/path/to/image.jpg"
				  alt="Description of image"
				  layout="responsive"
				  width={700}
				  height={475}
			  /> */}
				<ThemeSwitcher />
			</div>
		</div>
	)
}

export default Home
