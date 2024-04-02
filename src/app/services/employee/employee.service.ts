import { Observable } from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Employee} from "../../employee";
import {environment} from "src/environments/environment"
import {ConfigService} from "../config/config.service";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private configService: ConfigService, private http: HttpClient) {}

  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${id}`);
  }

  public findEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiServerUrl}/employee/findEmployeeById/${employeeId}`);
  }

  public findEmployeeByCode(employeeCode: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiServerUrl}/employee/findEmployeeByCode/${employeeCode}`);
  }
}
