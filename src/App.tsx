import { Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Login } from "./components/login/Login";
import { Dashboard } from "./layout/Dashboard";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
