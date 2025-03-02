import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error while logging in user: ", error);
    res.json({ success: false, message: "Error in login: " + error.message });
  }
};


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    if (password.length < 4) {
      return res.json({ success: false, message: "Password must be at least 4 characters" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error while registering user: ", error);
    res.json({ success: false, message: error.message });
  }
};


const adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body;


    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });

    }
    else {

      return res.json({
        success: false,
        message: "Wrong ID or password"
      });

    }
  }
  catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export { loginUser, registerUser, adminLogin };