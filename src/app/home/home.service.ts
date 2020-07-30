import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private appService : AppService) { }
  private baseUrl = 'Task';

  public GetTaskDetails() {
    return this.appService.Get('Task');
  }
  public GetTaskDetailByID(id:string) {    
    return this.appService.Get('Task/'+id);
  }
  public CreateTask(reqObject) { 
    return this.appService.Post('Task',reqObject);
  }

  public UpdateTask(uniquekey,reqObject){
    
    return this.appService.Put(`Task/${uniquekey}`,reqObject);
  }
  public DeleteTask(page){
    return this.appService.Delete(`Task/${page}`);
    
  }


}
