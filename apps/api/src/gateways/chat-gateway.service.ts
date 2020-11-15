import { Injectable } from '@nestjs/common';

export interface IChatUser {
  socketId: string;
  userId?: string;
  username?: string;
  partOfRooms: string[];
}

@Injectable()
export class ChatGatewayService {

  private users: IChatUser[] = [];

  addUser(socketId: string): IChatUser | undefined {
    if(!this.users.find(u => u.socketId === socketId)) {
      const user = {socketId, partOfRooms: []};
      this.users.push(user);
      return user;
    } else {
      return undefined;
    }
  }

  removeUser(socketId: string): IChatUser | undefined {
    const index = this.users.findIndex(u => u.socketId === socketId);
    if(index !== -1) {
      return this.users.splice(index, 1)[0];
    } else {
      return undefined;
    }
  }

  addUserToRoom(socketId: string, room: string): IChatUser | undefined {
    const index = this.users.findIndex(u => u.socketId === socketId);
    if(index !== -1) {
      const user = this.users[index];
      if(user.partOfRooms && !user.partOfRooms.find(r => r === room)) {
        const newUser = {...user, partOfRooms: [...user.partOfRooms,room]};
        this.users[index] = newUser;
        return newUser;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  isInRoom(socketId: string, room: string): IChatUser | undefined {
    const index = this.users.findIndex(u => u.socketId === socketId);
    if(index === -1) { return undefined };
    const user = this.users[index];
    if (!user.partOfRooms.find(r => r === room)) { return undefined };
    return user;
  }

  removeUserFromRoom(socketId: string, room: string): IChatUser | undefined {
    const index = this.users.findIndex(u => u.socketId === socketId);
    if(index !== -1) {
      const user = this.users[index];
      const roomIndex = user.partOfRooms?.findIndex(r => r === room);
      if(roomIndex !== -1) {
        user.partOfRooms.splice(roomIndex,1);
        const newUser = {...user, partOfRooms: user.partOfRooms};
        this.users[index] = newUser;
        return newUser;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  setUsername(socketId: string, username: string): IChatUser | undefined {
    const index = this.users.findIndex(u => u.socketId === socketId);
    if(index !== -1) {
      const user = this.users[index];
      const newUser = {...user, username };
      this.users[index] = newUser;
      return newUser;
    } else {
      return undefined;
    }
  }
}