import {Injectable} from '@angular/core';
import {AuthHttpService} from './auth-http.service';
import {Observable} from 'rxjs/Observable';
import {JobModel} from '../models/job.model';
import {EP_JOBS, EP_SECTORS} from '../utiles/constants.interface';
import {SectorModel} from '../models/sector.model';

@Injectable()
export class JobsService {

  constructor(private http: AuthHttpService) { }

  public getJobs(): Observable<JobModel[]> {
    return this.http.get(EP_JOBS);
  }

  public getSectors(): Observable<SectorModel[]> {
    return this.http.get(EP_SECTORS);
  }

  public insertJob(model: JobModel): Observable<JobModel> {
    return this.http.post(EP_JOBS, model);
  }

  public updateJob(model: JobModel): Observable<JobModel> {
    return this.http.put(EP_JOBS, model);
  }

  public deleteJob(id: number): Observable<number> {
    return this.http.delete(EP_JOBS + '/' + id);
  }

}
