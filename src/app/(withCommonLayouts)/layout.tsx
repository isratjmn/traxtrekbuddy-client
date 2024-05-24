import Footer from "@/component/Shared/Footer/Footer";
import NavBar from "@/component/Shared/NavBar/NavBar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className="w-full flex justify-center bg-blue-50 py-4">
				<div className="w-full max-w-[1440px]">
					<NavBar />
				</div>
			</div>
			<div
				className="w-full mx-auto max-w-[1440px]"
				style={{ minHeight: "100vh" }}
			>
				{children}
			</div>
			<Footer />
		</>
	);
};

export default CommonLayout;
