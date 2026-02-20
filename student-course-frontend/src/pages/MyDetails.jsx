// import { useEffect, useState } from "react";
// import API from "../api";

// export default function MyDetails() {
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     API.get("/students/me")
//       .then(res => setStudent(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   if (!student)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-semibold animate-pulse">
//           Loading...
//         </p>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">

//       <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">

//         {/* Header */}
//         <div className="border-b pb-4 mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">
//             🎓 {student.name}
//           </h2>
//           <p className="text-gray-500 mt-1">
//             Student Profile Information
//           </p>
//         </div>

//         {/* Student Info */}
//         <div className="grid md:grid-cols-2 gap-6 text-gray-700">

//           <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
//             <p className="text-sm text-gray-500">Email</p>
//             <p className="font-semibold">{student.email}</p>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
//             <p className="text-sm text-gray-500">Age</p>
//             <p className="font-semibold">{student.age}</p>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
//             <p className="text-sm text-gray-500">City</p>
//             <p className="font-semibold">{student.city}</p>
//           </div>

//         </div>

//         {/* Courses Section */}
//         <div className="mt-8">
//           <h3 className="text-xl font-bold mb-4 text-gray-800">
//             📚 Enrolled Courses
//           </h3>

//           {student.courses.length === 0 ? (
//             <p className="text-gray-500">
//               No courses enrolled yet.
//             </p>
//           ) : (
//             <div className="flex flex-wrap gap-3">
//               {student.courses.map((c, index) => (
//                 <span
//                   key={c._id || index}
//                   className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-full shadow-sm hover:bg-blue-200 transition"
//                 >
//                   {c.course?.title}
//                 </span>
//               ))}
//             </div>
//           )}

//         </div>

//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import API from "../api";

// export default function MyDetails() {
//   const [userProfile, setUserProfile] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user")) || {};

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       // 🔥 If student → get own student record
//       if (user.role === "student") {
//         const res = await API.get("/students/me");
//         setUserProfile(res.data);
//       }

//       // 🔥 If teacher or admin → get their user info
//       if (user.role === "teacher" || user.role === "admin") {
//         setUserProfile(user);

//         const studentsRes = await API.get("/students");
//         const coursesRes = await API.get("/courses");

//         setStudents(studentsRes.data);
//         setCourses(coursesRes.data);
//       }

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (!userProfile)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-semibold animate-pulse">
//           Loading...
//         </p>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

//         {/* HEADER */}
//         <div className="border-b pb-4 mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">
//             👤 {userProfile.name}
//           </h2>
//           <p className="text-gray-500 mt-1 capitalize">
//             Role: {user.role}
//           </p>
//         </div>

//         {/* BASIC INFO */}
//         <div className="grid md:grid-cols-2 gap-6 text-gray-700 mb-8">
//           <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
//             <p className="text-sm text-gray-500">Email</p>
//             <p className="font-semibold">{userProfile.email}</p>
//           </div>
//         </div>

//         {/* ================= STUDENT VIEW ================= */}
//         {user.role === "student" && (
//           <div>
//             <h3 className="text-xl font-bold mb-4 text-gray-800">
//               📚 Enrolled Courses
//             </h3>

//             {userProfile.courses?.length === 0 ? (
//               <p className="text-gray-500">
//                 No courses enrolled yet.
//               </p>
//             ) : (
//               <div className="flex flex-wrap gap-3">
//                 {userProfile.courses.map((c, index) => (
//                   <span
//                     key={index}
//                     className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-full shadow-sm"
//                   >
//                     {c.course?.title}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* ================= TEACHER VIEW ================= */}
//         {user.role === "teacher" && (
//           <>
//             {/* Created Courses */}
//             <div className="mb-8">
//               <h3 className="text-xl font-bold mb-4 text-gray-800">
//                 📘 My Courses
//               </h3>

//               {courses.length === 0 ? (
//                 <p>No courses created.</p>
//               ) : (
//                 <div className="grid md:grid-cols-2 gap-4">
//                   {courses.map(c => (
//                     <div
//                       key={c._id}
//                       className="border p-4 rounded-lg"
//                     >
//                       <p className="font-semibold">
//                         {c.title}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {c.duration} months
//                       </p>
//                       <p className="text-green-600">
//                         ₹{c.fees}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Created Students */}
//             <div>
//               <h3 className="text-xl font-bold mb-4 text-gray-800">
//                 🎓 My Students
//               </h3>

//               {students.length === 0 ? (
//                 <p>No students added.</p>
//               ) : (
//                 <div className="grid md:grid-cols-2 gap-4">
//                   {students.map(s => (
//                     <div
//                       key={s._id}
//                       className="border p-4 rounded-lg"
//                     >
//                       <p className="font-semibold">
//                         {s.name}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {s.email}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         {/* ================= ADMIN VIEW ================= */}
//         {user.role === "admin" && (
//           <>
//             {/* All Courses */}
//             <div className="mb-8">
//               <h3 className="text-xl font-bold mb-4 text-gray-800">
//                 📘 All Courses
//               </h3>

//               <div className="grid md:grid-cols-2 gap-4">
//                 {courses.map(c => (
//                   <div
//                     key={c._id}
//                     className="border p-4 rounded-lg"
//                   >
//                     <p className="font-semibold">
//                       {c.title}
//                     </p>
//                     <p>{c.duration} months</p>
//                     <p className="text-green-600">
//                       ₹{c.fees}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* All Students */}
//             <div>
//               <h3 className="text-xl font-bold mb-4 text-gray-800">
//                 🎓 All Students
//               </h3>

//               <div className="grid md:grid-cols-2 gap-4">
//                 {students.map(s => (
//                   <div
//                     key={s._id}
//                     className="border p-4 rounded-lg"
//                   >
//                     <p className="font-semibold">
//                       {s.name}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {s.email}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}

//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import API from "../api";

export default function MyDetails() {
  const [userProfile, setUserProfile] = useState(null);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // 🔥 If student → get own student record
      if (user.role === "student") {
        const res = await API.get("/students/me");
        setUserProfile(res.data);
      }

      // 🔥 If teacher or admin → get their user info
      if (user.role === "teacher" || user.role === "admin") {
        setUserProfile(user);

        const studentsRes = await API.get("/students");
        const coursesRes = await API.get("/courses");

        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  if (!userProfile)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-gray-100">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-6 mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">
              {userProfile.name}
            </h2>
            <p className="mt-2 inline-block px-4 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full capitalize">
              {user.role}
            </p>
          </div>
        </div>

        {/* BASIC INFO */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition">
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="font-semibold text-gray-800">
              {userProfile.email}
            </p>
          </div>
        </div>

        {/* ================= STUDENT VIEW ================= */}
        {user.role === "student" && (
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Enrolled Courses
            </h3>

            {userProfile.courses?.length === 0 ? (
              <div className="bg-gray-50 p-6 rounded-2xl text-gray-500">
                No courses enrolled yet.
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                {userProfile.courses.map((c, index) => (
                  <span
                    key={index}
                    className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-full shadow-md hover:scale-105 transition"
                  >
                    {c.course?.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TEACHER VIEW ================= */}
        {user.role === "teacher" && (
          <div className="space-y-12">

            {/* My Courses */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                My Courses
              </h3>

              {courses.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded-2xl text-gray-500">
                  No courses created.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map(c => (
                    <div
                      key={c._id}
                      className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                      <p className="font-semibold text-lg text-gray-800 mb-1">
                        {c.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {c.duration} months
                      </p>
                      <p className="mt-2 text-green-600 font-semibold">
                        ₹{c.fees}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* My Students */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                My Students
              </h3>

              {students.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded-2xl text-gray-500">
                  No students added.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {students.map(s => (
                    <div
                      key={s._id}
                      className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                      <p className="font-semibold text-gray-800">
                        {s.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {s.email}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= ADMIN VIEW ================= */}
        {user.role === "admin" && (
          <div className="space-y-12">

            {/* All Courses */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                All Courses
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(c => (
                  <div
                    key={c._id}
                    className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <p className="font-semibold text-gray-800">
                      {c.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {c.duration} months
                    </p>
                    <p className="mt-2 text-green-600 font-semibold">
                      ₹{c.fees}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* All Students */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                All Students
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map(s => (
                  <div
                    key={s._id}
                    className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <p className="font-semibold text-gray-800">
                      {s.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {s.email}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );

}
