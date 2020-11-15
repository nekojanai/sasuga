import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Subject } from 'rxjs';

export interface GeneralGatewayCommand {
  command: string,
  args: any
}

@Injectable()
export class GeneralGatewayService {

  public commands = new Subject<GeneralGatewayCommand>();

  issueCommand(command: GeneralGatewayCommand) {
    this.commands.next(command);
  }

}