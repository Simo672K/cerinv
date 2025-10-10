import prisma from "../config/db";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type Role = "ADMIN" | "USER" | "STAFF";

class UserService {
  async getAllUsers() {
    const usersList = await prisma.user.findMany();
    return usersList;
  }
  async createUser(userData: UserData, role: Role = "USER") {
    const user = await prisma.user.create({
      data: {
        ...userData,
        profile: {
          create: {
            accessId: role === "ADMIN" ? 1 : role === "USER" ? 2 : 3,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return user;
  }
  async getUser(id: number) {
    const foundUser = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: {
          select: {
            avatar: true,
            username: true,
            access: {
              select: {
                role: true,
              },
            },
          },
        },
      },
    });

    return foundUser;
  }
  updateUser() {}
  deleteUser() {}
}

export default UserService;
