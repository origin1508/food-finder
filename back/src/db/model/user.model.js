// import sequelize from

export default {
  async findByEmail(email) {
    const user = await userModel.findOne({
      attributes: ["user_id", "email", "nickname", "profile_url"],
      where: {
        email,
      },
    });

    return user;
  },
};
