import './App.css';
import Login from './views/Login';
import Register from './views/Register';
import BudgetList from './views/Budgets/BudgetList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from './services/useToken';

function App() {

  const { token, setToken, removeToken } = useToken();

  if (!token) {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Login setToken={setToken} />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
    );
  };

  return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<BudgetList removeToken={removeToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/budgetList" element={<BudgetList removeToken={removeToken} />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
