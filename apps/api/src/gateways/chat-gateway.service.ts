import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

export interface IChatUser {
  socketId: string;
  userId?: string;
  username?: string;
  hexColor: string;
  partOfRooms: string[];
}

@Injectable()
export class ChatGatewayService {

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  private users: IChatUser[] = [];

  async addGuest(socketId: string, username: string, room: string): Promise<IChatUser | undefined> {
    const roomUser  = await this.usersService.findOne({name: room});
    if (!roomUser || !roomUser.isActive || !roomUser.allowGuestsInChat || !this.isUsernameAvailable(this.usernameTransformer(username))) { return undefined }
    const user = {hexColor: this.getHexColor(), partOfRooms: [room], socketId, username: this.usernameTransformer(username)};
    this.users.push(user);
    return user;
  }

  async addUser(socketId: string, token: string, room: string): Promise<IChatUser | undefined> {
    const roomUser  = await this.usersService.findOne({name: room});
    if (!roomUser || !roomUser.isActive) { return undefined }
    const joinedUser = await this.authService.validateTokenGetUser(token).toPromise();
    if (!joinedUser || !joinedUser.isActive) { return undefined }
    const user = {hexColor: joinedUser.hexColor, partOfRooms: [room], socketId, username: joinedUser.name, userId: joinedUser.id};
    this.users.push(user);
    return user;
  }

  removeUser(socketId: string): IChatUser | undefined {
    const index = this.users.findIndex(u => u.socketId === socketId);
    if(index !== -1) {
      return this.users.splice(index, 1)[0];
    } else {
      return undefined;
    }
  }

  getUserInRoom(socketId: string, room: string): IChatUser | undefined {
    return this.users.find(u => (u.socketId === socketId) && u.partOfRooms.includes(room));
  }

  private isUsernameAvailable(username: string): boolean {
    return !this.users.find(u => u.username.includes(username));
  }

  private getHexColor(): string {
    const letters = "0123456789ABCDEF";
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 16))];
    }
    return color;
  }

  private usernameTransformer(username: string) {
    return `[Guest]${username ? username.replace(/[\W_]/gi,'').toLowerCase() : 'user'+Math.floor(Math.random() * 10000)}`
  }

}