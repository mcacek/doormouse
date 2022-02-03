import * as React from 'react';

interface MenuItemProps {
	children: React.ReactNode;
}

function MenuItem({ children }: MenuItemProps) {
	return <li>{children}</li>;
}

export { MenuItem };
