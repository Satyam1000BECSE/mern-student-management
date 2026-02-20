import User from "../models/User.js";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ================= REGISTER =================
// export const register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Check if user exists
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({
//         message: "User already exists"
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       // role: role || "user" // default user
//       role: role || "student" 
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       error: error.message
//     });
//   }
// };

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const finalRole = role || "student";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: finalRole
    });

    // 🔥 Only for student
    if (finalRole === "student") {

      const studentExists = await Student.findOne({ email });

      if (!studentExists) {
        await Student.create({
          name,
          email,
          age: 18,
          city: "Not Set",
          user: user._id
        });
      }
    }

    res.status(201).json({
      message: "Registered successfully"
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({
      message: error.message
    });
  }
};




// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Create token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

