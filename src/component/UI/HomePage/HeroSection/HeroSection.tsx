import Image from 'next/image';
import star from "@assets/star.svg";
import Button from '../../Button/Button';
import Banner from "@assets/banner.jpg";
import iconShare from "@assets/play.svg";

const HeroSection = () => {
    return (
        <section className="container mx-auto flex flex-col space-y-10 py-10 pb-32 lg:py-20 xl:space-y-0 xl:space-x-10 md:flex-row">
            <div className="relative z-20 flex flex-1 flex-col md:w-1/2">
                <h1 className="font-bold w-[80%] text-4xl lg:text-6xl">Travel, enjoy and live a new and full life </h1>
                <p className="text-lg mt-2 lg:mt-4 text-gray-500 xl:max-w-[520px]">
                    We want to be on each of your journeys seeking the satisfaction of seeing the incorruptible beauty of nature. We can help you on an adventure around the world in just one app.
                </p>
                <div className="my-4 lg:my-6 flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        {Array(5).fill(1).map((_, index) => (
                            <Image
                                src={star}
                                key={index}
                                alt="star"
                                width={22}
                                height={22}
                            />
                        ))}
                    </div>

                    <p className="font-bold text-lg lg:text-xl text-green-700">
                        198k
                        <span className="text-base lg:text-lg ml-1">Excellent Reviews</span>
                    </p>
                </div>

                <div className="flex flex-row w-[40%] gap-3">
                    <Button
                        type="button"
                        title="Share Your Trip"
                        variant="btn_green"
                    />

                    <Button
                        type="button"
                        title="How we work?"
                        icon={iconShare}
                        variant="btn_white_text"
                    />
                </div>
            </div>

            <div className="relative flex flex-1 items-center md:w-1/2">
                <div className="relative z-20 flex rounded-2xl flex-col gap-8 bg-blue-100 px-6 py-6">
                    <Image
                        src={Banner}
                        alt="404 Error"
                        width={650}
                        height={500}
                        style={{ marginTop: '10px', maxWidth: '100%', borderRadius: "10px" }}
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;




// <h2 className="text-center text-4xl text-black font-bold py-16">About Us</h2>

//             <div className="flex flex-col md:flex-row justify-between items-center mb-10">
//                 <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-8"> {/* Added md:mr-8 for margin */}
//                     <Image src={aboutUsImage} alt="about-us" />
//                 </div>
//                 <div className="w-full md:w-1/2">
//                     <p className="text-lg mb-4">
//                         Welcome to Travel Buddy! Our platform is designed to connect travelers looking for companionship on their trips. Whether you're an adventurer, a leisure traveler, or traveling for business, you can share your travel plans, search for trips, and find like-minded individuals to join you.
//                     </p>
//                     <p className="text-lg mb-4">
//                         Our mission is to foster a community of travelers who can explore the world together, share experiences, and make travel more enjoyable and safe. With Travel Buddy, you can save time and effort in finding travel companions while also helping others in the community.
//                     </p>
//                     <p className="text-lg mb-4">
//                         We believe in the power of community and the positive impact that traveling together can have. Join us in making travel a shared and enriching experience for everyone.
//                     </p>

//                 </div>
//             </div>