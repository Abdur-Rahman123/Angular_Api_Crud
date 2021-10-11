import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashbord.model';
@Component({
  selector: 'app-employee-dashbord',
  templateUrl: './employee-dashbord.component.html',
  styleUrls: ['./employee-dashbord.component.css']
})
export class EmployeeDashbordComponent implements OnInit {

  formValue!: FormGroup;
  EmployeeModelObj:EmployeeModel=new EmployeeModel();
  employeeData!:any;
  showAdd!:boolean;
  searchValue:string;
  showUpdate!:boolean;
  constructor(private formBuilder: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
    this.getAllEmployees();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true; 
    this.showUpdate=false;
  }
  postEmployee(){
    this.EmployeeModelObj.firstName=this.formValue.value.firstName;
    this.EmployeeModelObj.lastName=this.formValue.value.lastName;
    this.EmployeeModelObj.email=this.formValue.value.email;
    this.EmployeeModelObj.mobile=this.formValue.value.mobile;
    this.EmployeeModelObj.salary=this.formValue.value.salary;

    this.api.postEmployee(this.EmployeeModelObj).subscribe(res => {
      console.log(res);
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployees();
    },
    err=>{
      alert("something wrong happened")
    })
  }
  //get employee
  getAllEmployees(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData = res;
    })
  }

  //deleteEmployee
  deleteEmployee(id:number){
    this.api.deleteEmployee(id).subscribe(res=>{
      alert("this employee Deleted");
      this.getAllEmployees();
    })
  }

  onUpdate(row:any){
    this.showAdd=false; 
    this.showUpdate=true;
    this.employeeData.id=row.id;
    this.formValue.controls["firstName"].setValue(row.firstName);
    this.formValue.controls["lastName"].setValue(row.lastName);
    this.formValue.controls["email"].setValue(row.email);
    this.formValue.controls["mobile"].setValue(row.mobile);
    this.formValue.controls["salary"].setValue(row.salary);
  }

  postUpdate(){
    this.EmployeeModelObj.firstName=this.formValue.value.firstName;
    this.EmployeeModelObj.lastName=this.formValue.value.lastName;
    this.EmployeeModelObj.email=this.formValue.value.email;
    this.EmployeeModelObj.mobile=this.formValue.value.mobile;
    this.EmployeeModelObj.salary=this.formValue.value.salary;

    this.api.updateEmployee(this.EmployeeModelObj,this.employeeData.id).subscribe(res => {
      console.log(res);
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployees();
    },
    err=>{
      alert("something wrong happened")
    })
  }

}
