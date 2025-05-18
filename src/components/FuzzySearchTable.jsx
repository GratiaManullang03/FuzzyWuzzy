import { useMemo, useState } from 'react';
import SearchInput from './SearchInput';
import TableRow from './TableRow';
import Pagination from './Pagination';
import useFuzzySearch from '../hooks/useFuzzySearch';

const FuzzySearchTable = ({ data, initialTolerancePercent = 60 }) => {
	const [tolerancePercent, setTolerancePercent] = useState(
		initialTolerancePercent
	);

	const {
		paginatedData,
		paginationInfo,
		globalSearchValue,
		setGlobalSearchValue,
		columnSearchValues,
		handleColumnSearchChange,
		setCurrentPage,
	} = useFuzzySearch(data, 10, tolerancePercent);

	// Create object with all search terms for highlighting
	const searchTerms = useMemo(
		() => ({
			global: globalSearchValue,
			...columnSearchValues,
		}),
		[globalSearchValue, columnSearchValues]
	);

	return (
		<div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
			<div className="p-6">
				{/* Tolerance Slider */}
				<div className="mb-6">
					<label
						htmlFor="tolerance"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Search Tolerance: {tolerancePercent}%
					</label>
					<input
						id="tolerance"
						type="range"
						min="0"
						max="100"
						value={tolerancePercent}
						onChange={(e) => setTolerancePercent(Number(e.target.value))}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
					/>
					<p className="text-xs text-gray-500 mt-1">
						Higher tolerance will match more results with spelling variations
						(e.g., "mikale" will match "Michael" at higher tolerance)
					</p>
				</div>

				{/* Search and Results Count Row */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
					<div className="w-full md:w-1/2">
						<label
							htmlFor="global-search"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Global Search
						</label>
						<SearchInput
							id="global-search"
							placeholder="Search across all columns... Try typing 'mikale' to find 'Michael'"
							value={globalSearchValue}
							onChange={setGlobalSearchValue}
							isGlobal={true}
						/>
					</div>
					<div className="flex items-center">
						<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
							<span>{paginationInfo.totalItems}</span> results
						</span>
					</div>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									<div className="search-container">
										<SearchInput
											placeholder="Search ID..."
											value={columnSearchValues.id}
											onChange={(value) =>
												handleColumnSearchChange('id', value)
											}
										/>
									</div>
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									<div className="search-container">
										<SearchInput
											placeholder="Search Name..."
											value={columnSearchValues.name}
											onChange={(value) =>
												handleColumnSearchChange('name', value)
											}
										/>
									</div>
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									<div className="search-container">
										<SearchInput
											placeholder="Search Department..."
											value={columnSearchValues.department}
											onChange={(value) =>
												handleColumnSearchChange('department', value)
											}
										/>
									</div>
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									<div className="search-container">
										<SearchInput
											placeholder="Search Position..."
											value={columnSearchValues.position}
											onChange={(value) =>
												handleColumnSearchChange('position', value)
											}
										/>
									</div>
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									<div className="search-container">
										<SearchInput
											placeholder="Search Email..."
											value={columnSearchValues.email}
											onChange={(value) =>
												handleColumnSearchChange('email', value)
											}
										/>
									</div>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{paginatedData.length === 0 ? (
								<tr>
									<td
										colSpan={5}
										className="px-6 py-4 text-center text-gray-500"
									>
										No matching records found
									</td>
								</tr>
							) : (
								paginatedData.map((employee) => (
									<TableRow
										key={employee.id}
										employee={employee}
										searchTerms={searchTerms}
										tolerancePercent={tolerancePercent}
									/>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				<div className="flex items-center justify-between mt-4 px-2">
					<div className="text-sm text-gray-500">
						Showing <span>{paginationInfo.showingFrom}</span> to{' '}
						<span>{paginationInfo.showingTo}</span> of{' '}
						<span>{paginationInfo.totalItems}</span> entries
					</div>

					<Pagination
						paginationInfo={paginationInfo}
						onPageChange={setCurrentPage}
					/>
				</div>
			</div>
		</div>
	);
};

export default FuzzySearchTable;
