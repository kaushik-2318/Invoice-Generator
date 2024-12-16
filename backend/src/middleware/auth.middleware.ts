import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model";
import blacklistModel from "../models/blacklist.model";

interface JwtPayload {
  _id: string;
}

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;

    const user = await userModel.findById(decoded._id).exec();

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    
    const isTokenBlacklisted = await blacklistModel.findOne({ token });
    
    if (isTokenBlacklisted) {
      res.status(401).json({ message: "Token is blacklisted" });
      return;
    }
    
    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).send("Not Authorized");
  }
};

export default isAuthenticated;
