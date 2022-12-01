import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";

import userModel from "../db/model/user.model";
import refreshTokenModel from '../db/model/refreshToken.model';

export default {
  async checkUser(email, password) {
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw ApiError.setUnauthorized("존재하지 않는 이메일입니다.");
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw ApiError.setUnauthorized("비밀번호가 일치하지 않습니다.");
    }

    return {
      userId: user.user_id,
      email: user.email,
      nickname: user.nickname,
      profileUrl: user.profile_url,
    };
  },

  async generateAccessToken(userId) {
    const payload = { userId };
    const secretKey = process.env.JWT_SECRET_KEY;
    const options = {
      expiresIn: "15s",
      issuer: "FoodFinderAdmin",
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  },

  async generateRefreshToken(userId) {
    const payload = {};
    const secretKey = process.env.JWT_SECRET_KEY;
    const options = {
      expiresIn: "15d",
      issuer: "FoodFinderAdmin",
    };

    const token = jwt.sign(payload, secretKey, options);

    await refreshTokenModel.createOrUpdate(userId, token);

    return token;
  },

  async verifyRefreshTokenInDB(userId, refreshToken) {
    const exToken = await refreshTokenModel.findByUserId(userId);
    if(!exToken) {
      throw ApiError.setBadRequest('서버에 저장되지 않은 리프레시 토큰입니다. 로그인 화면으로');
    }
    
    if(exToken.token !== refreshToken) {
      await refreshTokenModel.destroy(userId);
      throw ApiError.setBadRequest('해당 유저의 리프레시 토큰이 아닙니다. 로그인 화면으로');
    }
  },

  async registerInfo(email, password, nickname) {
    // 아래 로직 좀 더 다듬기
    const exUserByEmail = await userModel.findByEmail(email);
    
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
