// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import API from "../api";

// export default function StudentPage() {
//   const [students, setStudents] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     age: "",
//     city: ""
//   });

//   const fetchStudents = async () => {
//     const res = await API.get("/students");
//     setStudents(res.data);
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await API.post("/students", form);
//     fetchStudents();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <div className="max-w-4xl mx-auto">

//         <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
//           Student Management
//         </h1>

//         {/* Add Student */}
//         <div className="bg-white p-6 rounded-xl shadow-md mb-10">
//           <h2 className="text-xl font-semibold mb-4">Add Student</h2>

//           <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

//             <input
//               className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Name"
//               onChange={e => setForm({ ...form, name: e.target.value })}
//             />

//             <input
//               className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Email"
//               onChange={e => setForm({ ...form, email: e.target.value })}
//             />

//             <input
//               className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Age"
//               onChange={e => setForm({ ...form, age: e.target.value })}
//             />

//             <input
//               className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="City"
//               onChange={e => setForm({ ...form, city: e.target.value })}
//             />

//             <button
//               type="submit"
//               className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//             >
//               Add Student
//             </button>
//           </form>
//         </div>

//         {/* Students List */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-xl font-semibold mb-4">Students List</h3>

//           <div className="grid md:grid-cols-2 gap-4">
//             {students.map(s => (
//               <div
//                 key={s._id}
//                 className="p-4 border rounded-lg hover:bg-blue-50 hover:shadow transition"
//               >
//                 <Link to={`/students/${s._id}`}>
//                   <p className="font-medium text-lg">{s.name}</p>
//                   <p className="text-gray-500 text-sm">{s.email}</p>
//                 </Link>

//                 {/* 🔥 Update Navigation */}
//                 <div className="mt-3 text-right">
//                   <Link
//                     to={`/students/${s._id}/edit`}
//                     className="text-blue-600 text-sm font-medium hover:underline"
//                   >
//                     Update Details →
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import API from "../api";

// export default function StudentPage() {
//   const [students, setStudents] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     age: "",
//     city: ""
//   });

//   const token = localStorage.getItem("token");

//   const fetchStudents = async () => {
//     try {
//       const res = await API.get("/students", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setStudents(res.data);
//     } catch (error) {
//       console.log(error);
//       alert("Unauthorized or failed to fetch students");
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/students", form, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setForm({
//         name: "",
//         email: "",
//         age: "",
//         city: ""
//       });

//       fetchStudents();
//     } catch (error) {
//       console.log(error);
//       alert("Failed to add student");
//     }
//   };

//   // 🔥 DELETE FEATURE
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;

//     try {
//       await API.delete(`/students/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       fetchStudents();
//     } catch (error) {
//       console.log(error);
//       alert("Delete failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <div className="max-w-4xl mx-auto">

//         <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
//           Student Management
//         </h1>

//         {/* Add Student */}
//         <div className="bg-white p-6 rounded-xl shadow-md mb-10">
//           <h2 className="text-xl font-semibold mb-4">Add Student</h2>

//           <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

//             <input
//               className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Name"
//               value={form.name}
//               onChange={e => setForm({ ...form, name: e.target.value })}
//             />

//             <input
//               className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Email"
//               value={form.email}
//               onChange={e => setForm({ ...form, email: e.target.value })}
//             />

//             <input
//               className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Age"
//               value={form.age}
//               onChange={e => setForm({ ...form, age: e.target.value })}
//             />

//             <input
//               className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="City"
//               value={form.city}
//               onChange={e => setForm({ ...form, city: e.target.value })}
//             />

//             <button
//               type="submit"
//               className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//             >
//               Add Student
//             </button>
//           </form>
//         </div>

//         {/* Students List */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-xl font-semibold mb-4">Students List</h3>

//           {students.length === 0 ? (
//             <p className="text-gray-500">
//               No students found for your account.
//             </p>
//           ) : (
//             <div className="grid md:grid-cols-2 gap-4">
//               {students.map(s => (
//                 <div
//                   key={s._id}
//                   className="p-4 border rounded-lg hover:bg-blue-50 hover:shadow transition"
//                 >
//                   <Link to={`/students/${s._id}`}>
//                     <p className="font-medium text-lg">{s.name}</p>
//                     <p className="text-gray-500 text-sm">{s.email}</p>
//                   </Link>

//                   {/* 🔥 Actions */}
//                   <div className="mt-3 flex justify-between items-center">

//                     <Link
//                       to={`/students/${s._id}/edit`}
//                       className="text-blue-600 text-sm font-medium hover:underline"
//                     >
//                       Update →
//                     </Link>

//                     <button
//                       onClick={() => handleDelete(s._id)}
//                       className="text-red-600 text-sm font-medium hover:underline"
//                     >
//                       Delete
//                     </button>

//                   </div>

//                 </div>
//               ))}
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import API from "../api";

// export default function StudentPage() {
//   const [students, setStudents] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     age: "",
//     city: ""
//   });

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user")) || {};

//   // 🔥 Fetch Students
//   const fetchStudents = async () => {
//     try {
//       const res = await API.get("/students", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       // 🔥 ROLE BASED FILTER
//       let filteredStudents = res.data;

//       if (user.role === "teacher") {
//         filteredStudents = res.data.filter(
//           s => s.user === user.id
//         );
//       }

//       if (user.role === "student") {
//         filteredStudents = res.data.filter(
//           s => s.user === user.id
//         );
//       }

//       // 🔥 ADMIN sees all (no filter)
//       setStudents(filteredStudents);

//     } catch (error) {
//       console.log(error);
//       alert("Unauthorized or failed to fetch students");
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   // 🔥 Add Student
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/students", form, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setForm({
//         name: "",
//         email: "",
//         age: "",
//         city: ""
//       });

//       fetchStudents();
//     } catch (error) {
//       console.log(error);
//       alert("Failed to add student");
//     }
//   };

//   // 🔥 Delete Student
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;

//     try {
//       await API.delete(`/students/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       fetchStudents();
//     } catch (error) {
//       console.log(error);
//       alert("Delete failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <div className="max-w-4xl mx-auto">

//         <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
//           Student Management
//         </h1>

//         {/* 🔥 Only Admin & Teacher Can Add Student */}
//         {(user.role === "admin" || user.role === "teacher") && (
//           <div className="bg-white p-6 rounded-xl shadow-md mb-10">
//             <h2 className="text-xl font-semibold mb-4">Add Student</h2>

//             <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

//               <input
//                 className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Name"
//                 value={form.name}
//                 onChange={e => setForm({ ...form, name: e.target.value })}
//               />

//               <input
//                 className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={e => setForm({ ...form, email: e.target.value })}
//               />

//               <input
//                 className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Age"
//                 value={form.age}
//                 onChange={e => setForm({ ...form, age: e.target.value })}
//               />

//               <input
//                 className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="City"
//                 value={form.city}
//                 onChange={e => setForm({ ...form, city: e.target.value })}
//               />

//               <button
//                 type="submit"
//                 className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//               >
//                 Add Student
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Students List */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-xl font-semibold mb-4">Students List</h3>

//           {students.length === 0 ? (
//             <p className="text-gray-500">
//               No students found.
//             </p>
//           ) : (
//             <div className="grid md:grid-cols-2 gap-4">
//               {students.map(s => (
//                 <div
//                   key={s._id}
//                   className="p-4 border rounded-lg hover:bg-blue-50 hover:shadow transition"
//                 >
//                   <Link to={`/students/${s._id}`}>
//                     <p className="font-medium text-lg">{s.name}</p>
//                     <p className="text-gray-500 text-sm">{s.email}</p>
//                   </Link>

//                   {/* 🔥 Only Admin & Owner Can Delete */}
//                   {(user.role === "admin" || s.user === user.id) && (
//                     <div className="mt-3 flex justify-between items-center">

//                       <Link
//                         to={`/students/${s._id}/edit`}
//                         className="text-blue-600 text-sm font-medium hover:underline"
//                       >
//                         Update →
//                       </Link>

//                       <button
//                         onClick={() => handleDelete(s._id)}
//                         className="text-red-600 text-sm font-medium hover:underline"
//                       >
//                         Delete
//                       </button>

//                     </div>
//                   )}

//                 </div>
//               ))}
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function StudentPage() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    city: ""
  });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // 🔥 Fetch Students
  const fetchStudents = async () => {
    try {
      const res = await API.get("/students", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // 🔥 ROLE BASED FILTER
      let filteredStudents = res.data;

      if (user.role === "teacher") {
        filteredStudents = res.data.filter(
          s => s.user === user.id
        );
      }

      if (user.role === "student") {
        filteredStudents = res.data.filter(
          s => s.user === user.id
        );
      }

      // 🔥 ADMIN sees all (no filter)
      setStudents(filteredStudents);

    } catch (error) {
      console.log(error);
      alert("Unauthorized or failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔥 Add Student
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/students", form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setForm({
        name: "",
        email: "",
        age: "",
        city: ""
      });

      fetchStudents();
    } catch (error) {
      console.log(error);
      alert("Failed to add student");
    }
  };

  // 🔥 Delete Student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      await API.delete(`/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchStudents();
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">
            Student Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage students easily with role-based access
          </p>
        </div>

        {/* ADD STUDENT CARD */}
        {(user.role === "admin" || user.role === "teacher") && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-12 transition hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Add New Student
            </h2>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

              <input
                className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Full Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Email Address"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />

              <input
                type="number"
                className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Age"
                value={form.age}
                onChange={e => setForm({ ...form, age: e.target.value })}
              />

              <input
                className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="City"
                value={form.city}
                onChange={e => setForm({ ...form, city: e.target.value })}
              />

              <button
                type="submit"
                className="md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-medium tracking-wide hover:scale-[1.02] active:scale-95 transition-all shadow-md"
              >
                Add Student
              </button>
            </form>
          </div>
        )}

        {/* STUDENT LIST */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-semibold mb-8 text-gray-700">
            Students List
          </h3>

          {students.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-lg">
                No students found 📭
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map(s => (
                <div
                  key={s._id}
                  className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <Link to={`/students/${s._id}`}>
                    <h4 className="font-semibold text-lg text-gray-800 mb-1">
                      {s.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {s.email}
                    </p>
                  </Link>

                  {(user.role === "admin" || s.user === user.id) && (
                    <div className="mt-4 flex justify-between items-center text-sm">

                      <Link
                        to={`/students/${s._id}/edit`}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        Update
                      </Link>

                      <button
                        onClick={() => handleDelete(s._id)}
                        className="text-red-600 font-medium hover:underline"
                      >
                        Delete
                      </button>

                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}