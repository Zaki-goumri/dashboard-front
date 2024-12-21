
"use client"
import ReservationsPage from '@/components/resarvationsComponent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReservationsPage/>
  </QueryClientProvider>
);

export default App;