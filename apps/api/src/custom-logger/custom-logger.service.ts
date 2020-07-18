import { Injectable, Scope, Logger } from "@nestjs/common";


@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends Logger {
  
}