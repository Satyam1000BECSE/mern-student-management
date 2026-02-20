import { useState, useEffect } from "react";
import API from "../api";

export default function Admin() {
  const [studentId, setStudentId] = useState("");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch courses for dropdown
  useEffect(() => {
    API.get("/courses").then(res => setCourses(res.data));
  }, []);

  const fetchAllStudents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/students");
      setStudents(res.data);
    } catch {
      alert("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleViewById = async () => {
    if (!studentId) return alert("Enter Student ID");

    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        `/students/${studentId}/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setViewStudent(res.data);
    } catch (error) {
      console.log(error);
      alert("Student not found or unauthorized");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    await API.delete(`/students/${id}`);
    fetchAllStudents();
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setEditForm(JSON.parse(JSON.stringify(student)));
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
  };


  const handleSave = async (id) => {
    await API.put(`/students/${id}`, editForm);
    setEditingId(null);
    setEditForm(null);
    fetchAllStudents();
  };

  // Student field change
  const handleFieldChange = (field, value) => {
    setEditForm({ ...editForm, [field]: value });
  };

  // Course selection change
  const handleCourseSelect = (index, courseId) => {
    const selectedCourse = courses.find(c => c._id === courseId);
    const updatedCourses = [...editForm.courses];

    updatedCourses[index].course = selectedCourse;
    updatedCourses[index].customDuration = selectedCourse.duration;
    updatedCourses[index].customFees = selectedCourse.fees;

    setEditForm({ ...editForm, courses: updatedCourses });
  };

  // Custom duration or fee change
  const handleCourseFieldChange = (index, field, value) => {
    const updatedCourses = [...editForm.courses];
    updatedCourses[index][field] = value;
    setEditForm({ ...editForm, courses: updatedCourses });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          ⚙️ Admin Dashboard
        </h2>

        <div className="flex gap-4 mb-6">
          <input
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID"
            className="border p-2 rounded w-1/3"
          />
          <button
            onClick={handleViewById}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            View Student
          </button>

          <button
            onClick={fetchAllStudents}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Get All Students
          </button>
        </div>

        {/* 🔥 VIEW STUDENT RESULT */}
        {viewStudent && (
          <div className="bg-white border rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-indigo-700 mb-4">
              📄 Student Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold">{viewStudent.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold">{viewStudent.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-semibold">{viewStudent.age}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-semibold">{viewStudent.city}</p>
              </div>
            </div>

            {/* Courses */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-lg">
                📚 Enrolled Courses
              </h4>

              {viewStudent.courses?.length > 0 ? (
                <div className="space-y-3">
                  {viewStudent.courses.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-md p-3 bg-gray-50"
                    >
                      <p className="font-medium">
                        {item.course?.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        Duration:{" "}
                        {item.customDuration ??
                          item.course?.duration}{" "}
                        months
                      </p>
                      <p className="text-green-600 font-medium">
                        ₹
                        {item.customFees ??
                          item.course?.fees}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Enrolled on:{" "}
                        {new Date(item.enrolledAt)
                          .toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">
                  No courses enrolled
                </p>
              )}
            </div>
          </div>
        )}


        {loading && <p>Loading...</p>}

        {students.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Age</th>
                  <th className="p-2">City</th>
                  <th className="p-2">Course</th>
                  <th className="p-2">Duration</th>
                  <th className="p-2">Fees</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map(student => {
                  const isEditing = editingId === student._id;
                  const data = isEditing ? editForm : student;

                  const totalFees = data.courses?.reduce(
                    (sum, item) =>
                      sum + (item.customFees ?? item.course?.fees ?? 0),
                    0
                  );

                  return (
                    <tr key={student._id} className="border-b">

                      <td className="p-2">
                        {isEditing ? (
                          <input
                            value={data.name}
                            onChange={(e) =>
                              handleFieldChange("name", e.target.value)
                            }
                            className="border p-1 rounded"
                          />
                        ) : data.name}
                      </td>

                      <td className="p-2">
                        {isEditing ? (
                          <input
                            value={data.email}
                            onChange={(e) =>
                              handleFieldChange("email", e.target.value)
                            }
                            className="border p-1 rounded"
                          />
                        ) : data.email}
                      </td>

                      <td className="p-2">
                        {isEditing ? (
                          <input
                            type="number"
                            value={data.age}
                            onChange={(e) =>
                              handleFieldChange("age", e.target.value)
                            }
                            className="border p-1 rounded"
                          />
                        ) : data.age}
                      </td>

                      <td className="p-2">
                        {isEditing ? (
                          <input
                            value={data.city}
                            onChange={(e) =>
                              handleFieldChange("city", e.target.value)
                            }
                            className="border p-1 rounded"
                          />
                        ) : data.city}
                      </td>

                      {/* COURSE SELECT */}
                      <td className="p-2">
                        {data.courses?.map((item, i) => (
                          <div key={i}>
                            {isEditing ? (
                              <select
                                value={item.course?._id}
                                onChange={(e) =>
                                  handleCourseSelect(i, e.target.value)
                                }
                                className="border p-1 rounded"
                              >
                                {courses.map(c => (
                                  <option key={c._id} value={c._id}>
                                    {c.title}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              item.course?.title
                            )}
                          </div>
                        ))}
                      </td>

                      {/* DURATION (CUSTOM) */}
                      <td className="p-2">
                        {data.courses?.map((item, i) => (
                          <div key={i}>
                            {isEditing ? (
                              <input
                                type="number"
                                value={
                                  item.customDuration ??
                                  item.course?.duration
                                }
                                onChange={(e) =>
                                  handleCourseFieldChange(
                                    i,
                                    "customDuration",
                                    e.target.value
                                  )
                                }
                                className="border p-1 rounded w-20"
                              />
                            ) : (
                              `${item.customDuration ?? item.course?.duration} months`
                            )}
                          </div>
                        ))}
                      </td>

                      {/* FEES (CUSTOM) */}
                      <td className="p-2">
                        {data.courses?.map((item, i) => (
                          <div key={i}>
                            {isEditing ? (
                              <input
                                type="number"
                                value={
                                  item.customFees ??
                                  item.course?.fees
                                }
                                onChange={(e) =>
                                  handleCourseFieldChange(
                                    i,
                                    "customFees",
                                    e.target.value
                                  )
                                }
                                className="border p-1 rounded w-24"
                              />
                            ) : (
                              `₹${item.customFees ?? item.course?.fees}`
                            )}
                          </div>
                        ))}
                      </td>

                      <td className="p-2 font-semibold text-green-600">
                        ₹{totalFees}
                      </td>

                      <td className="p-2 space-x-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSave(student._id)}
                              className="text-green-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-gray-600"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>

                            <button
                              onClick={() => handleViewDetails(student)}
                              className="text-indigo-600 font-medium"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(student)}
                              className="text-blue-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(student._id)}
                              className="text-red-600"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* 🔥 SELECTED STUDENT FULL DETAILS */}
            {selectedStudent && (
              <div className="bg-white border rounded-lg shadow-md p-6 mt-8">
                <h3 className="text-xl font-bold text-indigo-700 mb-4">
                  📄 Full Student Details
                </h3>

                <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold">{selectedStudent.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">{selectedStudent.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-semibold">{selectedStudent.age}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p className="font-semibold">{selectedStudent.city}</p>
                  </div>
                </div>

                {/* Courses */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2 text-lg">
                    📚 Enrolled Courses
                  </h4>

                  {selectedStudent.courses?.length > 0 ? (
                    <div className="space-y-3">
                      {selectedStudent.courses.map((item, index) => (
                        <div
                          key={index}
                          className="border rounded-md p-3 bg-gray-50"
                        >
                          <p className="font-medium">
                            {item.course?.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            Duration:{" "}
                            {item.customDuration ??
                              item.course?.duration}{" "}
                            months
                          </p>
                          <p className="text-green-600 font-medium">
                            ₹
                            {item.customFees ??
                              item.course?.fees}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Enrolled on:{" "}
                            {new Date(item.enrolledAt)
                              .toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">
                      No courses enrolled
                    </p>
                  )}
                </div>
              </div>
            )}


          </div>
        )}



      </div>
    </div>
  );
}
