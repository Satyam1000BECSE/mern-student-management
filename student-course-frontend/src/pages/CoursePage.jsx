// import { useState, useEffect } from "react";
// import API from "../api";

// export default function CoursePage() {
//   const [courses, setCourses] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     duration: "",
//     fees: ""
//   });

//   const [editId, setEditId] = useState(null);

//   const fetchCourses = async () => {
//     const res = await API.get("/courses");
//     setCourses(res.data);
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editId) {
//       // 🔥 Update Course
//       await API.put(`/courses/${editId}`, form);
//       setEditId(null);
//     } else {
//       // 🔥 Add Course
//       await API.post("/courses", form);
//     }

//     setForm({
//       title: "",
//       duration: "",
//       fees: ""
//     });

//     fetchCourses();
//   };

//   const handleEdit = (course) => {
//     setForm({
//       title: course.title,
//       duration: course.duration,
//       fees: course.fees
//     });
//     setEditId(course._id);
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure?");
//     if (!confirmDelete) return;

//     await API.delete(`/courses/${id}`);
//     fetchCourses();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <div className="max-w-4xl mx-auto space-y-8">

//         <h1 className="text-3xl font-bold text-center text-blue-600">
//           Course Management
//         </h1>

//         {/* Add / Update Course */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h2 className="text-xl font-semibold mb-4">
//             {editId ? "Update Course" : "Add Course"}
//           </h2>

//           <form
//             onSubmit={handleSubmit}
//             className="grid md:grid-cols-3 gap-4"
//           >
//             <input
//               className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//               placeholder="Title"
//               value={form.title}
//               onChange={e => setForm({ ...form, title: e.target.value })}
//             />

//             <input
//               type="number"
//               className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//               placeholder="Duration (months)"
//               value={form.duration}
//               onChange={e => setForm({ ...form, duration: e.target.value })}
//             />

//             <input
//               type="number"
//               className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//               placeholder="Fees"
//               value={form.fees}
//               onChange={e => setForm({ ...form, fees: e.target.value })}
//             />

//             <button
//               type="submit"
//               className="md:col-span-3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//             >
//               {editId ? "Update Course" : "Add Course"}
//             </button>
//           </form>
//         </div>

//         {/* Course List */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-xl font-semibold mb-4">
//             Course List
//           </h3>

//           <div className="grid md:grid-cols-2 gap-4">
//             {courses.map(c => (
//               <div
//                 key={c._id}
//                 className="border p-4 rounded-lg hover:bg-blue-50 transition"
//               >
//                 <p className="font-semibold text-lg">
//                   {c.title}
//                 </p>

//                 <p className="text-gray-600">
//                   Duration: {c.duration} months
//                 </p>

//                 <p className="text-green-600 font-medium">
//                   ₹{c.fees}
//                 </p>

//                 {/* 🔥 Edit & Delete Buttons */}
//                 <div className="flex justify-end gap-3 mt-4">

//                   <button
//                     onClick={() => handleEdit(c)}
//                     className="text-blue-600 text-sm font-medium hover:underline"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(c._id)}
//                     className="text-red-600 text-sm font-medium hover:underline"
//                   >
//                     Delete
//                   </button>

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
// import API from "../api";

// export default function CoursePage() {
//   const [courses, setCourses] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     duration: "",
//     fees: ""
//   });
//   const [editId, setEditId] = useState(null);

//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const userId = user?.id || user?._id; // 🔥 handle both cases

//   // 🔥 Fetch Courses
//   const fetchCourses = async () => {
//     try {
//       const res = await API.get("/courses");
//       setCourses(res.data);
//     } catch (err) {
//       console.log("FETCH ERROR:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // 🔥 Add / Update Course
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editId) {
//         await API.put(`/courses/${editId}`, form);
//         setEditId(null);
//       } else {
//         await API.post("/courses", form);
//       }

//       setForm({
//         title: "",
//         duration: "",
//         fees: ""
//       });

//       fetchCourses();
//     } catch (error) {
//       console.log("FULL ERROR:", error);
//       console.log("SERVER RESPONSE:", error.response?.data);
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   const handleEdit = (course) => {
//     setForm({
//       title: course.title,
//       duration: course.duration,
//       fees: course.fees
//     });
//     setEditId(course._id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     await API.delete(`/courses/${id}`);
//     fetchCourses();
//   };

//   // 🔥 Filter Courses Based on Role
//   const filteredCourses = courses.filter((c) => {
//     if (user.role === "admin") return true;

//     if (user.role === "teacher") {
//       return c.user?.toString() === userId?.toString();
//     }

//     if (user.role === "student") {
//       return true; // student sees all
//     }

//     return false;
//   });

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto space-y-8">

//         <h1 className="text-3xl font-bold text-center text-blue-600">
//           Course Management
//         </h1>

//         {/* 🔥 Only Teacher & Admin Can Add */}
//         {(user.role === "admin" || user.role === "teacher") && (
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h2 className="text-xl font-semibold mb-4">
//               {editId ? "Update Course" : "Add Course"}
//             </h2>

//             <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">

//               <input
//                 className="border p-3 rounded-lg"
//                 placeholder="Title"
//                 value={form.title}
//                 onChange={e => setForm({ ...form, title: e.target.value })}
//               />

//               <input
//                 type="number"
//                 className="border p-3 rounded-lg"
//                 placeholder="Duration (months)"
//                 value={form.duration}
//                 onChange={e => setForm({ ...form, duration: e.target.value })}
//               />

//               <input
//                 type="number"
//                 className="border p-3 rounded-lg"
//                 placeholder="Fees"
//                 value={form.fees}
//                 onChange={e => setForm({ ...form, fees: e.target.value })}
//               />

//               <button
//                 type="submit"
//                 className="md:col-span-3 bg-blue-600 text-white py-3 rounded-lg"
//               >
//                 {editId ? "Update Course" : "Add Course"}
//               </button>
//             </form>
//           </div>
//         )}

//         {/* 🔥 Course List */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-xl font-semibold mb-4">
//             Course List
//           </h3>

//           {filteredCourses.length === 0 && (
//             <p className="text-gray-500">No courses found.</p>
//           )}

//           <div className="grid md:grid-cols-2 gap-4">
//             {filteredCourses.map((c) => (
//               <div
//                 key={c._id}
//                 className="border p-4 rounded-lg hover:bg-blue-50 transition"
//               >
//                 <p className="font-semibold text-lg">
//                   {c.title}
//                 </p>

//                 <p className="text-gray-600">
//                   Duration: {c.duration} months
//                 </p>

//                 <p className="text-green-600 font-medium">
//                   ₹{c.fees}
//                 </p>

//                 {/* 🔥 Only Admin or Owner Teacher */}
//                 {(user.role === "admin" ||
//                   (user.role === "teacher" &&
//                     c.user?.toString() === userId?.toString())) && (
//                   <div className="flex justify-end gap-3 mt-4">
//                     <button
//                       onClick={() => handleEdit(c)}
//                       className="text-blue-600 text-sm font-medium hover:underline"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => handleDelete(c._id)}
//                       className="text-red-600 text-sm font-medium hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import API from "../api";

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    duration: "",
    fees: ""
  });
  const [editId, setEditId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user?.id || user?._id; // 🔥 handle both cases

  // 🔥 Fetch Courses
  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // 🔥 Add / Update Course
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/courses/${editId}`, form);
        setEditId(null);
      } else {
        await API.post("/courses", form);
      }

      setForm({
        title: "",
        duration: "",
        fees: ""
      });

      fetchCourses();
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("SERVER RESPONSE:", error.response?.data);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (course) => {
    setForm({
      title: course.title,
      duration: course.duration,
      fees: course.fees
    });
    setEditId(course._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await API.delete(`/courses/${id}`);
    fetchCourses();
  };

  // 🔥 Filter Courses Based on Role
  const filteredCourses = courses.filter((c) => {
    if (user.role === "admin") return true;

    if (user.role === "teacher") {
      return c.user?.toString() === userId?.toString();
    }

    if (user.role === "student") {
      return true; // student sees all
    }

    return false;
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4">

      <div className="max-w-5xl mx-auto space-y-12">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-700">
            Course Management
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Manage courses with role-based access control
          </p>
        </div>

        {/* ADD / UPDATE COURSE */}
        {(user.role === "admin" || user.role === "teacher") && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition hover:shadow-xl">

            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              {editId ? "Update Course" : "Add New Course"}
            </h2>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6">

              <input
                className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Course Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />

              <input
                type="number"
                className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Duration (Months)"
                value={form.duration}
                onChange={e => setForm({ ...form, duration: e.target.value })}
              />

              <input
                type="number"
                className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Fees (₹)"
                value={form.fees}
                onChange={e => setForm({ ...form, fees: e.target.value })}
              />

              <button
                type="submit"
                className="md:col-span-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-medium tracking-wide hover:scale-[1.02] active:scale-95 transition-all shadow-md"
              >
                {editId ? "Update Course" : "Add Course"}
              </button>

            </form>
          </div>
        )}

        {/* COURSE LIST */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

          <h3 className="text-2xl font-semibold mb-8 text-gray-700">
            Course List
          </h3>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No courses available 📚
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((c) => (
                <div
                  key={c._id}
                  className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">
                    {c.title}
                  </h4>

                  <p className="text-sm text-gray-500 mb-1">
                    Duration: <span className="font-medium text-gray-700">{c.duration} months</span>
                  </p>

                  <p className="text-green-600 font-semibold text-md">
                    ₹{c.fees}
                  </p>

                  {(user.role === "admin" ||
                    (user.role === "teacher" &&
                      c.user?.toString() === userId?.toString())) && (

                      <div className="flex justify-between items-center mt-5 text-sm">

                        <button
                          onClick={() => handleEdit(c)}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(c._id)}
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