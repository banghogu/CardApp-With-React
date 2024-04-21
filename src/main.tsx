import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Global } from '@emotion/react';
import globalStyles from './styles/globalStyles.ts';
import { AlertContextProvider } from './contexts/AlertContext.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Provider } from 'react-redux';
import { persistor, store } from './store/index.js';
import { PersistGate } from 'redux-persist/integration/react';
import AuthGuard from './components/auth/AuthGuard.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Global styles={globalStyles} />
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AlertContextProvider>
            <AuthGuard>
              <App />
            </AuthGuard>
          </AlertContextProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </>
);
