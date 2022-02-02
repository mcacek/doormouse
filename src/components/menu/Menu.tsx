import * as React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface MenuProps {
	label: string;
	children: React.ReactNode;
}

function Menu({ label, children }: MenuProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	const toggleMenu = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsOpen((current) => !current);
	}, []);

	const Indicator = isOpen ? FiChevronUp : FiChevronDown;

	return (
		<>
			<div className="text-left">
				<button className="uppercase" onClick={toggleMenu}>
					{label} <Indicator className="inline-block" />
				</button>
				{isOpen && <ul className="absolute bg-white px-4 w-40 right-0">{children}</ul>}
			</div>
		</>
	);
}

export { Menu };
