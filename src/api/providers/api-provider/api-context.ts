import * as React from 'react';
import { ApiContextValue } from './types';

const ApiContext = React.createContext<ApiContextValue | undefined>(undefined);

export { ApiContext };
