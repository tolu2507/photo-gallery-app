import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  private rootUrl = 'https://tolulopebamisile.000webhostapp.com';

  public url = `${this.rootUrl}/wp-json/wp/v2/posts`;

  public tokenUrl = `${this.rootUrl}/wp-json/jwt-auth/v1/token`;

  public adminDet = {
    username: 'admin',
    password: 'Webhost1234##',
  };

  constructor(private http: HttpClient) {}

  public saveUser(): Observable<any> {
    return this.http.post<any>(this.tokenUrl, this.adminDet);
  }

  public getData(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  public cretaeData(body: Data, option: any): Observable<any> {
    return this.http.post<any>(this.url, body, option);
  }

  public updateData(body: Data, id: string, option: any): Observable<any> {
    return this.http.post<any>(`${this.url}/${id}`, body, option);
  }
}

export interface Data{
  title: string,
  content: string,
  status: string
}
