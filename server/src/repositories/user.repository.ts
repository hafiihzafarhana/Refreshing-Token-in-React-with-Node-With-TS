import UserRole from "@/api/user-role/userRole.model";
import User from "@/api/user/user.model";
import { LoginUserDto, RegisterUserDto } from "@/dtos/auth.dto";

class UserRepository {
  public findUserByEmailAndDeletedNull = async (
    userData: RegisterUserDto,
  ): Promise<User | null> => {
    return await User.findOne({
      where: { email: userData.email.toLowerCase(), deleted_at: null },
    });
  };

  public findUserByUsernameAndDeletedNull = async (
    userData: RegisterUserDto,
  ): Promise<User | null> => {
    return await User.findOne({
      where: { user_name: userData.username, deleted_at: null },
    });
  };

  public createUser = async (userData): Promise<User> => {
    return await User.create(userData);
  };

  public findUserByEmail = async (userData: LoginUserDto): Promise<User | null> => {
    const data = await User.findOne({
      where: { email: userData.email.toLocaleLowerCase() },
      include: [
        {
          model: UserRole,
          as: "user_role",
        },
      ],
    });
    return data ? data : null;
  };

  public findUserById = async (user_id: string): Promise<User | null> => {
    return await User.findOne({
      where: { id: user_id },
      include: [
        {
          model: UserRole,
          as: "user_role",
        },
      ],
    });
  };
}

export default UserRepository;
