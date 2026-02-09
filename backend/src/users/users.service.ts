import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async createUser(dto: CreateUserDto): Promise<User> {
        const { password, ...rest } = dto;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        return this.prisma.user.create({
            data: {
                ...rest,
                passwordHash
            },
        });
    }

    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async getUser(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
        const { password, ...rest } = dto;
        let data: Prisma.UserUpdateInput = { ...rest };

        if (password) {
            const salt = await bcrypt.genSalt();
            data.passwordHash = await bcrypt.hash(password, salt);
        }

        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async deleteUser(id: string): Promise<User> {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}