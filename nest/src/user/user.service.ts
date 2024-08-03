import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';
// import { userMetadata, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async getMetadata(id: string, authorization: string) {
    const metadata = await this.prisma.userMetadata.findFirst({
      where: {
        userId: id,
      },
    });
    if (metadata === null) {
      const response = await fetch(
        `${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: authorization,
          },
        },
      );
      const userData = await response.json();
      console.log(userData);
      if (!userData?.name) {
        throw new NotFoundException('Could not get user data');
      }
      return this.prisma.userMetadata.create({
        data: {
          userId: id,
          name: userData.name,
          nickname: userData.nickname,
          picture: userData.picture,
        },
      });
    }
    return metadata;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
