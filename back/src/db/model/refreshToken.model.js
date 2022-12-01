import { RefreshToken } from "../schema";

export default {
  async findByUserId(userId) {
    const exToken = await RefreshToken.findOne({
      where: {
        user_id: userId,
      },
    });

    return exToken;
  },

  async createOrUpdate(userId, token) {
    const exToken = await RefreshToken.findOne({
      where: {
        user_id: userId,
      },
    });

    if (!exToken) {
      await RefreshToken.create({ token, user_id: userId });
    } else {
      await RefreshToken.update(
        { token },
        {
          where: {
            user_id: userId,
          },
        }
      );
    }
  },

  async destroy(userId) {
    await RefreshToken.destroy({
      where: { user_id: userId },
    });
  },
};
