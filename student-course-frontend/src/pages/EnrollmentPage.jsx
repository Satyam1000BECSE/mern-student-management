// import { useState, useEffect } from "react";
// import axios from "axios";
// import API from "../api";

// export default function EnrollmentPage() {
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [studentId, setStudentId] = useState("");
//   const [courseId, setCourseId] = useState("");

//   useEffect(() => {
//     API.get("/students")
//       .then(res => setStudents(res.data));

//     API.get("/courses")
//       .then(res => setCourses(res.data));
//   }, []);

//   const enroll = async () => {
//     if (!studentId || !courseId) {
//       alert("Please select both student and course");
//       return;
//     }

//     await API.post(
//       `/students/${studentId}/enroll/${courseId}`
//     );

//     alert("Enrolled Successfully");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

//       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">

//         <h2 className="text-2xl font-bold text-center text-blue-600">
//           Enroll Student
//         </h2>

//         {/* Student Select */}
//         <div>
//           <label className="block mb-2 font-medium text-gray-700">
//             Select Student
//           </label>
//           <select
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             onChange={e => setStudentId(e.target.value)}
//           >
//             <option value="">Choose a student</option>
//             {students.map(s => (
//               <option value={s._id} key={s._id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Course Select */}
//         <div>
//           <label className="block mb-2 font-medium text-gray-700">
//             Select Course
//           </label>
//           <select
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             onChange={e => setCourseId(e.target.value)}
//           >
//             <option value="">Choose a course</option>
//             {courses.map(c => (
//               <option value={c._id} key={c._id}>
//                 {c.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Button */}
//         <button
//           onClick={enroll}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
//         >
//           Enroll Now
//         </button>

//       </div>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import API from "../api";

// export default function EnrollmentPage() {
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [studentId, setStudentId] = useState("");
//   const [courseId, setCourseId] = useState("");
//   const [oldCourseId, setOldCourseId] = useState("");

//   useEffect(() => {
//     API.get("/students")
//       .then(res => setStudents(res.data));

//     API.get("/courses")
//       .then(res => setCourses(res.data));
//   }, []);

//   const enroll = async () => {
//     if (!studentId || !courseId) {
//       alert("Please select both student and course");
//       return;
//     }

//     await API.post(
//       `/students/${studentId}/enroll/${courseId}`
//     );

//     alert("Enrolled Successfully");
//   };

//   const unenroll = async () => {
//     if (!studentId || !courseId) {
//       alert("Select student and course to unenroll");
//       return;
//     }

//     await API.delete(
//       `/students/${studentId}/unenroll/${courseId}`
//     );

//     alert("Unenrolled Successfully");
//   };

//   const updateEnrollment = async () => {
//     if (!studentId || !oldCourseId || !courseId) {
//       alert("Select student, old course, and new course");
//       return;
//     }

//     await API.put(
//       `/students/${studentId}/update-enrollment/${oldCourseId}/${courseId}`
//     );

//     alert("Enrollment Updated Successfully");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

//       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">

//         <h2 className="text-2xl font-bold text-center text-blue-600">
//           Enroll Student
//         </h2>

//         {/* Student Select */}
//         <div>
//           <label className="block mb-2 font-medium text-gray-700">
//             Select Student
//           </label>
//           <select
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             onChange={e => setStudentId(e.target.value)}
//           >
//             <option value="">Choose a student</option>
//             {students.map(s => (
//               <option value={s._id} key={s._id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Old Course (For Update Only) */}
//         <div>
//           <label className="block mb-2 font-medium text-gray-700">
//             Select Old Course (For Update)
//           </label>
//           <select
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             onChange={e => setOldCourseId(e.target.value)}
//           >
//             <option value="">Choose old course</option>
//             {courses.map(c => (
//               <option value={c._id} key={c._id}>
//                 {c.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Course Select */}
//         <div>
//           <label className="block mb-2 font-medium text-gray-700">
//             Select Course
//           </label>
//           <select
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             onChange={e => setCourseId(e.target.value)}
//           >
//             <option value="">Choose a course</option>
//             {courses.map(c => (
//               <option value={c._id} key={c._id}>
//                 {c.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Buttons */}
//         <button
//           onClick={enroll}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
//         >
//           Enroll Now
//         </button>

//         <button
//           onClick={unenroll}
//           className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium"
//         >
//           Unenroll Course
//         </button>

//         <button
//           onClick={updateEnrollment}
//           className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
//         >
//           Update Enrollment
//         </button>

//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import API from "../api";

// export default function EnrollmentPage() {
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [studentId, setStudentId] = useState("");
//   const [courseId, setCourseId] = useState("");
//   const [oldCourseId, setOldCourseId] = useState("");

//   const user = JSON.parse(localStorage.getItem("user")) || {};

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const studentRes = await API.get("/students");
//         const courseRes = await API.get("/courses");

//         // 🔥 STUDENT ROLE
//         if (user.role === "student") {
//           const myStudent = studentRes.data.find(
//             s => s.user === user.id
//           );
//           setStudents(myStudent ? [myStudent] : []);
//           setCourses(courseRes.data); // student sees all courses

//           if (myStudent) {
//             setStudentId(myStudent._id); // auto select
//           }
//         }

//         // 🔥 TEACHER ROLE
//         else if (user.role === "teacher") {
//           const teacherStudents = studentRes.data.filter(
//             s => s.user === user.id
//           );
//           const teacherCourses = courseRes.data.filter(
//             c => c.user === user.id
//           );

//           setStudents(teacherStudents);
//           setCourses(teacherCourses);
//         }

//         // 🔥 ADMIN ROLE
//         else if (user.role === "admin") {
//           setStudents(studentRes.data);
//           setCourses(courseRes.data);
//         }

//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   // ================= ENROLL =================
//   const enroll = async () => {
//     if (!studentId || !courseId) {
//       alert("Please select both student and course");
//       return;
//     }

//     await API.post(
//       `/students/${studentId}/enroll/${courseId}`
//     );

//     alert("Enrolled Successfully");
//   };

//   // ================= UNENROLL =================
//   const unenroll = async () => {
//     if (!studentId || !courseId) {
//       alert("Select student and course to unenroll");
//       return;
//     }

//     await API.delete(
//       `/students/${studentId}/unenroll/${courseId}`
//     );

//     alert("Unenrolled Successfully");
//   };

//   // ================= UPDATE =================
//   const updateEnrollment = async () => {
//     if (!studentId || !oldCourseId || !courseId) {
//       alert("Select student, old course, and new course");
//       return;
//     }

//     await API.put(
//       `/students/${studentId}/update-enrollment/${oldCourseId}/${courseId}`
//     );

//     alert("Enrollment Updated Successfully");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

//       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">

//         <h2 className="text-2xl font-bold text-center text-blue-600">
//           Enroll Student
//         </h2>

//         {/* STUDENT SELECT */}
//         <div>
//           <label className="block mb-2 font-medium text-gray-700">
//             Select Student
//           </label>
//           <select
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             value={studentId}
//             disabled={user.role === "student"} // 🔥 student cannot change
//             onChange={e => setStudentId(e.target.value)}
//           >
//             <option value="">Choose a student</option>
//             {students.map(s => (
//               <option value={s._id} key={s._id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* OLD COURSE */}
//         <div>
//           <label className="block mb-2 font-medium text-gray-700">
//             Select Old Course (For Update)
//           </label>
//           <select
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             onChange={e => setOldCourseId(e.target.value)}
//           >
//             <option value="">Choose old course</option>
//             {courses.map(c => (
//               <option value={c._id} key={c._id}>
//                 {c.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* COURSE SELECT */}
//         <div>
//           <label className="block mb-2 font-medium text-gray-700">
//             Select Course
//           </label>
//           <select
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             onChange={e => setCourseId(e.target.value)}
//           >
//             <option value="">Choose a course</option>
//             {courses.map(c => (
//               <option value={c._id} key={c._id}>
//                 {c.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* BUTTONS */}
//         <button
//           onClick={enroll}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
//         >
//           Enroll Now
//         </button>

//         <button
//           onClick={unenroll}
//           className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium"
//         >
//           Unenroll Course
//         </button>

//         <button
//           onClick={updateEnrollment}
//           className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
//         >
//           Update Enrollment
//         </button>

//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import API from "../api";

export default function EnrollmentPage() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [oldCourseId, setOldCourseId] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentRes = await API.get("/students");
        const courseRes = await API.get("/courses");

        // 🔥 STUDENT ROLE
        if (user.role === "student") {
          const myStudent = studentRes.data.find(
            s => s.user === user.id
          );
          setStudents(myStudent ? [myStudent] : []);
          setCourses(courseRes.data); // student sees all courses

          if (myStudent) {
            setStudentId(myStudent._id); // auto select
          }
        }

        // 🔥 TEACHER ROLE
        else if (user.role === "teacher") {
          const teacherStudents = studentRes.data.filter(
            s => s.user === user.id
          );
          const teacherCourses = courseRes.data.filter(
            c => c.user === user.id
          );

          setStudents(teacherStudents);
          setCourses(teacherCourses);
        }

        // 🔥 ADMIN ROLE
        else if (user.role === "admin") {
          setStudents(studentRes.data);
          setCourses(courseRes.data);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // ================= ENROLL =================
  const enroll = async () => {
    if (!studentId || !courseId) {
      alert("Please select both student and course");
      return;
    }

    await API.post(
      `/students/${studentId}/enroll/${courseId}`
    );

    alert("Enrolled Successfully");
  };

  // ================= UNENROLL =================
  const unenroll = async () => {
    if (!studentId || !courseId) {
      alert("Select student and course to unenroll");
      return;
    }

    await API.delete(
      `/students/${studentId}/unenroll/${courseId}`
    );

    alert("Unenrolled Successfully");
  };

  // ================= UPDATE =================
  const updateEnrollment = async () => {
    if (!studentId || !oldCourseId || !courseId) {
      alert("Select student, old course, and new course");
      return;
    }

    await API.put(
      `/students/${studentId}/update-enrollment/${oldCourseId}/${courseId}`
    );

    alert("Enrollment Updated Successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex items-center justify-center px-4 py-12">

      <div className="bg-white w-full max-w-lg p-10 rounded-2xl shadow-2xl border border-gray-100 space-y-8">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-700">
            Enroll Student
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Manage student course enrollments easily
          </p>
        </div>

        {/* STUDENT SELECT */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Select Student
          </label>
          <select
            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            value={studentId}
            disabled={user.role === "student"}
            onChange={e => setStudentId(e.target.value)}
          >
            <option value="">Choose a student</option>
            {students.map(s => (
              <option value={s._id} key={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* OLD COURSE */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Select Old Course (For Update)
          </label>
          <select
            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            onChange={e => setOldCourseId(e.target.value)}
          >
            <option value="">Choose old course</option>
            {courses.map(c => (
              <option value={c._id} key={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* COURSE SELECT */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Select Course
          </label>
          <select
            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            onChange={e => setCourseId(e.target.value)}
          >
            <option value="">Choose a course</option>
            {courses.map(c => (
              <option value={c._id} key={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* ACTION BUTTONS */}
        <div className="space-y-4 pt-4">

          <button
            onClick={enroll}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] active:scale-95 transition-all"
          >
            Enroll Now
          </button>

          <button
            onClick={updateEnrollment}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] active:scale-95 transition-all"
          >
            Update Enrollment
          </button>

          <button
            onClick={unenroll}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] active:scale-95 transition-all"
          >
            Unenroll Course
          </button>

        </div>

      </div>
    </div>
  );

}
