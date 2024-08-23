import { Injectable, HttpException } from '@nestjs/common';
import { UpdateUserDto, ChangeUserPasswordDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import fetch from 'node-fetch';
import NodeRSA from 'node-rsa';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMetadata(authorization: string, userId: string) {
    const metadata = await this.prisma.userMetadata.findFirst({
      where: {
        userId,
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
      if (!userData?.name) {
        throw new HttpException('Could not get user data', 400);
      }
      return this.prisma.userMetadata.create({
        data: {
          userId,
          name: userData.name,
          nickname: userData.nickname,
          picture: userData.picture,
        },
      });
    }
    return metadata;
  }

  async update(updateUserDto: UpdateUserDto, userId: string) {
    const userMetadata = await this.prisma.userMetadata.findFirst({
      where: {
        userId,
      },
    });
    if (!userMetadata) {
      throw new HttpException('UserMetadata Not Found', 400);
    }
    try {
      const updatedMetadata = await this.prisma.userMetadata.update({
        where: {
          userId,
        },
        data: {
          name: updateUserDto.name || userMetadata.name,
          nickname: updateUserDto.nickname || userMetadata.nickname,
          picture: updateUserDto.picture || userMetadata.picture,
        },
      });
      return updatedMetadata;
    } catch (err) {
      throw new HttpException('UserMetadata Not Found', 400);
    }
  }

  async changePassword(changeUserPasswordDto: ChangeUserPasswordDto) {
    const privateKey = Buffer.from(
      process.env.RSA_KEY_PRIVATE,
      'base64',
    ).toString('ascii');

    const key = new NodeRSA(privateKey, 'private');
    const oldPassword = key.decrypt(changeUserPasswordDto.oldPassword, 'utf8');
    const newPassword = key.decrypt(changeUserPasswordDto.newPassword, 'utf8');
    const checkUserOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'password',
        username: changeUserPasswordDto.email,
        password: oldPassword,
        audience: 'https://assetsfi.onrender.com/',
        scope: 'SCOPE',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
      }),
      redirect: 'follow',
    };

    try {
      const request = await fetch(
        `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
        checkUserOptions,
      );
      const checkPassword = await request.json();
      if (checkPassword?.error) {
        if (checkPassword?.error_description == 'Wrong email or password.') {
          throw new HttpException({ error: 'Invalid old password' }, 400);
        }
        throw new HttpException(
          { error: checkPassword?.error_description },
          400,
        );
      }
      if (checkPassword?.access_token) {
        const decoded = jwtDecode(checkPassword?.access_token);
        if (!decoded.sub) {
          throw new HttpException({ error: 'Error, no user id' }, 400);
        }
        const userId = decoded.sub;
        const changePassOptions = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_TOKEN}`,
          },
          body: JSON.stringify({ password: newPassword }),
        };

        const request = await fetch(
          `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
          changePassOptions,
        );
        const passwordChanged = await request.json();

        if (passwordChanged.email) {
          return { message: 'Password was successfully changed' };
        }
        throw new HttpException({ error: 'Something went wrong' }, 400);
      }
    } catch (err) {
      throw new HttpException({ error: err }, 400);
    }
  }
}
