// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import API from "../api";


// export default function Login() {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         email: "",
//         password: ""
//     });

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();

//     //     const res = await API.post(
//     //         "/auth/login",
//     //         form
//     //     );

//     //     // ✅ SAVE HERE
//     //     localStorage.setItem("token", res.data.token);
//     //     // localStorage.setItem("role", res.data.user.role);
//     //     localStorage.setItem("user", JSON.stringify(res.data.user));


//     //     alert("Login Successful");
//     //     navigate("/students");
//     // };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await API.post("/auth/login", form);

//             // 🔥 Save full user object
//             localStorage.setItem("token", res.data.token);
//             localStorage.setItem("role", res.data.user.role);
//             localStorage.setItem("user", JSON.stringify(res.data.user));

//             console.log("SAVED USER:", res.data.user);

//             alert("Login Successful");
//             navigate("/students");

//         } catch (error) {
//             console.log(error.response?.data);
//             alert(error.response?.data?.message || "Login Failed");
//         }
//     };


//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">

//             <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

//                 <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
//                     Welcome Back
//                 </h2>

//                 <form onSubmit={handleSubmit} className="space-y-4">

//                     <input
//                         className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                         placeholder="Email"
//                         onChange={e =>
//                             setForm({ ...form, email: e.target.value })
//                         }
//                     />

//                     <input
//                         type="password"
//                         className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                         placeholder="Password"
//                         onChange={e =>
//                             setForm({ ...form, password: e.target.value })
//                         }
//                     />

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
//                     >
//                         Login
//                     </button>

//                 </form>

//             </div>
//         </div>
//     );
// }




import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api";


export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", form);

            // 🔥 Save full user object
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            console.log("SAVED USER:", res.data.user);

            alert("Login Successful");
            navigate("/students");

        } catch (error) {
            console.log(error.response?.data);
            alert(error.response?.data?.message || "Login Failed");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-100 px-4">

            <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">

                {/* HEADER */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Welcome Back 👋
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                        Login to continue to your dashboard
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* EMAIL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            placeholder="Enter your email"
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
                            placeholder="Enter your password"
                            onChange={e =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />
                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Login
                    </button>

                </form>

            </div>
        </div>
    );

}
