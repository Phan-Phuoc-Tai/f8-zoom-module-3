import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import LoginPage from "./pages/LoginPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import { Toaster } from "sonner";
import VerifyEmailTokenPage from "./pages/VerifyEmailTokenPage";
import AuthMiddleware from "./middlewares/AuthMiddleware";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email">
          <Route index element={<VerifyEmailPage />} />
          <Route path=":token" element={<VerifyEmailTokenPage />} />
        </Route>
        <Route element={<AuthMiddleware />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
          </Route>
        </Route>
      </Routes>
      <Toaster position={"top-right"} richColors={true} />
    </>
  );
}
