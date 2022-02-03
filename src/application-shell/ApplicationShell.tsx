import { ErrorBoundary } from 'react-error-boundary';
import { ApplicationRoutes } from '../ApplicationRoutes';
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
					<div className="w-full mb-12 lg:w-1/2 p-4">
						<ApplicationRoutes />
					</div>
				</div>
			</ErrorBoundary>
		</>
	);
}
export { ApplicationShell };
