import * as React from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { useQuery } from 'react-query';
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

	// Fetch departure schedule and poll every 10 seconds for updates
	const { isLoading, error, data } = useQuery<ScheduleResponse, Error>(
		['directions', routeId, directionId, placeCode],
		async () => {
			return fetchSchedule(routeId, directionId, placeCode);
		},
		{ refetchInterval: 10_000 }
	);

	if (error) {
		handleError(error);
	}

	const toggleExpanded = () => {
		setIsExpanded((current) => !current);
	};

	/**
	 * 1. Display the nearest departures
	 *  a. "No departures at this time" if no departures available
	 *  b. First 3 if >= 3
	 * 2. Display departure expander
	 *  a. No expander if <=3 departures
	 *  b. Show expander if >=3 departures
	 */

	if (isLoading) {
		return <p>Loading</p>;
	}

	const departureCount = data?.departures?.length ?? 0;
	const ExpandIcon = isExpanded ? FiMinusCircle : FiPlusCircle;

	return (
		<>
			<div className="bg-gray-100">
				<div className="relative rounded-xl overflow-auto">
					<div className="shadow-sm overflow-hidden">
						<div className="flex pl-8 py-4">
							<div className="flex-grow w-1/2 font-bold text-slate-600 text-xl">{data?.stops?.[0].description}</div>
							<div className=" pr-8 text-right">Stop #: {data?.stops?.[0].stop_id}</div>
						</div>
						<table className="border-collapse table-auto w-full text-sm">
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
								<button onClick={toggleExpanded} className="px-8 py-4">
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
