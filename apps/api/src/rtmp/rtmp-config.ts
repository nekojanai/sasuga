import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const config = {
  server: {
    secret: configService.get<string>('RTMP_SECRET'),
  },
  rtmp_server: {
    rtmp: {
      port: configService.get<string>('RTMP_PORT'),
      chunk_size: configService.get<number>('RTMP_CHUNK_SIZE'),
      gop_cache: configService.get<boolean>('RTMP_GOP_CACHE'),
      ping: configService.get<string>('RTMP_PING'),
      ping_timeout: configService.get<string>('RTMP_PING_TIMEOUT')
    },
    http: {
      port: configService.get<string>('RTMP_HTTP_PORT'),
      mediaroot: configService.get<string>('RTMP_HTTP_MEDIA_ROOT'),
      allow_origin: configService.get<string>('RTMP_HTTP_ALLOW_ORIGIN'),
    },
    trans: {
      ffmpeg: configService.get<string>('RTMP_TRANS_FFMPEG'),
      tasks: [
        {
          app: configService.get<string>('RTMP_TRANS_TASKS_APP'),
          hls: configService.get<string>('RTMP_TRANS_TASKS_HLS'),
          hlsFlags: configService.get<string>('RTMP_TRANS_TASKS_HLS_FLAGS'),
          dash: configService.get<string>('RTMP_TRANS_TASKS_DASH'),
          dashFlags: configService.get<string>('RTMP_TRANS_TASKS_DASH_FLAGS'),
        }
      ]
    }
  }
};