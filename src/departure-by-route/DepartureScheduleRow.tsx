import { FiTarget } from 'react-icons/fi';
import { components } from '../../nextrip.types';

type Departure = components['schemas']['Departure'];

interface DepartureScheduleRowProps {
	departure: Departure;
}

function DepartureScheduleRow({ departure }: DepartureScheduleRowProps) {
	return (
		<>
			<tr className="transition-opacity duration-150 ease-in-out opacity-100">
				<td className="border-b border-slate-300 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
					{departure.route_short_name}
				</td>
				<td className="border-b border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
					{departure.description}
				</td>
				<td className="border-b border-slate-300 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400 text-right">
					{departure.actual && <FiTarget className="inline-block animate-ping mr-2 text-blue-900" />}{' '}
					{departure.departure_text}
				</td>
			</tr>
		</>
	);
}

export { DepartureScheduleRow };
