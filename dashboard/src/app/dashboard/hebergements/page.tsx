"use client"
import HebergementsPage from '@/components/hebergement';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HebergementsPage />
  </QueryClientProvider>
);

export default App;