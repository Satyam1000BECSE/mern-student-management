// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api";

// export default function EditStudent() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     age: "",
//     city: ""
//   });

//   const [loading, setLoading] = useState(false);

//   // 🔥 Fetch Student Data
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await API.get(`/students/${id}`);
//         setForm({
//           name: res.data.name,
//           email: res.data.email,
//           age: res.data.age,
//           city: res.data.city
//         });
//       } catch (err) {
//         console.log(err);
//         alert("Failed to load student");
//       }
//     };

//     fetchStudent();
//   }, [id]);

//   // 🔥 Handle Update
//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       await API.put(`/students/${id}`, form);

//       alert("Student updated successfully ✅");

//       navigate("/"); // Redirect back to student page

//     } catch (err) {
//       console.log(err);
//       alert("Update failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">

//         <h2 className="text-2xl font-bold mb-6 text-blue-600">
//           Update Student Details
//         </h2>

//         <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-4">

//           <input
//             className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Name"
//             value={form.name}
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//           />

//           <input
//             className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//           />

//           <input
//             className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Age"
//             value={form.age}
//             onChange={(e) =>
//               setForm({ ...form, age: e.target.value })
//             }
//           />

//           <input
//             className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="City"
//             value={form.city}
//             onChange={(e) =>
//               setForm({ ...form, city: e.target.value })
//             }
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//           >
//             {loading ? "Updating..." : "Update Student"}
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    city: ""
  });

  const [loading, setLoading] = useState(false);

  // 🔥 Fetch Student Data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await API.get(`/students/${id}`);
        setForm({
          name: res.data.name,
          email: res.data.email,
          age: res.data.age,
          city: res.data.city
        });
      } catch (err) {
        console.log(err);
        alert("Failed to load student");
      }
    };

    fetchStudent();
  }, [id]);

  // 🔥 Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.put(`/students/${id}`, form);

      alert("Student updated successfully ✅");

      navigate("/"); // Redirect back to student page

    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-3xl bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Update Student Details
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Edit student information below
          </p>
        </div>

        <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-6">

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <input
              className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter full name"
              value={form.name}
              onChange={(e) =>
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
              className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter email address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* AGE */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Age
            </label>
            <input
              type="number"
              className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter age"
              value={form.age}
              onChange={(e) =>
                setForm({ ...form, age: e.target.value })
              }
            />
          </div>

          {/* CITY */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              City
            </label>
            <input
              className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter city"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
            />
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Student"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );

}
