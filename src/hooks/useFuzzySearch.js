import { useState, useEffect } from 'react';
import fuzzysort from 'fuzzysort';
import { similarity } from '../utils/levenshtein';

// Custom hook untuk implementasi fuzzy search dengan toleransi 60%
const useFuzzySearch = (
	initialData,
	rowsPerPage = 10,
	tolerancePercent = 60
) => {
	const [filteredData, setFilteredData] = useState(initialData);
	const [currentPage, setCurrentPage] = useState(1);
	const [globalSearchValue, setGlobalSearchValue] = useState('');
	const [columnSearchValues, setColumnSearchValues] = useState({
		id: '',
		name: '',
		department: '',
		position: '',
		email: '',
	});

	// Konversi tolerancePercent ke threshold fuzzysort
	// Fuzzysort menggunakan skor negatif dimana 0 adalah kecocokan sempurna dan nilai lebih rendah adalah kecocokan yang lebih buruk
	const getFuzzysortThreshold = (percent) => {
		// Memetakan 0-100% ke threshold fuzzysort yang sesuai
		// -1000 adalah kecocokan yang sangat buruk, -100 adalah kecocokan sedang
		return Math.round(-1000 * (1 - percent / 100));
	};

	// Opsi untuk fuzzysort
	const fuzzyOptions = {
		threshold: getFuzzysortThreshold(tolerancePercent),
		allowTypo: true, // Mengizinkan typo
		keys: null, // Kita hanya menggunakan single search
		limit: 50, // Batasi hasil
	};

	// Fungsi untuk memeriksa apakah string cocok dengan string lain dengan toleransi tertentu
	const isMatchWithTolerance = (search, target) => {
		if (!search || !target) return true;

		// Konversi ke lowercase untuk case-insensitivity
		const searchLower = search.toLowerCase().trim();
		const targetLower = target.toString().toLowerCase().trim();

		// Lewati pencarian kosong
		if (searchLower === '') return true;

		// Pemeriksaan langsung (menangani substring dengan baik)
		if (targetLower.includes(searchLower)) return true;

		// Pemeriksaan fuzzysort (menangani typo dan transposisi dengan baik)
		const fuzzysortResult = fuzzysort.single(
			searchLower,
			targetLower,
			fuzzyOptions
		);
		if (fuzzysortResult) return true;

		// Pemeriksaan jarak Levenshtein (menangani perbedaan yang lebih umum)
		const similarityScore = similarity(searchLower, targetLower);
		return similarityScore >= tolerancePercent;
	};

	// Terapkan filter setiap kali nilai pencarian berubah
	useEffect(() => {
		const applyFilters = () => {
			const filtered = initialData.filter((item) => {
				// Periksa pencarian global
				if (globalSearchValue) {
					const globalMatches = [
						isMatchWithTolerance(globalSearchValue, item.id.toString()),
						isMatchWithTolerance(globalSearchValue, item.name),
						isMatchWithTolerance(globalSearchValue, item.department),
						isMatchWithTolerance(globalSearchValue, item.position),
						isMatchWithTolerance(globalSearchValue, item.email),
					].some(Boolean);

					if (!globalMatches) return false;
				}

				// Periksa pencarian kolom
				for (const [field, value] of Object.entries(columnSearchValues)) {
					if (value && !isMatchWithTolerance(value, item[field])) {
						return false;
					}
				}

				return true;
			});

			setFilteredData(filtered);
			setCurrentPage(1); // Reset ke halaman pertama ketika filter berubah
		};

		applyFilters();
	}, [globalSearchValue, columnSearchValues, initialData, tolerancePercent]);

	// Dapatkan data terpaginasi
	const getPaginatedData = () => {
		const startIndex = (currentPage - 1) * rowsPerPage;
		const endIndex = startIndex + rowsPerPage;
		return filteredData.slice(startIndex, endIndex);
	};

	// Hitung info paginasi
	const paginationInfo = {
		totalItems: filteredData.length,
		totalPages: Math.ceil(filteredData.length / rowsPerPage),
		currentPage,
		showingFrom: Math.min(
			(currentPage - 1) * rowsPerPage + 1,
			filteredData.length
		),
		showingTo: Math.min(currentPage * rowsPerPage, filteredData.length),
		hasPreviousPage: currentPage > 1,
		hasNextPage: currentPage < Math.ceil(filteredData.length / rowsPerPage),
	};

	// Update nilai pencarian kolom
	const handleColumnSearchChange = (field, value) => {
		setColumnSearchValues((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return {
		filteredData,
		paginatedData: getPaginatedData(),
		paginationInfo,
		globalSearchValue,
		setGlobalSearchValue,
		columnSearchValues,
		handleColumnSearchChange,
		setCurrentPage,
		tolerancePercent,
	};
};

export default useFuzzySearch;
