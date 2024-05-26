/* eslint-disable react/no-unescaped-entities */
// pages/about-us.tsx
import Image from "next/image";
import traveler1 from "@assets/2149119434.jpg";
import traveler2 from "@assets/2149137146.jpg";
import traveler3 from "@assets/2150771125.jpg";
import traveler5 from "@assets/9174.jpg";
import bannerImage from "@assets/banner.jpg";

const teamInfo = [
	{
		name: "Angelina",
		designation: "Co-founder / CEO",
		email: "angelina@gmail.com",
		image: traveler1,
	},
	{
		name: "Donald Smith",
		designation: "Founder / CCO",
		email: "donald@gmail.com",
		image: traveler2,
	},
	{
		name: "Sahah Max",
		designation: "Founder / CTO",
		email: "sahah@gmail.com",
		image: traveler3,
	},
	{
		name: "Willam Mullar",
		designation: "Founder / CTO",
		email: "william@gmail.com",
		image: traveler5,
	},
];

const AboutUsPage = () => {
	return (
		// navbar bg-base-100 fixed top-0 left-0 w-full shadow-md z-50 px-6

		<div className=" mx-auto relative mb-20 w-full object-cover bg-center bg-no-repeat">
			<div className="relative w-full h-screen container-lg">
				<Image
					src={bannerImage}
					alt="Background"
					layout="fill"
					objectFit="cover"
					className="absolute"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
					<h1 className="text-white text-4xl md:text-7xl font-bold">
						About Us
					</h1>
					<p className="text-white text-lg md:text-2xl mt-4 max-w-2xl">
						Connecting travelers with like-minded adventurers to
						make every trip an unforgettable journey.
					</p>
				</div>
			</div>

			<h2 className="text-center text-3xl text-gray-800 mt-40 font-extrabold">
				Travel Team
			</h2>
			<p className="text-center text-lg text-gray-600 mt-4 max-w-2xl mb-14 mx-auto">
				Our team is composed of experienced travelers and tech
				enthusiasts who are passionate about making travel more social
				and enjoyable.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1440px] mx-auto mt-8">
				{teamInfo.map((item, index) => (
					<div
						key={index}
						className="rounded-lg p-8 m-2 flex flex-col items-center gap-4 shadow-lg transition-all duration-500 hover:shadow-2xl bg-white"
					>
						<div className="w-60 h-44 mx-auto">
							<Image
								src={item.image}
								alt={item.name}
								className="rounded-lg"
							/>
						</div>
						<div className="text-gray-800 font-bold text-xl">
							{item.name}
						</div>
						<div className="text-gray-600 text-lg">
							{item.designation}
						</div>
						<div className="text-gray-500">{item.email}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AboutUsPage;
