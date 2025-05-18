// Fungsi untuk menghitung jarak Levenshtein
export function levenshteinDistance(a, b) {
	if (a.length === 0) return b.length;
	if (b.length === 0) return a.length;

	const matrix = [];

	// Inisialisasi matriks
	for (let i = 0; i <= b.length; i++) {
		matrix[i] = [i];
	}
	for (let j = 0; j <= a.length; j++) {
		matrix[0][j] = j;
	}

	// Isi matriks
	for (let i = 1; i <= b.length; i++) {
		for (let j = 1; j <= a.length; j++) {
			const cost = a[j - 1] === b[i - 1] ? 0 : 1;
			matrix[i][j] = Math.min(
				matrix[i - 1][j] + 1, // deletion
				matrix[i][j - 1] + 1, // insertion
				matrix[i - 1][j - 1] + cost // substitution
			);
		}
	}

	return matrix[b.length][a.length];
}

// Menghitung persentase kemiripan
export function similarity(a, b) {
	if (!a || !b) return 0;

	// Normalize strings: remove extra spaces, convert to lowercase
	const strA = a.toString().toLowerCase().trim().replace(/\s+/g, ' ');
	const strB = b.toString().toLowerCase().trim().replace(/\s+/g, ' ');

	const distance = levenshteinDistance(strA, strB);
	const maxLength = Math.max(strA.length, strB.length);

	if (maxLength === 0) return 100; // Both strings are empty

	return (1 - distance / maxLength) * 100;
}
