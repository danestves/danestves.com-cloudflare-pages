// Dependencies
import * as React from 'react';

export interface ClientStyleContextData {
  reset: () => void;
  sheet: string;
}

const ClientStyleContext = React.createContext<ClientStyleContextData>({
  reset: () => {},
  sheet: '',
});

export { ClientStyleContext };
