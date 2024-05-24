// import React from "react";

// interface PaginationProps {
// 	currentPage: number;
// 	totalPages: number;
// 	onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
// 	currentPage,
// 	totalPages,
// 	onPageChange,
// }) => {
// 	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

// 	return (
// 		<div className="flex justify-center items-center space-x-2 mt-4">
// 			<button
// 				onClick={() => onPageChange(currentPage - 1)}
// 				disabled={currentPage === 1}
// 				className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
// 			>
// 				Previous
// 			</button>
// 			{pageNumbers.map((page) => (
// 				<button
// 					key={page}
// 					onClick={() => onPageChange(page)}
// 					className={`px-4 py-2 rounded ${
// 						currentPage === page
// 							? "bg-blue-500 text-white"
// 							: "bg-gray-200"
// 					}`}
// 				>
// 					{page}
// 				</button>
// 			))}
// 			<button
// 				onClick={() => onPageChange(currentPage + 1)}
// 				disabled={currentPage === totalPages}
// 				className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
// 			>
// 				Next
// 			</button>
// 		</div>
// 	);
// };

// export default Pagination;

import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const getVisiblePageNumbers = () => {
		const visiblePages = [];
		let startPage = Math.max(1, currentPage - 2);
		let endPage = Math.min(totalPages, currentPage + 2);

		if (currentPage <= 3) {
			endPage = Math.min(totalPages, 5);
		} else if (currentPage > totalPages - 3) {
			startPage = Math.max(1, totalPages - 4);
		}

		for (let i = startPage; i <= endPage; i++) {
			visiblePages.push(i);
		}

		return visiblePages;
	};

	const visiblePages = getVisiblePageNumbers();

	return (
		<div className="flex justify-center items-center space-x-2 mt-4">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 disabled:opacity-50"
			>
				<FaChevronLeft />
			</button>
			{currentPage > 3 && (
				<>
					<button
						onClick={() => onPageChange(1)}
						className={`px-4 py-2 rounded-full ${
							currentPage === 1
								? "bg-green-600 text-white"
								: "bg-gray-300 hover:bg-gray-400 text-gray-700"
						}`}
					>
						1
					</button>
					{currentPage > 4 && <span className="px-3 py-2">...</span>}
				</>
			)}
			{visiblePages.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`px-4 py-2 rounded-full ${
						currentPage === page
							? "bg-green-600 text-white"
							: "bg-gray-300 hover:bg-gray-400 text-gray-700"
					}`}
				>
					{page}
				</button>
			))}
			{currentPage < totalPages - 2 && (
				<>
					{currentPage < totalPages - 3 && (
						<span className="px-3 py-2">...</span>
					)}
					<button
						onClick={() => onPageChange(totalPages)}
						className={`px-4 py-2 rounded-full ${
							currentPage === totalPages
								? "bg-blue-500 text-white"
								: "bg-gray-300 hover:bg-gray-400 text-gray-700"
						}`}
					>
						{totalPages}
					</button>
				</>
			)}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 disabled:opacity-50"
			>
				<FaChevronRight />
			</button>
		</div>
	);
};

export default Pagination;
