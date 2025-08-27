import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 


export const register = async (request, response) => {
    try {
        const { name, email, password } = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return response.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        return response.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Error in register controller", error);
        response.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (request, response) => {
    try{
        const {email ,password} = request.body;
        if (!email || !password) {
            return response.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return response.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return response.status(200).cookie("token", token, { httpOnly: true, sameSite: "Strict", maxAge: 24 * 60 * 60 * 1000 }).json({
            success: true,
            message: "User logged in successfully"
        });

    } catch (error) {
        console.error("Error in login controller", error);
        response.status(500).json({ message: "Internal server error" });
    }
};


export const logout = async (request, response) => {
    try {
        response.clearCookie("token");
        return response.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error("Error in logout controller", error);
        response.status(500).json({ message: "Internal server error" });
    }
};