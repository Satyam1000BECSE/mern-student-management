// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
  




//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">

//         <h1 className="text-xl font-bold">StudentApp</h1>

//         <div className="space-x-4">

//           <Link to="/students" className="hover:underline">
//             Students
//           </Link>

//           <Link to="/courses" className="hover:underline">
//             Courses
//           </Link>

//           <Link to="/enroll" className="hover:underline">
//             Enroll
//           </Link>
         
//           <Link to="/profile">Profile</Link>


//           {role === "admin" && (
//             <Link to="/admin" className="hover:underline">Admin</Link>
//           )}

//           {!token ? (
//             <>
//               <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded">
//                 Login
//               </Link>

//               <Link to="/" className="bg-green-500 px-3 py-1 rounded">
//                 Register
//               </Link>
//             </>
//           ) : (
//             <button
//               onClick={logout}
//               className="bg-red-500 px-3 py-1 rounded"
//             >
//               Logout
//             </button>
//           )}

//         </div>
//       </div>
//     </nav>
//   );
// }



import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  




  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
  <nav className="bg-white border-b border-gray-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-700 tracking-wide">
        StudentApp
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6 text-gray-600 font-medium">

        <Link
          to="/students"
          className="hover:text-blue-600 transition duration-200"
        >
          Students
        </Link>

        <Link
          to="/courses"
          className="hover:text-blue-600 transition duration-200"
        >
          Courses
        </Link>

        <Link
          to="/enroll"
          className="hover:text-blue-600 transition duration-200"
        >
          Enroll
        </Link>

        <Link
          to="/profile"
          className="hover:text-blue-600 transition duration-200"
        >
          Profile
        </Link>

        {role === "admin" && (
          <Link
            to="/admin"
            className="hover:text-blue-600 transition duration-200"
          >
            Admin
          </Link>
        )}

        {/* Auth Buttons */}
        {!token ? (
          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
            >
              Login
            </Link>

            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:scale-105 active:scale-95 transition"
            >
              Register
            </Link>

          </div>
        ) : (
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white shadow-md hover:bg-red-600 hover:scale-105 active:scale-95 transition"
          >
            Logout
          </button>
        )}

      </div>
    </div>
  </nav>
);

}
