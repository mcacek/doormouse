import * as React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import ky from 'ky';

import { ApiProvider } from './api/providers/api-provider/api-provider';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const apiClient = ky.extend({
	prefixUrl: 'http://localhost',
});

const Providers: React.FC = ({ children }) => {
	return (
		<ApiProvider apiClient={apiClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ApiProvider>
	);
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
	render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };
