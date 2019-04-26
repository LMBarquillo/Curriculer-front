import {Injectable} from '@angular/core';
import {AuthHttpService} from './auth-http.service';
import {Observable} from 'rxjs/Observable';
import {JobModel} from '../models/job.model';
import {EP_JOBS} from '../utiles/constants.interface';

@Injectable()
export class JobsService {

  constructor(private http: AuthHttpService) { }

  public getJobs(): Observable<JobModel[]> {
    return this.http.get(EP_JOBS);
  }

}
