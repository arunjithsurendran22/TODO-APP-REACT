
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./ReduxToolkit/store"; // Import your Redux store
import Home from "./pages/Home";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/" element={<UserLogin />} />
        </Routes>
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
