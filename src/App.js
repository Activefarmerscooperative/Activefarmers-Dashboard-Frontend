import './App.css';
import RoutingPage from './routes/RoutingPage';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer limit={3} />
      <RoutingPage />
    </div>
  );
}

export default App;
