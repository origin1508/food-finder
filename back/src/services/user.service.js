import userModel from '../db/model/user.model'

export default {
  async modifyNickname(userId, nickname) {
    const user = await userModel.updateNickname(userId, nickname);
    
    return user;
  }
}