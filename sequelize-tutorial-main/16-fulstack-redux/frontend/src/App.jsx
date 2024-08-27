import "bootstrap/dist/css/bootstrap.min.css";
import RoutePage from "./auth/RoutePage";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  return (
    <div>
      <RoutePage />
    </div>
  );
}

export default App;
