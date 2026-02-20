import Course from "../models/Course.js";

// ADD COURSE
// export const addCourse = async (req, res) => {
//   const course = await Course.create(req.body);
//   res.json(course);
// };

export const addCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      user: req.user.id   // 👈 attach creator
    });

    res.json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// GET ALL COURSES
// export const getCourses = async (req, res) => {
//   const courses = await Course.find();
//   res.json(courses);
// };

export const getCourses = async (req, res) => {
  try {

    if (req.user.role === "student") {
      // Student → see all courses
      const courses = await Course.find();
      return res.json(courses);
    }

    if (req.user.role === "teacher") {
      // Teacher → only own
      const courses = await Course.find({ user: req.user.id });
      return res.json(courses);
    }

    if (req.user.role === "admin") {
      // Admin → see all
      const courses = await Course.find();
      return res.json(courses);
    }

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};



// GET COURSE BY ID
export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
};

// UPDATE COURSE
// export const updateCourse = async (req, res) => {
//   const course = await Course.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     // { new: true }
//     { returnDocument: "after" }
//   );
//   res.json(course);
// };

export const updateCourse = async (req, res) => {
  try {

    let filter = { _id: req.params.id };

    if (req.user.role === "teacher") {
      filter.user = req.user.id; // teacher only own
    }

    const course = await Course.findOneAndUpdate(
      filter,
      req.body,
      { returnDocument: "after" }
    );

    if (!course) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json(course);

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};



// DELETE COURSE
// export const deleteCourse = async (req, res) => {
//   await Course.findByIdAndDelete(req.params.id);
//   res.json({ message: "Course Deleted" });
// };

export const deleteCourse = async (req, res) => {
  try {

    let filter = { _id: req.params.id };

    if (req.user.role === "teacher") {
      filter.user = req.user.id;
    }

    const course = await Course.findOneAndDelete(filter);

    if (!course) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json({ message: "Course Deleted" });

  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};
