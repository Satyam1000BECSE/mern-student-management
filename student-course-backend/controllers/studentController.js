import Student from "../models/Student.js";

// ADD STUDENT
export const addStudent = async (req, res) => {
  try {
    const { name, email, age, city } = req.body;

    const student = await Student.create({
      name,
      email,
      age,
      city,
      user: req.user.id
    });

    res.json(student);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// GET ALL STUDENTS
// export const getStudents = async (req, res) => {
//   try {
//     const students = await Student.find()
//   .populate("courses.course");
//    // 🔥 IMPORTANT

//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// export const getStudents = async (req, res) => {
//   try {
//     const students = await Student.find({
//       user: req.user.id   // 🔥 Only logged-in user data
//     }).populate("courses.course");

//     res.json(students);

//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

export const getStudents = async (req, res) => {
  try {

    let students;

    if (req.user.role === "admin") {
      // 🔥 Admin → see ALL students
      students = await Student.find()
        .populate("courses.course");
    } else {
      // 🔥 Teacher & Student → only own
      students = await Student.find({
        user: req.user.id
      }).populate("courses.course");
    }

    res.json(students);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



// GET STUDENT BY ID
export const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
};

// UPDATE STUDENT
export const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after" }
  );
  res.json(student);
};

// DELETE STUDENT
// export const deleteStudent = async (req, res) => {
//   await Student.findByIdAndDelete(req.params.id);
//   res.json({ message: "Student Deleted" });
// };

// export const deleteStudent = async (req, res) => {
//   try {

//     const student = await Student.findOne({
//       _id: req.params.id,
//       user: req.user.id   // 🔥 Ownership check
//     });

//     if (!student) {
//       return res.status(404).json({
//         message: "Student not found or not authorized"
//       });
//     }

//     await student.deleteOne();

//     res.json({ message: "Student Deleted" });

//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };


export const deleteStudent = async (req, res) => {
  try {

    let filter = { _id: req.params.id };

    // 🔥 If teacher → only delete own students
    if (req.user.role === "teacher") {
      filter.user = req.user.id;
    }

    // 🔥 Admin can delete anyone (no filter.user added)

    const student = await Student.findOneAndDelete(filter);

    if (!student) {
      return res.status(404).json({
        message: "Student not found or not authorized"
      });
    }

    res.json({ message: "Student Deleted" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// ENROLL STUDENT

export const unenrollStudent = async (req, res) => {
  const { studentId, courseId } = req.params;

  try {
    const student = await Student.findById(studentId);

    student.courses = student.courses.filter(
      item => item.course.toString() !== courseId
    );

    await student.save();

    res.json({ message: "Unenrolled successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateEnrollment = async (req, res) => {
  const { studentId, oldCourseId, newCourseId } = req.params;

  try {
    const student = await Student.findById(studentId);

    const enrollment = student.courses.find(
      item => item.course.toString() === oldCourseId
    );

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    enrollment.course = newCourseId;

    await student.save();

    res.json({ message: "Enrollment updated" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


export const enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.params;

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Ensure courses array exists
    if (!student.courses) {
      student.courses = [];
    }

    const alreadyEnrolled = student.courses.some(
      item => item.course?.toString() === courseId
    );

    if (alreadyEnrolled) {
      return res.status(400).json({
        message: "Student already enrolled in this course"
      });
    }

    student.courses.push({
      course: courseId
    });

    await student.save();

    res.json({
      message: "Student enrolled successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};



// POPULATE DETAILS

export const getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("courses.course");

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json(student);

  } catch (error) {
    console.error("Details Error:", error.message);
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

// export const getMyDetails = async (req, res) => {
//   try {
//     const student = await Student.findOne({
//       user: req.user.id
//     }).populate("courses.course");

//     res.json(student);

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getMyDetails = async (req, res) => {
//   try {

//     // 🔥 If logged-in user is STUDENT
//     if (req.user.role === "student") {

//       const student = await Student.findOne({
//         email: req.user.email  // or match by user reference if you store it
//       }).populate("courses.course");

//       if (!student) {
//         return res.status(404).json({
//           message: "Student record not found"
//         });
//       }

//       return res.json(student);
//     }

//     // 🔥 If TEACHER
//     if (req.user.role === "teacher") {

//       const students = await Student.find({
//         user: req.user.id
//       }).populate("courses.course");

//       const courses = await Course.find({
//         user: req.user.id
//       });

//       return res.json({
//         user: req.user,
//         students,
//         courses
//       });
//     }

//     // 🔥 If ADMIN
//     if (req.user.role === "admin") {

//       const students = await Student.find()
//         .populate("courses.course");

//       const courses = await Course.find();

//       return res.json({
//         user: req.user,
//         students,
//         courses
//       });
//     }

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const getMyDetails = async (req, res) => {
  try {

    // 🔥 STUDENT
    if (req.user.role === "student") {

      const student = await Student.findOne({
        user: req.user.id   // ✅ FIX HERE
      }).populate("courses.course");

      if (!student) {
        return res.status(404).json({
          message: "Student record not found"
        });
      }

      return res.json(student);
    }

    // 🔥 TEACHER
    if (req.user.role === "teacher") {

      const students = await Student.find({
        user: req.user.id
      }).populate("courses.course");

      const courses = await Course.find({
        user: req.user.id
      });

      return res.json({
        user: req.user,
        students,
        courses
      });
    }

    // 🔥 ADMIN
    if (req.user.role === "admin") {

      const students = await Student.find()
        .populate("courses.course");

      const courses = await Course.find();

      return res.json({
        user: req.user,
        students,
        courses
      });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

