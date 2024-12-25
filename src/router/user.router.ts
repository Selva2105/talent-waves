import { UserController } from "@/controller/user.controller";
import { UserRepo } from "@/repositories/user.repo";
import TokenService from "@/service/token.service";
import { UserService } from "@/service/user.service";
import { createUserValidator } from "@/validators/user.validator";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const userRouter = Router();

const prisma = new PrismaClient();
const userRepository = new UserRepo(prisma);
const tokenService = new TokenService()
const userService = new UserService(userRepository, tokenService);
const userController = new UserController(userService);

userRouter.get('/login', userController.loginUser)

userRouter.post("/create", createUserValidator, userController.createUser);

export default userRouter;