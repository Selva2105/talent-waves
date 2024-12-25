import CustomError from "@/error/CustomError";
import { UserRepo } from "@/repositories/user.repo";
import { Prisma, User } from "@prisma/client";
import bcrypt from 'bcrypt';
import TokenService from "./token.service";

export class UserService {
    private userRepo: UserRepo;

    private tokenService: TokenService;

    constructor(userRepo: UserRepo, tokenService: TokenService) {
        this.userRepo = userRepo;
        this.tokenService = tokenService;
    }

    async createUser(user: Prisma.UserCreateInput): Promise<User> {
        const existingUser = await this.userRepo.findUserByEmail(user.email);

        if (existingUser) {
            throw new CustomError('User already exists', 400);
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const createdUser = await this.userRepo.createUser({
            ...user,
            password: hashedPassword,
        });

        return createdUser;
    }

    async loginUser(
        email: string,
        userPassword: string,
      ): Promise<{
        token: string;
        user: User;
      }> {
        const existingUser = await this.userRepo.findUserByEmail(email);
    
        if (!existingUser) {
          throw new CustomError('User does not exist', 400);
        }
    
        const isPasswordValid = await bcrypt.compare(
          userPassword,
          existingUser.password,
        );
    
        if (!isPasswordValid) {
          throw new CustomError('Invalid password', 400);
        }
    
        const token = this.tokenService.signToken(existingUser.id);
    
        return { token, user: existingUser };
      }
}