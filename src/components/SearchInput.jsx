import { memo } from 'react';

const SearchInput = ({
	id,
	placeholder,
	value,
	onChange,
	className = '',
	isGlobal = false,
}) => {
	return (
		<div className={`relative ${isGlobal ? 'w-full' : ''}`}>
			<input
				type="text"
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={`${className} ${
					isGlobal
						? 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
						: 'w-full text-xs border-0 bg-transparent focus:ring-0 focus:outline-none'
				}`}
			/>
			{isGlobal && (
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<i className="fas fa-search text-gray-400"></i>
				</div>
			)}
		</div>
	);
};

export default memo(SearchInput);
