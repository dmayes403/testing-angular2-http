import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerService {
  constructor(private http: Http){}

  storeServers(servers: any[]) {
    const headers = new Headers({'Content-Type': 'application/json'})
    // return this.http.post('https://udemy-ng-http.firebaseio.com/data.json', servers, {headers: headers})     // <-- this is an observable, the headers portion is optional
    return this.http.put('https://udemy-ng-http.firebaseio.com/data.json', servers, {headers: headers})     // <-- this is an observable, the headers portion is optional
  }

  getServers() {
    return this.http.get('http://swapi.co/api/people')
      .map(
        (response: Response) => {
          const data = response.json().results;
          for (const person of data) {
            person.name = 'FETCHED_' + person.name;
          }
          console.log(data[0]);
          return data[0].name;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
      )
  }

  // getAppName() {
  //   return this.http.get()
  //     .map(
  //       (response: Response) => {
  //         return response.json();         // <---- used with the pipe async logic
  //       }
  //     )
  // }
}
