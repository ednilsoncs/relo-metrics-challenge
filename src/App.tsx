import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import AnalyzerPage from './pages/analyzer/analyzer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnalyzerPage />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
