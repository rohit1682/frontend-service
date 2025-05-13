import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { ToastProvider } from "./hooks/useToast";
import { ToastContainer } from "./components/Toast/ToastContainer";

const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
