import { User } from "../schema";

export default {
  async findByEmail(email) {
    const user = await User.findOne({
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

  async findById(userId) {
    const user = await User.findByPk(userId);

    return user;
  },

  async create(email, password, nickname) {
    await User.create({
      email,
      password,
      nickname,
    });
  },

  async updateNickname(userId, nickname) {
    const user = await User.update(
      { nickname },
      {
        where: {
          user_id: userId,
        },
      }
    );

    return user;
  },

  async updatePassword(userId, password) {
    await User.update(
      { password },
      {
        where: {
          user_id: userId,
        },
      }
    );
  },
};
