import { NextFunction, Request, Response } from "express";
import { userModel, userSchemaValidation } from "../models/user.model";
import blacklistModel from "../models/blacklist.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, password }: RegisterRequestBody = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill all the fields" });
      return;
    }

    const error = userSchemaValidation({
      name,
      email,
      password,
    });

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    let user = await userModel.findOne({
      $or: [{ email }],
    });

    if (user) {
      if (user.email === email) {
        res.status(400).json({ message: "Email Already Exists" });
        return;
      }
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    user = await userModel.create({
      email,
      password: hash,
      name,
    });

    res.status(201).json({ message: "User Created Successfully" });
    return;
  } catch (error: any) {
    res.status(500).json({ message: "Server error: " + error.message });
    next(error);
    return;
  }
};

const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password }: LoginRequestBody = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "All Fields are required" });
      return;
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Email or Password incorrect" });
      return;
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      res.status(401).json({ message: "Email or Password incorrect" });
      return;
    }

    if (result) {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "168h",
        }
      );

      res.status(201).json({ message: "Login Successfully", token });
      return;
    } else {
      res.status(401).json({ message: "Email or Password incorrect" });
      return;
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    next(error);
    return;
  }
};

const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Unauthorized - Token not found" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const isTokenBlacklisted = await blacklistModel.findOne({ token });

    if (isTokenBlacklisted) {
      res.status(401).json({ message: "Unauthorized - Token is blacklisted" });
      return;
    }

    await blacklistModel.create({ token });
    res.status(200).json({ message: "Successfully logged out" });
    return;
  } catch (error: any) {
    res.status(500).json({ message: `Logout failed: ${error.message}` });
    next(error);
    return;
  }
};

export { registerUser, loginUser, logout };
