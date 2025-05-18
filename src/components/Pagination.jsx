import { memo } from 'react';

const Pagination = ({ paginationInfo, onPageChange }) => {
	const { currentPage, totalPages, hasPreviousPage, hasNextPage } =
		paginationInfo;

	// Generate array of page numbers to display
	const getPageNumbers = () => {
		const pages = [];

		// Always show first page
		pages.push(1);

		// Show ellipsis if needed
		if (currentPage > 3) {
			pages.push('ellipsis1');
		}

		// Show current page and neighbors
		for (
			let i = Math.max(2, currentPage - 1);
			i <= Math.min(totalPages - 1, currentPage + 1);
			i++
		) {
			if (!pages.includes(i)) {
				pages.push(i);
			}
		}

		// Show ellipsis if needed
		if (currentPage < totalPages - 2) {
			pages.push('ellipsis2');
		}

		// Always show last page if there's more than one page
		if (totalPages > 1 && !pages.includes(totalPages)) {
			pages.push(totalPages);
		}

		return pages;
	};

	return (
		<div className="flex space-x-2">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={!hasPreviousPage}
				className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
			>
				<i className="fas fa-chevron-left"></i>
			</button>

			<div className="flex space-x-1">
				{getPageNumbers().map((page, index) => {
					if (page === 'ellipsis1' || page === 'ellipsis2') {
						return (
							<span key={page} className="px-3 py-1 text-sm">
								...
							</span>
						);
					}

					return (
						<button
							key={`page-${page}`}
							onClick={() => onPageChange(page)}
							className={`px-3 py-1 border rounded-md text-sm ${
								currentPage === page
									? 'bg-blue-500 text-white border-blue-500'
									: ''
							}`}
						>
							{page}
						</button>
					);
				})}
			</div>

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={!hasNextPage}
				className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
			>
				<i className="fas fa-chevron-right"></i>
			</button>
		</div>
	);
};

export default memo(Pagination);
