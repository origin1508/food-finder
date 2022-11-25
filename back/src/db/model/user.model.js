import { User } from "../schema";

export default {
  async findByEmail(email) {
    const user = await User.findOne({
      attributes: ["user_id", "email", "nickname", "profile_url"],
      where: {
        email,
      },
    });

    return user;
  },

  async findByNickname(nickname) {
    const user = await User.findOne({
      attributes: ["user_id", "email", "nickname", "profile_url"],
      where: {
        nickname,
      },
    });

    return user;
  },

  async create(email, password, nickname) {
    await User.create({
      email,
      password,
      nickname,
    });
  },
};
