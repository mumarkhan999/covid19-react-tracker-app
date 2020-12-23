import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider} from "react-query";
import Main from "./components/Main";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Main />
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
}
