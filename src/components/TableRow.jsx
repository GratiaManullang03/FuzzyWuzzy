import { memo } from 'react';
import { similarity } from '../utils/levenshtein';
import fuzzysort from 'fuzzysort';

const TableRow = ({ employee, searchTerms, tolerancePercent = 60 }) => {
	// Fungsi untuk menyoroti teks yang cocok dengan toleransi fuzzy
	const highlightMatches = (text, field) => {
		const globalSearchValue = searchTerms.global?.toLowerCase().trim() || '';
		const columnSearchValue = searchTerms[field]?.toLowerCase().trim() || '';

		const searchValue = globalSearchValue || columnSearchValue;

		if (!searchValue) return text;

		// String untuk ditampilkan
		const textStr = text.toString();
		const textLower = textStr.toLowerCase();
		const searchLower = searchValue.toLowerCase();

		// Kasus 1: Gunakan highlighting bawaan fuzzysort
		try {
			const options = {
				allowTypo: true,
				threshold: -1000 * (1 - tolerancePercent / 100),
			};
			const result = fuzzysort.single(searchValue, textStr, options);
			if (result) {
				// Gunakan highlighting bawaan fuzzysort
				const highlighted = fuzzysort.highlight(
					result,
					'<span class="highlight">',
					'</span>'
				);
				if (highlighted) {
					return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
				}
			}
		} catch (e) {
			console.warn('Fuzzysort highlighting failed:', e);
		}

		// Kasus 2: Jika teks mengandung pencarian (case insensitive)
		if (textLower.includes(searchLower)) {
			const parts = textStr.split(new RegExp(`(${searchValue})`, 'gi'));
			return parts.map((part, index) =>
				part.toLowerCase() === searchLower ? (
					<span key={index} className="highlight">
						{part}
					</span>
				) : (
					<span key={index}>{part}</span>
				)
			);
		}

		// Kasus 3: Gunakan algoritma Levenshtein untuk menemukan bagian terbaik
		// Pisahkan teks menjadi kata-kata dan coba semua kombinasi
		const words = textStr.split(/\s+/);
		let bestMatch = null;
		let bestScore = 0;

		// Coba setiap kata sebagai titik awal potensial
		for (let i = 0; i < words.length; i++) {
			// Coba panjang kata berurutan yang berbeda
			for (let j = 1; j <= words.length - i; j++) {
				const segment = words.slice(i, i + j).join(' ');
				const score = similarity(segment, searchValue);

				if (score > bestScore && score >= tolerancePercent) {
					bestScore = score;
					bestMatch = {
						start: i,
						end: i + j - 1,
						score,
					};
				}
			}
		}

		// Jika kita menemukan kecocokan yang baik, sorot itu
		if (bestMatch) {
			return (
				<>
					{words.slice(0, bestMatch.start).join(' ')}
					{bestMatch.start > 0 && ' '}
					<span className="highlight">
						{words.slice(bestMatch.start, bestMatch.end + 1).join(' ')}
					</span>
					{bestMatch.end < words.length - 1 && ' '}
					{words.slice(bestMatch.end + 1).join(' ')}
				</>
			);
		}

		// Jika tidak ada kecocokan yang baik, coba cari kemiripan per karakter
		// Ini membantu untuk kecocokan seperti 'mikale' untuk 'michael'
		// Kita akan mencari kecocokan kata tunggal terbaik
		let bestWordMatch = null;
		let bestWordScore = 0;

		words.forEach((word, index) => {
			const score = similarity(word, searchValue);
			if (score > bestWordScore && score >= tolerancePercent) {
				bestWordScore = score;
				bestWordMatch = {
					index,
					score,
				};
			}
		});

		if (bestWordMatch) {
			return (
				<>
					{words.slice(0, bestWordMatch.index).join(' ')}
					{bestWordMatch.index > 0 && ' '}
					<span className="highlight">{words[bestWordMatch.index]}</span>
					{bestWordMatch.index < words.length - 1 && ' '}
					{words.slice(bestWordMatch.index + 1).join(' ')}
				</>
			);
		}

		// Jika tidak ada kecocokan yang baik ditemukan, kembalikan teks asli
		return textStr;
	};

	return (
		<tr className="hover:bg-gray-50 fade-in">
			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
				{highlightMatches(employee.id, 'id')}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				{highlightMatches(employee.name, 'name')}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				{highlightMatches(employee.department, 'department')}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				{highlightMatches(employee.position, 'position')}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				{highlightMatches(employee.email, 'email')}
			</td>
		</tr>
	);
};

export default memo(TableRow);
