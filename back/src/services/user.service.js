import userModel from "../db/model/user.model";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError";

export default {
  async modifyNickname(userId, nickname) {
    const user = await userModel.updateNickname(userId, nickname);

    return user;
  },

  async checkDuplicatedNickname(nickname) {
    const duplicatedUser = await userModel.findByNickname(nickname);
    if (duplicatedUser) {
      throw ApiError.setBadRequest("중복된 닉네임이 존재합니다.");
    }
  },

  async modifyPassword(userId, password) {
    const encryptedPassword = await bcrypt.hash(password, 12);
    await userModel.updatePassword(userId, encryptedPassword);
  },

  async checkCorrectPassword(userId, password) {
    const user = await userModel.findById(userId);

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw ApiError.setBadRequest("일치하지 않는 비밀번호입니다.");
    }
  },
};
