import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  SPExtension = "https://tasksmanager-302f5.firebaseio.com"; 
  jsonFormat='.json';

  constructor(
    private http: HttpClient
  ) { }

  public Get(action: string, resource?: any, config?: any) {
    //    const url = https://tasksmanager-302f5.firebaseio.com/Task.json;
    const url = this.SPExtension +'/'+ action + this.jsonFormat; //+ this.SPExtension;
    return this.http.get(url)
      .map(response => response);
  }
  public Put(action: string, resource?: any, config?: any) {
    const url = this.SPExtension +'/'+ action + this.jsonFormat;
    return this.http.put(url, resource)
      .map(response => response)
      .catch(this.handleError);
  }

  public Post(action: string, resource?: any, config?: any) {
    //const url = this.API_BASE_ENDPOINT_URL + action;
   
    const url = this.SPExtension +'/'+ action + this.jsonFormat;//+ this.SPExtensionPost;
     
    return this.http.post(url, resource)
      .map(response => response);
  }
  
  public Delete(action: string, id?: any, config?: any) {
    const url = this.SPExtension +'/'+ action + this.jsonFormat; // + '/' + id;
    return this.http.delete(url)
      .catch(this.handleError);
  }

  public handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw("Error: 400");
    }
    if (error.status === 404) {
      return Observable.throw("Error: 404");
    }
    if (error.status === 417) {
      return Observable.throw("Error: 417");
    }
    return Observable.throw("Error occured at server side.!!!!!!");
  }

}
