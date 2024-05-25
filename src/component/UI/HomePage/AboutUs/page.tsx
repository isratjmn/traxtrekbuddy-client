import Image from "next/image";
import aboutUsImage from "../../../../../public/assets/about-us.jpg";

const AboutUs = () => {
	return (
		<div className="container mx-auto max-w-[1440px] mt-16">
			<div className="bg-blue-50 rounded-lg flex flex-col items-center py-12 px-4 sm:px-6 lg:px-4">
				<div className="max-w-7xl w-full space-y-8">
					<div className="text-center">
						<h2 className="text-4xl py-6 font-extrabold text-gray-900">
							About Us
						</h2>
						<p className="text-center text-lg text-gray-600 mt-4 max-w-2xl mb-16 mx-auto">
							Our team is composed of experienced travelers and
							tech enthusiasts who are passionate about making
							travel more social and enjoyable.
						</p>
					</div>
					<div className="flex flex-col md:flex-row items-center md:items-start md:justify-between space-y-8 md:space-y-0 md:space-x-12">
						<div className="w-full md:w-1/2 flex flex-col items-start space-y-4">
							<h2 className="text-2xl font-extrabold text-gray-900">
								Our Dream is Global Travel Transformation
							</h2>
							<p className="text-lg text-gray-700">
								Travel Buddy was founded by adventurers Alex
								Johnson and Jamie Doe. Their shared passion for
								exploring the world inspired them to create a
								platform that connects like-minded travelers.
								Our mission is to make travel easier and more
								enjoyable for everyone.
							</p>
							<p className="text-lg text-gray-700">
								With over 5 years of experience in the travel
								industry, we offer tailored travel experiences,
								practical tips.
							</p>
							<div className="flex w-full justify-around items-center text-center bg-white rounded-lg shadow-md p-6">
								<div>
									<h3 className="text-2xl font-bold text-gray-900">
										5+
									</h3>
									<p className="text-gray-600">
										Years Experience
									</p>
								</div>
								<div>
									<h3 className="text-2xl font-bold text-gray-900">
										50+
									</h3>
									<p className="text-gray-600">
										Destinations
									</p>
								</div>
								<div>
									<h3 className="text-2xl font-bold text-gray-900">
										10K+
									</h3>
									<p className="text-gray-600">
										Happy Travelers
									</p>
								</div>
							</div>
						</div>

						<div className="relative w-full md:w-1/2 h-64 md:h-96">
							<Image
								src={aboutUsImage}
								className="rounded-lg"
								layout="fill"
								objectFit="cover"
								alt="about-us"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
