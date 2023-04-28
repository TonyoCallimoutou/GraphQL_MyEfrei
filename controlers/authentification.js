
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
		console.log(context)
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

  disconnectUser : async (context) => {
    const { token } = context.res.cookie;
		console.log(token)
    if (token) {
      const { user } = verifyToken(token);
			console.log(user)
      context.req.cookie('token', null, { httpOnly: true, secure: true });
			console.log(user);
      return user;
    }
    return null;
	}
  
}