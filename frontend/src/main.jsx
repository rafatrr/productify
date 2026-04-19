import { StrictMode } from 'react'
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter} from 'react-router'
import {QueryClient,  QueryClientProvider,} from '@tanstack/react-query';
import { LanguageProvider } from "./context/LanguageContext";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}


// Create a client
const queryClient = new QueryClient()



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </QueryClientProvider>
        </BrowserRouter>
     </ClerkProvider>
  </StrictMode>,
)
