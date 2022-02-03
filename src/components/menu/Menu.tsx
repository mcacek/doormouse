import * as React from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface MenuProps {
	label: string;
}

function Menu({ label }: MenuProps) {
	const toggleMenu = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	}, []);

	return (
		<>
			<div className="text-left">
				<button className="uppercase" onClick={toggleMenu}>
					{label} <FiChevronDown className="inline-block" />
				</button>
			</div>
		</>
	);
}

export { Menu };
