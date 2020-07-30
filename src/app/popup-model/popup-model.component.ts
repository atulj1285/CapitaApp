import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MainTaskObj, TaskObj } from '../model/task.model';
import { HomeService } from '../home/home.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-popup-model',
  templateUrl: './popup-model.component.html',
  styleUrls: ['./popup-model.component.scss']
})
export class PopupModelComponent implements OnInit {
data:any;
showBtn;
popupData;
  constructor(public bsModalRef: BsModalRef,private homeService: HomeService,
    private notifyService:NotificationService) { }

  ngOnInit() {
    console.log(this.data);
    if(JSON.stringify(this.data)=='{}'){
      this.showBtn=true;
       
    }
    else{
      this.showBtn=false;
    }
    
  }
  onCancelClick() {
    this.bsModalRef.hide();
  }
  
  public onCreateTask(datas) {
    let obj: TaskObj = {
      id: datas.id,
      priority: datas.priority,
      description: datas.description,
      status: datas.status,
      shortDesc:datas.shortDesc

    }
     
    return this.homeService.CreateTask(obj).subscribe((response) => {       
      if (response) {   
        this.bsModalRef.hide(); 
        this.notifyService.showSuccess("Data created successfully !!", "Create")
      }
    });
  }
  
  public onUpdateTask(obj) {
    let objtoPass: TaskObj = {
      id: obj.id,
      priority:obj.priority,
      description:obj.description,
      status: obj.status,
      shortDesc:obj.shortDesc
    }
    return this.homeService.UpdateTask(obj.uniqueKey , objtoPass).subscribe((response) => {
       
      if (response) {
        this.bsModalRef.hide(); 
        this.notifyService.showSuccess("Data updated successfully !!", "Update")
      }
    });
  }

}
