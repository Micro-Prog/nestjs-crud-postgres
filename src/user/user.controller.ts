import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";


@Controller('api/users')
export class UserController {
    constructor(
        @InjectRepository(User)
        private readonly useRepository: Repository<User>,
    ) {}


    @Get('')
    async findAllUsers(): Promise<User[]> {
        return await this.useRepository.find();
    }

    @Get(':id')
    async findUserById(
        @Param('id') id: number
    ) : Promise<User> {
        return await this.useRepository.findOne({where: {id}});
    }

    @Post()
    async createUser(
        @Body() user: User
    ): Promise<User> {
        return await this.useRepository.save(user);
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: number,
        @Body() user: User,
    ): Promise<User> {
        await this.useRepository.update(id, user);
        return await this.useRepository.findOne({where: {id}});
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') id: number
    ): Promise<void> {
        await this.useRepository.delete(id);
    }
}