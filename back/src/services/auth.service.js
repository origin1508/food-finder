import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../db/model/user.model";

export default {
  async checkUser(email, password) {
    const user = userModel.findByEmail(email);

    if (!user) {
      //에러 처리
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      //에러 처리
    }
  },

  async generateAccessToken(userId) {
    const payload = { userId };
    const secretKey = process.env.JWT_SECRET_KEY;
    const options = {
      expiresIn: "1h",
      issuer: "FoodFinderAdmin",
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  },

  async generateRefreshToken() {
    const payload = {};
    const secretKey = process.env.JWT_SECRET_KEY;
    const options = {
      expiresIn: "15d",
      issuer: "FoodFinderAdmin",
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  },
};
