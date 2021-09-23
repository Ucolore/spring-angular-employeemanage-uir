import {Component, OnInit} from '@angular/core';
import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees: Employee[] | undefined;

  constructor(private employeeService: EmployeeService) {}

  public getEmployees(): void{
    this.employeeService.getAllEmployees().subscribe(
      (response: Employee[]) => { this.employees = response;}
    ), (error: HttpErrorResponse) => {alert(error.message);}
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  public onOpenModal (employee: Employee, mode: string) : void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode === 'add'){
      button.setAttribute('data-toggle','#addEmployeeModal');
    } else if (mode === 'edit'){
      button.setAttribute('data-toggle','#updateEmployeeModal');
    }else if (mode === 'delete') {
      button.setAttribute('data-toggle','#deleteEmployeeModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
}
