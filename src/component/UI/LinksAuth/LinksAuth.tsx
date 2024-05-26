import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LinksAuth = () => {
	const userInfo = getUserInfo();
	const router = useRouter();

	return (
		<>
			{userInfo?.id && (
				<li>
					<Link
						href="/my-profile"
						className="lg:text-lg lg:text-black font-bold lg:hover:text-teal-500 text-[16px] text-gray-700 hover:text-teal-600 transition"
					>
						My Profile
					</Link>
				</li>
			)}
		</>
	);
};

export default LinksAuth;
