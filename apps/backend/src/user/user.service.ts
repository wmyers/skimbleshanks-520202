import { Inject, Injectable } from '@nestjs/common';
import { type User } from '../shared/schemas/user.schema';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import * as fs from 'fs';

@Injectable()
export class UserService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.loadUserJson();
  }

  loadUserJson(): void {
    const filePath = './data.json';
    fs.readFile(filePath, async (error, data) => {
      if (error) throw error;

      await this.cacheManager.set('users', JSON.parse(data.toString()));
    });
  }

  async findOne(id: string): Promise<User | undefined> {
    const users: User[] = (await this.cacheManager.get<User[]>('users')) ?? [];
    const user = users.find(({ id: userId }) => id === userId);
    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = (await this.cacheManager.get<User[]>('users')) ?? [];
    return users;
  }
}
