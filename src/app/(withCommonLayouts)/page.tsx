import FeaturedDestinations from "@/component/UI/HomePage/FeaturedDestination/FeaturedDestination";

import AboutUs from "@/component/UI/HomePage/AboutUs/page";
import HeroSection from "@/component/UI/HomePage/HeroSection/HeroSection";

import React from "react";
import Travel from "@/component/UI/HomePage/TravelSection/Travel";

const HomePage = () => {
	return (
		<div>
			<HeroSection />
			<AboutUs />
			<Travel />
			<FeaturedDestinations />
		</div>
	);
};

export default HomePage;
