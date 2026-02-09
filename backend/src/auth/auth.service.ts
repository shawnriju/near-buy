import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async login(dto: LoginDto){
    // 1. Find user by email
    const user = await this.prisma.user.findUnique({
      where: {email: dto.email}
    });

    // 2. If user doesn't exist, throw error
    if(!user){
      throw new UnauthorizedException('Invalid Credentials');
    }

    // 3. Compare password hash
    const pwMatches = await bcrypt.compare(dto.password, user.passwordHash);

    // 4. If password incorrect, throw error
    if (!pwMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
    });
    
    // 5. Sign a token and return it
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwt.signAsync(payload);
    
    
    return {
      access_token: token,
    };
  }

  async register(dto: RegisterDto) {
    // 1. Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // 2. Hash the password
    const saltRounds = 10;
    const hashedPwd = await bcrypt.hash(dto.password, saltRounds);

    // 3. Save to database
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: hashedPwd,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });

    // 4. Return the user (but remove the passwordHash using destructuring for security!)
    const { passwordHash, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

}