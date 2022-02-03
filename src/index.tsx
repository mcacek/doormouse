import React from 'react';
import ReactDOM from 'react-dom';
import ky from 'ky';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApiProvider } from './api/providers/api-provider/api-provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

const apiClient = ky.extend({
	prefixUrl: process.env.REACT_APP_API_PREFIX_URL,
});

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ApiProvider apiClient={apiClient}>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</ApiProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
