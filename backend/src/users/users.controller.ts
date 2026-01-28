import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createUserDto: Prisma.UserCreateInput) {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    async getAllUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.usersService.getUser(id);
    }

    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: Prisma.UserUpdateInput
    ) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param('id') id: string) {
        await this.usersService.deleteUser(id);
    }
}
