const Input = ({ marb,icon: Icon, ...props }) => {
	return (
		<div className={`relative mb-${marb || 6}`}>
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<Icon className='size-5 text-violet-700' />
			</div>
			<input
			
				{...props}
				className='w-full pl-10 pr-3 py-2 font-normal text-violet-950  bg-opacity-50 rounded-lg border border-violet-900 focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600 placeholder-violet-950 placeholder:opacity-55 transition duration-200'
			/>
		</div>
	);
};
export default Input;