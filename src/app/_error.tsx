import React from "react";

const ErrorPage = ({ statusCode }: any) => {
	return (
		<div className="container mx-auto px-4 py-10">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-red-600 mb-4">
					Oops! Something went wrong.
				</h1>
				<p className="text-lg text-gray-700 mb-4">
					{statusCode
						? `An error ${statusCode} occurred on server`
						: "An error occurred on client"}
				</p>
				<p className="text-lg text-gray-700">
					Please try refreshing the page or contact support if the
					problem persists.
				</p>
			</div>
		</div>
	);
};

ErrorPage.getInitialProps = ({ res, err }: any) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default ErrorPage;
