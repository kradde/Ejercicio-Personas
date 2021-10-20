import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class MainService {
        
    constructor(private http: HttpClient) {}

    getData() {
        return this.http.get('https://randomapi.com/api/c304dfa46ddd0de759a3c99a32b8b62d');
    }

}