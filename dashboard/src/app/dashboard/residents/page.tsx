"use client"
import ResidentsPage from '@/components/residents';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ResidentsPage />
  </QueryClientProvider>
);

export default App;