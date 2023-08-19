import UserRole from "@/api/user-role/userRole.model";

class UserRoleRepository {
  public createUserRole = async (userData): Promise<void> => {
    await UserRole.create(userData);
  };
}

export default UserRoleRepository;
