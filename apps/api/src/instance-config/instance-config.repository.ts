import { EntityRepository, Repository } from "typeorm";
import { InstanceConfig } from './instance-config.entity';

@EntityRepository(InstanceConfig)
export class InstanceConfigRepository extends Repository<InstanceConfig> {}