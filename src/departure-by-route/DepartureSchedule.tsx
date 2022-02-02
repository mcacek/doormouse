import * as React from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { FiLoader, FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { components, paths } from '../../nextrip.types';
import { useFetchSchedule } from '../api';
import { DepartureScheduleExtended } from './DepartureScheduleExtended';
import { DepartureScheduleLatest } from './DepartureScheduleLatest';

type ScheduleResponse =
	paths['/nextripv2/{route_id}/{direction_id}/{place_code}']['get']['responses']['200']['content']['application/json'];
type Departures = components['schemas']['Departure'][];

interface ScheduleProps {
	routeId: string;
	directionId: number;
	placeCode: string;
}

function DepartureSchedule({ routeId, directionId, placeCode }: ScheduleProps) {
	const [isExpanded, setIsExpanded] = React.useState(false);
	const fetchSchedule = useFetchSchedule();
	const handleError = useErrorHandler();
	const navigate = useNavigate();
	const location = useLocation();

	// Fetch departure schedule and poll every 10 seconds for updates
	const { isLoading, error, data } = useQuery<ScheduleResponse, Error>(
		['directions', routeId, directionId, placeCode],
		async () => {
			return fetchSchedule(routeId, directionId, placeCode);
		},
		{ refetchInterval: Number(process.env.REACT_APP_API_DEPARTURE_POLLING) }
	);

	if (error) {
		handleError(error);
	}

	const toggleExpanded = () => {
		setIsExpanded((current) => !current);
	};

	React.useEffect(() => {
		const targetPath = `/by-route/${routeId}/${directionId}/${placeCode}`;
		if (location.pathname !== targetPath) {
			navigate(targetPath, { replace: false });
		}
		// Disable eslint error to prevent routinng loop. This should be resolved by restructuring routing.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [routeId, directionId, placeCode]);

	if (isLoading) {
		return (
			<div className="text-center p-4">
				<FiLoader
					className="animate-ping text-blue-700 inline-block"
					size={30}
					data-testid="departureScheduleSpinner"
				/>
			</div>
		);
	}

	const departureCount = data?.departures?.length ?? 0;
	const ExpandIcon = isExpanded ? FiMinusCircle : FiPlusCircle;

	return (
		<>
			<div className="bg-gray-100" data-testid="departureSchedules">
				<div className="relative rounded-xl overflow-auto">
					<div className="shadow-sm overflow-hidden">
						<div className="flex pl-8 py-4">
							<div className="flex-grow w-1/2 font-bold text-slate-600 text-xl" data-testid="stopDescription">
								{data?.stops?.[0].description}
							</div>
							<div className=" pr-8 text-right" data-testid="stopNumber">
								Stop #: {data?.stops?.[0].stop_id}
							</div>
						</div>
						<table className="border-collapse table-auto w-full text-sm" data-testid="departuresTable">
							<thead>
								<tr className="bg-yellow-400">
									<th className="border-b dark:border-slate-600 p-4 pl-8 pb-3 text-slate-700 dark:text-slate-200 text-left uppercase font-bold">
										Route
									</th>
									<th className="border-b dark:border-slate-600 p-4 pb-3 text-slate-700 dark:text-slate-200 text-left uppercase font-bold">
										Destination
									</th>
									<th className="border-b dark:border-slate-600 p-4 pr-8 pb-3 text-slate-700 dark:text-slate-200 text-right uppercase font-bold">
										Departs
									</th>
								</tr>
							</thead>
							<tbody className="dark:bg-slate-800">
								<DepartureScheduleLatest departures={data?.departures as Departures} />
								{isExpanded && <DepartureScheduleExtended departures={data?.departures as Departures} />}
							</tbody>
						</table>

						{departureCount > 3 && (
							<div>
								<button type="button" onClick={toggleExpanded} className="px-8 py-4" data-testid="expandDepartures">
									<ExpandIcon className="text-blue-500 inline-block" /> Departures
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export { DepartureSchedule };
