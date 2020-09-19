import { Injectable } from '@nestjs/common';
import * as NodeMediaServer from 'node-media-server';
import { config } from './rtmp-config';
import { CustomLoggerService } from '../custom-logger/custom-logger.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class RTMPService {
  
  constructor(
    private customLoggerService: CustomLoggerService,
    private usersService: UsersService
  ) {
    this.customLoggerService.setContext('RTMPService');
    this.init();
  }

  init () {
    // actually deny access when no user with given streamkey exists.
    // I need to come back and check how to get a list of currently streaming users from the node-media-server api
    // actually I would rather have it not provide it's own rest api and choose myself what information it provides

    const nms = new NodeMediaServer(config.rtmp_server);
    nms.on('prePublish', async (id, StreamPath, args) => {
      const stream_key = getStreamKeyFromStreamPath(StreamPath);
      this.customLoggerService.warn(`[NodeEvent on prePublish] id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
      this.usersService.isStreamkeyValid(stream_key).subscribe(user => {
        if (!user) {
          const session = nms.getSession(id);
          session.reject();
          this.customLoggerService.warn(`[NodeEvent on prePublish] streamkey rejected, not a valid streamkey`);
        }
      });
    });


    const getStreamKeyFromStreamPath = (path) => {
      const parts = path.split('/');
      return parts[parts.length - 1];
    }
    nms.run();
  }

}
