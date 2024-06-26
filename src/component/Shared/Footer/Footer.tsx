/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaMediumM, FaTelegramPlane } from 'react-icons/fa';
import Link from "next/link";
import logo from "@assets/logo.png";

const Footer = () => {
    return (
        <div className="bg-gray-900 text-white px-4">

            <div className="bg-blue-50 text-black font-bold py-10">
                <div className="max-w-[1440px] px-6 lg:px-1 container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <h2 className="text-2xl">Ready for a next project?</h2>
                    <Link href="#" className="bg-gray-800 text-white py-2 px-4 rounded">Contact us</Link>
                </div>
            </div>
            <div className="container mx-auto py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                <div className=" items-center gap-3 space-y-4">
                    <Image src={logo}
                        width={60}
                        height={60}
                        alt="brand logo" />
                    <Link href="/" className="text-2xl font-bold text-white hover:text-white-500 transition">
                        Trek<span className="text-teal-500">Trex</span>-Travel
                    </Link>
                    <p className="text-lg mt-2 lg:mt-4 text-white-500 xl:max-w-[280px]">
                        We want to be on each of your journeys seeking the satisfaction of seeing the incorruptible beauty of nature. We can help you on an adventure around the world in just one app.
                    </p>
                </div>
                <div className="space-y-2">
                    <h5 className="text-xl text-teal-500">Customers</h5>
                    <ul className="space-y-1">
                        <li><Link href="#"><span className="hover:underline">Buyer</span></Link></li>
                        <li><Link href="#"><span className="hover:underline">Supplier</span></Link></li>
                        <li><Link href="#"><span className="hover:underline">FAQs</span></Link></li>
                        <li><Link href="#"><span className="hover:underline">Help Center</span></Link></li>
                        <li><Link href="#"><span className="hover:underline">Community Forum</span></Link></li>
                        <li><Link href="#"><span className="hover:underline">Contact Support</span></Link></li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h5 className="text-xl text-teal-500">Company</h5>
                    <ul className="space-y-1">
                        <li><Link href="#"><span className="hover:underline">About us</span></Link></li>
                        <li><Link href="#"><span className="hover:underline">Careers</span></Link></li>
                        <li><Link href="#"><span className="hover:underline">Contact us</span></Link></li>
                        <li><Link href="#"><span className="hover:underline">Blog</span></Link></li>
                        <li><Link href="#"><span className="hover:underline">Press</span></Link></li>
                        <li><Link href="#"><span className="hover:underline">Partners</span></Link></li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h5 className="text-xl text-teal-500">Further Information</h5>
                    <ul className="space-y-1">
                        <li><Link href="#"><span className="hover:underline">Terms & Conditions</span></Link></li>
                        <li><Link href="#"><span className="hover:underline">Privacy Policy</span></Link></li>
                        <li><Link href="#"><span className="hover:underline"> 123 Travel Buddy St, Wanderlust City</span></Link></li>
                        <li><Link href="#"><span className="hover:underline">info@travelbuddy.com</span></Link></li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h5 className="text-xl text-teal-500">Follow us</h5>
                    <div className="flex space-x-4">
                        <Link href="#"><span className="hover:text-indigo-400"><FaFacebookF /></span></Link>
                        <Link href="#"><span className="hover:text-indigo-400"><FaTwitter /></span></Link>
                        <Link href="#"><span className="hover:text-indigo-400"><FaLinkedinIn /></span></Link>
                        <Link href="#"><span className="hover:text-indigo-400"><FaMediumM /></span></Link>
                        <Link href="#"><span className="hover:text-indigo-400"><FaTelegramPlane /></span></Link>
                    </div>
                </div>
                <aside>
                    <p>Copyright©2024 - All right reserved by IZMTechz</p>
                </aside>
            </div>
        </div>
    );
};

export default Footer;



{/* <div>
                <div className="flex items-center gap-3">
                    <Image src={logo}
                        width={40}
                        height={40}
                        alt="brand logo" />
                    <Link href="/" className="text-xl font-bold text-black hover:text-teal-500 transition">
                        Trek<span className="text-teal-500">Trex</span>-Travel
                    </Link>
                </div>
                <p className="w-2/3 mt-2 text-black text-xl">

                    Travel Buddy is a dynamic platform designed to connect like-minded travelers from around the world. Whether you're planning a solo adventure, seeking a travel companion, or looking to join a group tour, Travel Buddy is here to enhance your journey. Discover new destinations, share travel experiences, and make lifelong friends.

                </p>
            </div>

            <nav>
                <div className="grid grid-flow-col gap-5">
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current"
                        >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="21"
                            viewBox="0 0 24 24"
                            className="fill-current"
                        >
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current"
                        >
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                    </a>

                </div>
            </nav>
            <aside>
                <p>Copyright©2024 - All right reserved by IZMTechz</p>
            </aside> */}