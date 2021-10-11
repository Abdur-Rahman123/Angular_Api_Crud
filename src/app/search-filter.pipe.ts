import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeModel } from './employee-dashbord/employee-dashbord.model';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'searchFilter'
})

export class SearchFilterPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(EmployeeModels:EmployeeModel[],searhValue:string): any {
 
  
   if(!EmployeeModels || !searhValue){
    return EmployeeModels;
   }
   let abc= EmployeeModels.filter(employee => employee.firstName.toLocaleLowerCase()
   .includes(searhValue.toLocaleLowerCase())||employee.lastName.toLocaleLowerCase()
   .includes(searhValue.toLocaleLowerCase())||employee.email.toLocaleLowerCase()
   .includes(searhValue.toLocaleLowerCase())||employee.salary.toString().toLocaleLowerCase()
   .includes(searhValue.toLocaleLowerCase())||employee.mobile.toString().toLocaleLowerCase()
   .includes(searhValue.toLocaleLowerCase())
   );
    if(abc.length==0){
      console.log('no data found'); 
      
     // return this.sanitizer.bypassSecurityTrustHtml();
    }else{
      console.log(abc);
      
      return abc;
    }
  
   
  }

}
