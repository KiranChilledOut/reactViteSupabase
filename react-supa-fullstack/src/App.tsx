import PrivateLayout from "./layout/private-layout";
import PublicLayout from "./layout/public-layout";
import ForgotPassword from "./pages/forgot-password";
import HomePage from "./pages/home";
import Profile from "./pages/profile";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ResetPassword from "./pages/reset-password";
import ThemeProvider from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateLayout><HomePage /></PrivateLayout>} />
          <Route path="profile" element={<PrivateLayout><Profile/></PrivateLayout>} />
          <Route path="login" element={<PublicLayout><LoginPage /></PublicLayout>} />
          <Route path="register" element={<PublicLayout><RegisterPage /></PublicLayout>} />
          <Route path="forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />
          <Route path="reset-password" element={<PublicLayout><ResetPassword /></PublicLayout>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  )
}

export default App;