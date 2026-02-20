import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import StudentPage from "./pages/StudentPage";
import CoursePage from "./pages/CoursePage";
import EnrollmentPage from "./pages/EnrollmentPage";
import StudentDetails from "./pages/StudentDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyDetails from "./pages/MyDetails";
import Admin from "./pages/Admin";
import EditStudent from "./pages/EditStudent";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">

        <Navbar />

        <main className="flex-grow p-6 bg-gray-100">
          <Routes>

            {/* FIRST PAGE = REGISTER */}
            <Route path="/" element={<Register />} />

            {/* THEN LOGIN */}
            <Route path="/login" element={<Login />} />

            {/* OTHER PAGES */}
            <Route path="/students" element={<StudentPage />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/enroll" element={<EnrollmentPage />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="/profile" element={<MyDetails />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/students/:id/edit" element={<EditStudent />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
