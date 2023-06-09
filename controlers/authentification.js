
import { PrismaClient } from '@prisma/client'
import { hashPassword, signToken, verifyPassword, verifyToken } from '../utils/auth.js'
const prisma = new PrismaClient()

export const authControlers = {

	registerUser : async ({value}, context) => {
		const hashedPassword = await hashPassword(value.password);
		value.password = hashedPassword;

		let user = await prisma.users.create({
			data : value,
		});

		signToken({user: user}, context);

		return user
	},

	loginUser : async ({value}, context) => {
		let user = await prisma.users.findUnique({
			where: {
				userEmail : value.userEmail
			}
		});
		
		if (user) {
			const isValidPassword = await verifyPassword(user.password, value.password);
			if (!isValidPassword) {
				throw new Error("Invalid password");
			}
			signToken({user: user}, context);


			return user;
		}
		else {
			throw new Error("Invalid email");
		}
	},

  disconnectUser : async ({value}, context) => {
    const { token } = context.req.cookies;
    if (token) {
      const { user } = verifyToken(token);
			context.res.clearCookie("token");
      return user;
    }
    return null;
	}
  
}