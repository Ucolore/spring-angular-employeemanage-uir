import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) {}

  public httpGet(url: string): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(url);
  }
  public httpPost(data:object, url:string): Observable<any> {
    return this.http.post<any>(url, data);
  }
  public httpDelete(url:string): Observable<any> {
    return this.http.delete<any>(url);
  }
}
