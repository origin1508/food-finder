import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";

import userModel from "../db/model/user.model";

export default {
  async checkUser(email, password) {
    const user = userModel.findByEmail(email);

    if (!user) {
      ApiError.setUnauthorized('존재하지 않는 이메일입니다.');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      ApiError.setUnauthorized('비밀번호가 일치하지 않습니다.');
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

  async registerInfo(email, password, nickname) {
    // 아래 로직 좀 더 다듬기
    const exUserByEmail = await userModel.findByEmail(email);
    console.log(exUserByEmail);
    if (exUserByEmail) {
      throw ApiError.setConflict("이미 존재하는 이메일입니다.");
    }

    const exUserByNickname = await userModel.findByNickname(nickname);
    if (exUserByNickname) {
      throw ApiError.setConflict("이미 존재하는 닉네임입니다.");
    }

    const encryptedPassword = await bcrypt.hash(password, 12);

    await userModel.create(email, encryptedPassword, nickname);
  },
};
