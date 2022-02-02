import { useLocation } from 'react-router-dom';
import URLPattern from 'url-pattern';
import { DepartureTypeSelector } from '../components';

import { DepartureSchedule } from './DepartureSchedule';
import { SelectDirection } from './SelectDirection';
import { SelectRoute } from './SelectRoute';
import { SelectStop } from './SelectStop';

function DepartureByRoute() {
	const location = useLocation();
	const pattern = new URLPattern('/by-route(/)(:routeId)(/)(:directionId)(/)(:placeCode)');
	const { routeId, directionId, placeCode } = pattern.match(location.pathname);

	return (
		<>
			<h1 className="font-bold text-2xl text-slate-600 mb-4 text-center">Real-time Departures</h1>
			<DepartureTypeSelector />
			<form data-testid="byRouteForm">
				<SelectRoute
					defaultValue={routeId}
					renderNext={(routeId: string) => (
						<SelectDirection
							defaultValue={directionId}
							routeId={routeId}
							renderNext={(directionId: number) => (
								<SelectStop
									defaultValue={placeCode}
									routeId={routeId}
									directionId={directionId}
									renderNext={(placeCode) => (
										<DepartureSchedule routeId={routeId} directionId={directionId} placeCode={placeCode} />
									)}
								/>
							)}
						/>
					)}
				/>
			</form>
		</>
	);
}

export { DepartureByRoute };
