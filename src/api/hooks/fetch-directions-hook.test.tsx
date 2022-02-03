import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen } from '../../test-utils';

import { useFetchDirections } from './fetch-directions-hook';
import { fireEvent, waitFor } from '@testing-library/react';

const server = setupServer(
	rest.get('/directions/routeId', (_req, res, ctx) => {
		return res(ctx.json([]));
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function TestComponent() {
	const [message, setMessage] = React.useState<string>('loading');
	const fetchDirections = useFetchDirections();

	const doFetch = async () => {
		try {
			await fetchDirections('routeId');
			setMessage('ready');
		} catch (error) {
			setMessage('error');
		}
	};

	return (
		<>
			<button onClick={doFetch}>Start</button>
			<div role="message">{message}</div>
		</>
	);
}

test('useFetchDirections', async () => {
	render(<TestComponent />);

	expect(screen.getByRole('message')).toHaveTextContent('loading');

	fireEvent.click(screen.getByText('Start'));

	await waitFor(() => {
		expect(screen.getByRole('message')).toHaveTextContent('ready');
	});
});

test('handles server error', async () => {
	server.use(
		rest.get('/directions/routeId', (_req, res, ctx) => {
			return res(ctx.status(500));
		})
	);

	render(<TestComponent />);

	expect(screen.getByRole('message')).toHaveTextContent('loading');

	fireEvent.click(screen.getByText('Start'));

	await waitFor(() => {
		expect(screen.getByRole('message')).toHaveTextContent('error');
	});
});
