// import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// import API from "../api";

// export default function StudentDetails({ studentId }) {

//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     if (!studentId) return;

//     API.get(`/students/${studentId}/details`)
//       .then(res => setStudent(res.data))
//       .catch(err => console.log(err));

//   }, [studentId]);



//   if (!student)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500 text-lg">Loading...</p>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-3xl mx-auto space-y-6">

//         {/* Student Info Card */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-bold text-blue-600 mb-4">
//             {student.name}
//           </h2>

//           <div className="space-y-2 text-gray-700">
//             <p><span className="font-medium">Email:</span> {student.email}</p>
//             <p><span className="font-medium">Age:</span> {student.age}</p>
//             <p><span className="font-medium">City:</span> {student.city}</p>
//           </div>
//         </div>

//         {/* Courses Card */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h3 className="text-xl font-semibold mb-4">
//             Enrolled Courses
//           </h3>

//           {student.courses.length === 0 ? (
//             <p className="text-gray-500">No Courses Enrolled</p>
//           ) : (
//             <div className="space-y-4">
//               {student.courses.map((item, index) => (
//                 <div
//                   key={item._id || index}
//                   className="border rounded-lg p-4 hover:bg-gray-50 transition"
//                 >
//                   <p className="font-semibold text-lg">
//                     {item.course?.title}
//                   </p>

//                   <p className="text-gray-600">
//                     Duration: {item.course?.duration} months
//                   </p>

//                   <p className="text-green-600 font-medium">
//                     ₹{item.course?.fees}
//                   </p>

//                   <p className="text-sm text-gray-400 mt-2">
//                     Enrolled On:{" "}
//                     {new Date(item.enrolledAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}


//         </div>

//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
import API from "../api";

export default function StudentDetails({ studentId }) {

  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (!studentId) return;

    API.get(`/students/${studentId}/details`)
      .then(res => setStudent(res.data))
      .catch(err => console.log(err));

  }, [studentId]);



  if (!student)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* STUDENT INFO CARD */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">

          <div className="flex items-center justify-between border-b pb-6 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {student.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Student Profile
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-gray-700">
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-semibold text-gray-800">
                {student.email}
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Age</p>
              <p className="font-semibold text-gray-800">
                {student.age}
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">City</p>
              <p className="font-semibold text-gray-800">
                {student.city}
              </p>
            </div>
          </div>

        </div>

        {/* COURSES CARD */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">

          <h3 className="text-2xl font-semibold text-gray-800 mb-8">
            Enrolled Courses
          </h3>

          {student.courses.length === 0 ? (
            <div className="bg-gray-50 p-6 rounded-2xl text-center text-gray-500">
              No courses enrolled yet 📚
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {student.courses.map((item, index) => (
                <div
                  key={item._id || index}
                  className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <p className="font-semibold text-lg text-gray-800 mb-2">
                    {item.course?.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    Duration:
                    <span className="ml-1 font-medium text-gray-700">
                      {item.course?.duration} months
                    </span>
                  </p>

                  <p className="mt-2 text-green-600 font-semibold">
                    ₹{item.course?.fees}
                  </p>

                  <p className="text-xs text-gray-400 mt-4">
                    Enrolled On:{" "}
                    {new Date(item.enrolledAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );

}


