"use client"
import EmployantPage from "@/components/employants";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App =() =>{
    return (
        <div>
        <QueryClientProvider client={queryClient}>
        <EmployantPage/>
        </QueryClientProvider>
        </div>
    )
}
export default App;