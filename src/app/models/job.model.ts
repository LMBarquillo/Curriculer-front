import {SectorModel} from './sector.model';
import {ActivityModel} from './activity.model';

export interface JobModel {
  id: number;
  from: any;
  to: any;
  employer: string;
  city: string
  sector: SectorModel;
  activities: ActivityModel[];
}
