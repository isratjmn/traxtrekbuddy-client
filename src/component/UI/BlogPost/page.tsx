"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./style.css";

const blogPosts = [
	{
		title: "Top 10 Destinations for 2024",
		imageUrl:
			"https://res.cloudinary.com/dmr810p4l/image/upload/v1717539381/blogger-1_bqqyh6.jpg",

		excerpt:
			"Discover the must-visit destinations for your 2024 travel plans...",
		link: "/blog/top-10-destinations-2024",
		date: "June 1, 2024",
	},
	{
		title: "A Guide to Sustainable Travel",
		imageUrl:
			"https://res.cloudinary.com/dmr810p4l/image/upload/v1717539381/vlogger-4_km4nai.jpg",
		excerpt:
			"Learn how to travel responsibly and reduce your carbon footprint...",
		// link: "/blog/guide-to-sustainable-travel",
		date: "May 25, 2024",
	},
	{
		title: "Exploring the Wonders of South America",
		imageUrl:
			"https://res.cloudinary.com/dmr810p4l/image/upload/v1717539382/vlogger-3_sgnolu.webp",

		excerpt:
			"Join us on a journey through the breathtaking landscapes of South America...",
		link: "/blog/exploring-south-america",
		date: "May 18, 2024",
	},
	{
		title: "Winter Wonderland in Canada",
		imageUrl:
			"https://res.cloudinary.com/dmr810p4l/image/upload/v1717539382/blogger-2_cy3cbt.jpg",

		excerpt:
			"Explore the snowy landscapes and winter activities in Canada...",
		link: "/blog/winter-wonderland-canada",
		date: "January 5, 2024",
	},
];

const TravelBlog = () => {
	const [animate, setAnimate] = useState(false);

	/* useEffect(() => {
		setAnimate(true);
	}, []); */

	useEffect(() => {
		const handleScroll = () => {
			const section = document.getElementById("travel-blog-section");
			if (
				section &&
				window.scrollY + window.innerHeight > section.offsetTop + 100
			) {
				setAnimate(true);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="container mx-auto">
			<h2 className="text-4xl font-bold mx-auto mb-2">Travel Blogs</h2>
			<p className="text-left text-lg text-gray-600 mb-10 w-[85%] lg:w-[60%]">
				Immerse yourself in tales of exploration, discovery, and
				adventure as we share our passion for travel and uncover the
				beauty of our planet one destination at a time. Whether you are
				a seasoned globetrotter.
			</p>
			<section
				id="travel-blog-section"
				className={`py-6 bg-white ${animate ? "animate-slide" : ""}`}
			>
				<div className="container mx-auto mb-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{blogPosts.map((post, index) => (
							<div
								key={index}
								className="blog-post bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
							>
								<div className="image-container">
									<Image
										src={post?.imageUrl}
										alt={post?.title}
										width={500}
										height={300}
										className="w-full h-48 object-cover lg:h-64"
									/>
								</div>
								<div className="p-4">
									<h3 className="text-2xl font-bold mb-2">
										{post?.title}
									</h3>
									<p className="text-gray-500 text-sm mb-2">
										{post?.date}
									</p>
									<p className="text-lg mb-4">
										{post?.excerpt}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default TravelBlog;
