import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
 import { TaskObj, MainTaskObj } from '../model/task.model';
 
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PopupModelComponent } from '../popup-model/popup-model.component';
import { element } from 'protractor';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationService } from '../notification.service';

 export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string; 
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  taskList=[];
  arrayKeys=[];
  modalRef: BsModalRef;
  dataSource;
  title='Capita';
  modalConfirmRef: BsModalRef;
  bsmodalSubscribe;
  displayedColumns : string[];
  constructor(private homeService: HomeService,private modalService: BsModalService,
    private notifyService : NotificationService) {
    this.getTaskList();
  }

  ngOnInit() { 
   
  }
  openModal(element:MainTaskObj) {
    const modalRef = this.modalService.show(PopupModelComponent,  {
      initialState: {
        title: 'Modal title',
        data:(element ==undefined) ? {}: element
      }
    });
    this.modalConfirmRef = modalRef;
    this.bsmodalSubscribe = this.modalService.onHide.subscribe(async () => {
      this.getTaskList();
      if (this.modalConfirmRef.content.showToast === true) {       
        this.modalConfirmRef.content.showToast = false;
        
      }
    });
  }

  getTaskList(){
    this.homeService.GetTaskDetails().subscribe((response) => {
   
      if (response) {
          this.taskList= Object.values(response);
          this.arrayKeys= Object.keys(response);         
         for(let i=0;i< Object.keys(response).length;i++){
          this.taskList[i]['uniqueKey']=this.arrayKeys[i];
         }
         console.log(this.taskList);
         this.displayedColumns  = [ 'shortDesc','description','update'];
         this.dataSource = this.taskList;
         
      }
    });
  }

  getTaskDetailsByID(id: string) {
    this.homeService.GetTaskDetailByID(id).subscribe((response) => {
      if (response) {
      }
    });
  }


  public DeleteTask(element:any) {  
    
    return this.homeService.DeleteTask(element.uniqueKey).subscribe((response) => {
      this.getTaskList();
      if (response) {
        this.notifyService.showSuccess("Records deleted successfully !!", "Delete")
       
      }
    });
  }

  openToastr(){
    this.notifyService.showSuccess("Data shown successfully !!", "Success")
  }





}
