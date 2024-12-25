import CustomError from "@/error/CustomError";
import { UserService } from "@/service/user.service";
import asyncErrorHandler from "@/utils/asyncErrorHandler";
import { NextFunction, Request, Response } from "express";

export class UserController {
    private userService: UserService;
  
    constructor(userService: UserService) {
      this.userService = userService;
    }

    public createUser = asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const { email, password, fullName, userType, username } = req.body;

            const user = await this.userService.createUser({
                email, password, fullName, userType, username
            })

            if(!user) {
                const error = new CustomError('Error: while creating user', 500 )
                next(error);
            }

            res.status(200).json({
                status: 'success',
                message: 'User created successfully',
                data: user
            })
        }
    )

    public loginUser = asyncErrorHandler(
        async (req: Request, res: Response, _next: NextFunction) => {
          const { email, password } = req.body;
    
          const user = await this.userService.loginUser(email, password);
          res.status(200).json(user);
        },
      );
}  