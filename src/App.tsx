import { Routes, Route } from 'react-router-dom';
import Providers from './components/Providers';
import HomePage from './pages/HomePage';
import StockDetailPage from './pages/StockDetailPage';

export default function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stock/:symbol" element={<StockDetailPage />} />
      </Routes>
    </Providers>
  );
}
