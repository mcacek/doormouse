import { Menu } from '../components';

function TopNavigation() {
	return (
		<>
			<div className="flex pl-3 py-3">
				<div className="flex-grow">
					<img alt="logo" src="https://www.metrotransit.org/img/MetroTransitLogo.svg" height="1em" />
				</div>
				<div className=" pr-2 text-right mt-2">
					<Menu label="menu" />
				</div>
			</div>
		</>
	);
}

export { TopNavigation };
