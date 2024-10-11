import AppRouter from './routes/AppRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; 



function App() {
  return (
    <div className="bg-white text-primary dark:bg-[#2C2C2A] dark:text-white min-h-screen">
      <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App
