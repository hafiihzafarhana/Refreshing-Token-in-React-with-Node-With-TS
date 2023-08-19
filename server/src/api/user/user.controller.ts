import { UserRoleInterface } from "./../../interfaces/role.interface";
import UserService from "@services/user.service";
import { Request, Response } from "express";
import { StatusCodes as status } from "http-status-codes";
import expressAsyncHandler from "express-async-handler";
import { apiResponse } from "@/utils/apiResponse.util";

interface AuthenticateRequest extends Request {
  user?: UserRoleInterface;
}

class UserController {
  public userService = new UserService();

  public getMe = expressAsyncHandler(
    async (req: AuthenticateRequest, res: Response): Promise<void> => {
      const userId = req.user?.user_id as string;
      const userServiceResponse = await this.userService.findUserById(userId);
      res.status(status.OK).json(apiResponse(status.OK, "OK", "Get Me", userServiceResponse));
    },
  );
}

export default UserController;
