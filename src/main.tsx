
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize MSW only in development
if (process.env.NODE_ENV === 'development') {
  import('./mocks/browser').then(({ worker }) => {
    worker.start({
      onUnhandledRequest: 'bypass', // Allows real network requests for non-mocked routes
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
