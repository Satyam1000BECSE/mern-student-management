// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// export default function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await API.post(
//       "/auth/register",
//       form
//     );

//     alert("Registered Successfully");
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">

//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

//         <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
//           Create Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           <input
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             placeholder="Name"
//             onChange={e =>
//               setForm({ ...form, name: e.target.value })
//             }
//           />

//           <input
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             placeholder="Email"
//             onChange={e =>
//               setForm({ ...form, email: e.target.value })
//             }
//           />

//           <input
//             type="password"
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             placeholder="Password"
//             onChange={e =>
//               setForm({ ...form, password: e.target.value })
//             }
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
//           >
//             Register
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// export default function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student" // default role
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/auth/register", form);

//       alert("Registered Successfully");
//       navigate("/login");

//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Registration Failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">

//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

//         <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
//           Create Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Name */}
//           <input
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             placeholder="Name"
//             value={form.name}
//             onChange={e =>
//               setForm({ ...form, name: e.target.value })
//             }
//           />

//           {/* Email */}
//           <input
//             type="email"
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             placeholder="Email"
//             value={form.email}
//             onChange={e =>
//               setForm({ ...form, email: e.target.value })
//             }
//           />

//           {/* Password */}
//           <input
//             type="password"
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             placeholder="Password"
//             value={form.password}
//             onChange={e =>
//               setForm({ ...form, password: e.target.value })
//             }
//           />

//           {/* Role Selection */}
//           <select
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             value={form.role}
//             onChange={e =>
//               setForm({ ...form, role: e.target.value })
//             }
//           >
//             <option value="student">Student</option>
//             <option value="teacher">Teacher</option>
//           </select>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
//           >
//             Register
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student" // default role
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      alert("Registered Successfully");
      navigate("/login");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-100 px-4 py-12">

      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Create Account 🚀
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Sign up to get started with your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <input
              className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter your full name"
              value={form.name}
              onChange={e =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter your email"
              value={form.email}
              onChange={e =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Create a password"
              value={form.password}
              onChange={e =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* ROLE SELECT */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Select Role
            </label>
            <select
              className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition cursor-pointer"
              value={form.role}
              onChange={e =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] active:scale-95 transition-all"
          >
            Register
          </button>

        </form>

      </div>
    </div>
  );

}

