import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
} from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import HomePage from './pages/HomePage'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

const App = () => (
  <Routes>
    <Route
      path="/"
      element={<HomePage />}
    />
    <Route
      path="*"
      element={<Navigate to={'/'} />}
    />
  </Routes>
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
