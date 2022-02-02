// import { FiChevronDown } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '../components';

function TopNavigation() {
	return (
		<>
			<div className="flex pl-20 py-4">
				<div className="flex-grow w-1/2">
					<img alt="logo" src="https://www.metrotransit.org/img/MetroTransitLogo.svg" />
				</div>
				<div className=" pr-2 text-right">
					<Menu label="menu">
						<MenuItem>
							<Link to="/by-route">By Route</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/by-stop">By Stop #</Link>
						</MenuItem>
					</Menu>
				</div>
			</div>
		</>
	);
}

export { TopNavigation };
