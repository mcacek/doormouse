import { ErrorBoundary } from 'react-error-boundary';
import { ApplicationRoutes } from '../ApplicationRoutes';
import { DepartureTypeSelector } from '../components';
import { UnexpectedErrorHandler } from '../error-boundary';
import { Hero } from './Hero';
import { TopNavigation } from './TopNavigation';

function ApplicationShell() {
	return (
		<>
			<TopNavigation />
			<Hero />
			<ErrorBoundary FallbackComponent={UnexpectedErrorHandler} onReset={() => {}}>
				<div className="flex justify-center">
					<div className="w-full lg:w-1/2 p-4">
						<h1 className="font-bold text-2xl text-slate-600 mb-4 text-center">Real-time Departures</h1>

						<DepartureTypeSelector />
						<ApplicationRoutes />
					</div>
				</div>
			</ErrorBoundary>
		</>
	);
}
export { ApplicationShell };
