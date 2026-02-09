import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    id!: string;
    email!: string;

    @Exclude()
    passwordHash!: string;

    firstName!: string;
    lastName!: string;
    phone!: string | null;
    profilePictureUrl!: string | null;
    bio!: string | null;
    locationCity!: string | null;
    locationState!: string | null;
    isActive!: boolean;
    lastLoginAt!: Date | null;
    createdAt!: Date;
    updatedAt!: Date;
}
