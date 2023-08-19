import User from "@api/user/user.model";
import { isEmpty } from "@/utils/isEmpty.util";
import { HttpExceptionBadRequest, HttpExceptionNotFound } from "@/exceptions/HttpException";

import UserRepository from "@/repositories/user.repository";

class UserService {
  public userRepository = new UserRepository();

  public findUserById = async (id: string): Promise<User> => {
    if (isEmpty(id)) throw new HttpExceptionBadRequest("Empty id");

    // const data = await User.findByPk(id);
    const data = await this.userRepository.findUserById(id);
    if (!data) {
      throw new HttpExceptionNotFound("User not found");
    }

    return data;
  };
}

export default UserService;
