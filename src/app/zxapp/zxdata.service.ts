import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZXDataService {

  // private HOST = 'http://localhost:3000/admin';
  private HOST = 'http://208.109.188.236:3000/admin';


  constructor(private http: HttpClient) { }

  GET(url: string): Observable<any> {
    return this.http.get(this.HOST + url);
  }

  // GET1(url: string, params: any): Observable<any> {
  //   return this.http.get(`${this.HOST}${url}`, { params });
  // }

  POST(url: string, body: any): Observable<any> {
    return this.http.post(`${this.HOST}${url}`, body);
  }

  PUT(url: string, body: any): Observable<any> {
    console.log(body);
    return this.http.put(`${this.HOST}${url}`, body);
  }

  DELETE(url: string): Observable<any> {
    return this.http.delete(this.HOST + url);
  }
}
