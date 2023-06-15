import { Router } from './router';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />;
    </QueryClientProvider>
  );
}

export default App;
