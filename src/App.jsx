import FuzzySearchTable from './components/FuzzySearchTable';
import { employees } from './data/employees';

function App() {
	// Tambahkan beberapa data dengan nama serupa untuk menguji kemiripan fuzzy
	const enhancedEmployees = [
		...employees,
		{
			id: 26,
			name: 'Mike Johnson',
			department: 'Engineering',
			position: 'Tech Lead',
			email: 'mike.johnson@example.com',
		},
		{
			id: 27,
			name: 'Michelle Johnson',
			department: 'Marketing',
			position: 'Creative Director',
			email: 'michelle.johnson@example.com',
		},
		{
			id: 28,
			name: 'Mikel Jonson',
			department: 'Engineering',
			position: 'Full Stack Developer',
			email: 'mikel.jonson@example.com',
		},
	];

	return (
		<div className="bg-gray-50 min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-gray-800 mb-2">
							Fuzzy Search Table
						</h1>
						<p className="text-gray-600">
							Search across all columns with fuzzy matching and 60% tolerance
						</p>
					</div>

					<FuzzySearchTable
						data={enhancedEmployees}
						initialTolerancePercent={60}
					/>

					<div className="text-center text-sm text-gray-500 mt-4">
						<p>
							Fuzzy search powered by Fuzzysort.js and Levenshtein distance
							algorithm.
						</p>
						<p className="mt-1">Try these examples:</p>
						<ul className="mt-2 space-y-1">
							<li>
								<strong>"mikale"</strong> will find "Michael", "Mike", "Mikel"
								(fuzzy matching)
							</li>
							<li>
								<strong>"jonson"</strong> will find "Johnson" (tolerant of
								spelling variations)
							</li>
							<li>
								<strong>"engenering"</strong> will find "Engineering" (tolerant
								of typos)
							</li>
							<li>
								<strong>"dev"</strong> will find "Developer" (partial match)
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
