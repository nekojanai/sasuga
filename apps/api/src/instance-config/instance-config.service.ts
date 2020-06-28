import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstanceConfigRepository } from './instance-config.repository';
import { from, of, concat } from 'rxjs';
import { InstanceConfig } from './instance-config.entity';
import { concatMap } from 'rxjs/operators';
import { UpdateInstanceConfigDto } from './dto/update-instance-config.dto';

@Injectable()
export class InstanceConfigService implements OnModuleInit {
  constructor(
    @InjectRepository(InstanceConfigRepository)
    public repo: InstanceConfigRepository
  ) {}

  onModuleInit() {
    // making sure there's one instanceconfig in db upon application start, if not create it
    this.getOrCreate().subscribe();
  }

  getOrCreate() {
    return from(this.repo.findOne()).pipe(
      concatMap(config => {
        if (!config) {
          return this.repo.save(this.repo.create());
        } else {
          return of(config);
        }
      })
    );
  }

  updateOrCreate(data: UpdateInstanceConfigDto) {
    return from(this.repo.findOne()).pipe(
      concatMap(config => {
        if (!config) {
          return from(this.repo.save(this.repo.create()));
        } else {
          return from(this.repo.update({ unique: config.unique }, data)).pipe(
            concatMap(_ => this.repo.findOne())
          );
        }
      })
    )
  }
}
