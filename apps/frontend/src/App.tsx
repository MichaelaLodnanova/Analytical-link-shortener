import { Router } from './router';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import './index.css';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
