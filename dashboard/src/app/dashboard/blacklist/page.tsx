
"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BlockListPage from '@/components/blackList';


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BlockListPage/>
  </QueryClientProvider>
);

export default App;