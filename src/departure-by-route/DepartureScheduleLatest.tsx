import { components } from '../../nextrip.types';
import { DepartureScheduleRow } from './DepartureScheduleRow';

type Departures = components['schemas']['Departure'][];

interface DepartureScheduleLatestProps {
	departures?: Departures;
}

function DepartureScheduleLatest({ departures = [] }: DepartureScheduleLatestProps) {
	const latestDepartures = departures.length >= 3 ? departures.slice(0, 3) : departures;

	return (
		<>
			{latestDepartures?.length === 0 && (
				<tr>
					<td colSpan={3}>No departures at this times</td>
				</tr>
			)}
			{latestDepartures?.map((departure) => (
				<DepartureScheduleRow key={departure.trip_id} departure={departure} />
			))}
		</>
	);
}

export { DepartureScheduleLatest };
