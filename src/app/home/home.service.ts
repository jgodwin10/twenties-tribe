import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    private jsonUrl = 'assets/couponDataTest.json'; // Path to JSON file

    constructor(private http: HttpClient) {}

    getData(): Observable<any> {
        // console.log(this.http.get<any>(this.jsonUrl));
        return this.http.get<any>(this.jsonUrl);
    }
}
