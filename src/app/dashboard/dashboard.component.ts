import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import Swal from 'sweetalert2';
import { AppserviceService } from './../appservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  datas: any;
  tobeEdited: any;
  inTab: any;
  modalRef!: BsModalRef;
  formData: FormData = new FormData();
  errorMsg: ErrorMsg = new ErrorMsg();
  formDataSearch: FormDataSearch=new FormDataSearch();

  errorMsgSearch: ErrorMsgSearch=new ErrorMsgSearch();

  constructor(
    private modalService: BsModalService,
    private apiService: AppserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onCompanyView();
  }
  //delete data
  onDelete(selectedItem: any) {
    console.log(selectedItem);
    this.apiService.delete(selectedItem._id).subscribe(
      (res) => {
        this.datas = this.datas.slice(selectedItem._id);
        this.onCompanyView();
        Swal.fire(selectedItem.name + ' ' + res);
      },
      (error) => {
        console.log(error);
      }
    );

    console.log('Selected item Id: ', selectedItem._id); //get the Id of the selected item here
  }


   //delete data
   onemployeeDelete(selectedItem: any) {
    console.log(selectedItem);
    this.apiService.deleteemployee(selectedItem._id).subscribe(
      (res) => {
        this.datas = this.datas.slice(selectedItem._id);
        this.onEmployeeView();
        Swal.fire(selectedItem.name + ' ' + res);
      },
      (error) => {
        console.log(error);
      }
    );

    console.log('Selected item Id: ', selectedItem._id); //get the Id of the selected item here
  }

  //get all data
  onCompanyView() {
    this.datas = [];
    this.inTab = 'company';
    this.apiService.get().subscribe(
      (res) => {
        this.datas = res;
        console.log(this.datas);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onEmployeeView() {
    this.datas = [];
    this.inTab = 'employee';
    this.apiService.getemployee().subscribe(
      (res) => {
        this.datas = res;
        console.log(this.datas);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //update data
  onUpdate() {
    this.errorMsg.name = this.errorMsg.type = this.errorMsg.address = '';
    !this.formData.name ? (this.errorMsg.name = 'Name Required') : '';
    !this.formData.type ? (this.errorMsg.type = 'Type Required') : '';
    !this.formData.address ? (this.errorMsg.address = 'Address Required') : '';

    if (!this.formData.name || !this.formData.type || !this.formData.address) {
      return;
    }
    this.apiService.update(this.tobeEdited._id, this.formData).subscribe(
      (res) => {
        this.modalRef.hide();
        this.datas = this.onCompanyView();
        this.onCompanyView();
        Swal.fire(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //update data
  onEmployeeUpdate() {
    this.errorMsg.name = this.errorMsg.type = this.errorMsg.address = '';
    !this.formData.name ? (this.errorMsg.name = 'Name Required') : '';
    !this.formData.manager ? (this.errorMsg.manager = 'Manager Required') : '';
    !this.formData.address ? (this.errorMsg.address = 'Address Required') : '';
    !this.formData.cname ? (this.errorMsg.cname = 'Company Required') : '';
    !this.formData.eid ? (this.errorMsg.eid = 'Employee ID Required') : '';
    !this.formData.phone ? (this.errorMsg.phone = 'Phone Number Required') : '';


    if (!this.formData.name || !this.formData.manager || !this.formData.address || !this.formData.cname || !this.formData.eid || !this.formData.phone) {
      return;
    }
    this.apiService.updateemployee(this.tobeEdited._id, this.formData).subscribe(
      (res) => {
        this.modalRef.hide();
        this.datas = this.onEmployeeView();
        this.onEmployeeView();
        Swal.fire(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //upload data
  onSave() {
    this.errorMsg.name = this.errorMsg.type = this.errorMsg.address = '';
    !this.formData.name ? (this.errorMsg.name = 'Name Required') : '';
    !this.formData.type ? (this.errorMsg.type = 'Type Required') : '';
    !this.formData.address ? (this.errorMsg.address = 'Address Required') : '';

    if (!this.formData.name || !this.formData.type || !this.formData.address) {
      return;
    }
    this.apiService.post(this.formData).subscribe(
      (res) => {
        this.modalRef.hide();
        this.datas = this.onCompanyView();
        this.onCompanyView();
        Swal.fire(res);
        console.log(res);
        this.formData.address = this.formData.type = this.formData.name = '';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //upload data
  onEmployeeSave() {
    this.errorMsg.name = this.errorMsg.type = this.errorMsg.address = '';
    !this.formData.name ? (this.errorMsg.name = 'Name Required') : '';
    !this.formData.manager ? (this.errorMsg.manager = 'Manager Required') : '';
    !this.formData.address ? (this.errorMsg.address = 'Address Required') : '';
    !this.formData.cname ? (this.errorMsg.cname = 'Company Required') : '';
    !this.formData.eid ? (this.errorMsg.eid = 'Employee ID Required') : '';
    !this.formData.phone ? (this.errorMsg.phone = 'Phone Number Required') : '';


    if (!this.formData.address || !this.formData.cname || !this.formData.eid || !this.formData.manager || !this.formData.name || !this.formData.phone) {
      return;
    }

    this.apiService.postemployee(this.formData).subscribe(
      (res) => {
        this.modalRef.hide();
        this.datas = this.onEmployeeView();
        this.onEmployeeView();
        Swal.fire(res);
        console.log(res);
        this.formData.address = this.formData.manager = this.formData.name = this.formData.cname = this.formData.eid =  this.formData.phone  ='';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalEdit(template: TemplateRef<any>, selectedItem: any) {
    this.modalRef = this.modalService.show(template);
    this.formData.name = selectedItem.name;
    this.formData.type = selectedItem.type;
    this.formData.manager = selectedItem.manager;
    this.formData.address = selectedItem.address;
    this.formData.eid = selectedItem.eid;
    this.formData.phone = selectedItem.phone;
    this.formData.cname = selectedItem.cname;
    this.tobeEdited = selectedItem;
  }

  tab(data: any) {
    this.inTab = data;
  }

  onSearch(){

    this.errorMsgSearch.SearchString=this.errorMsgSearch.SearchString='';

    if(!this.formDataSearch.SearchString){

      return;

    }

    this.apiService.search(this.formDataSearch).subscribe(res=>{
       this.datas = []
      this.datas=res;

      console.log(this.datas);

    },error=>{
      console.log(error);
    })



}

logout() {
  this.apiService.logout();
   this.router.navigate(['/login'])
}
}

class FormData {
  name: any;
  type: any;
  address: any;
  cname: any;
  manager: any;
  eid: any;
  phone: any;
}
class ErrorMsg {
  name: any;
  type: any;
  address: any;
  cname: any;
  manager: any;
  eid: any;
  phone: any;

}

class FormDataSearch {
  SearchString: any;
  }
class ErrorMsgSearch {
  SearchString: any;
}
