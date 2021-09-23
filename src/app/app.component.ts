import {Component, OnInit} from '@angular/core';
import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees: Employee[] | undefined;
  public editEmployee: Employee | null | undefined;
  public deleteEmployee: Employee | null | undefined;

  constructor(private employeeService: EmployeeService) {
  }

  public getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      }
    ), (error: HttpErrorResponse) => {
      alert(error.message);
    }
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-toggle', '#addEmployeeModal');
    } else if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-toggle', '#updateEmployeeModal');
    } else if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-toggle', '#deleteEmployeeModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public onAddEmployee(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number): void {
    if (employeeId !== null)
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    // @ts-ignore
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key){
      this.getEmployees();
    }
  }
}
