import { Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Login } from "./components/login/Login";
import { Dashboard } from "./layout/Dashboard";
import { AuthProvider } from "./auth/AuthContext";
import { AuthRouter } from "./auth/AuthRouter";

function App() {
  return (
    <>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <AuthRouter>
                  <Dashboard />
                </AuthRouter>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  );
}

export default App;
