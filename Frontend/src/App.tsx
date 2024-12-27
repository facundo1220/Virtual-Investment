import { AppProvider } from "./context/AppContextProvider";
import AppNavigation from "./routes/AppNavigation";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AppProvider>
      <AppNavigation />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
