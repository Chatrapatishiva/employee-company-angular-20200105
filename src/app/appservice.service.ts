import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

  baseUrl = "http://localhost:3000"
  constructor(private http: HttpClient) { }

  login(username: string, password: string, type: string) {
    return this.http.post<any>(this.baseUrl + `/login`, { username: username, password: password, type: type })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user.code != 400) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', user.code);
            }

            return user;
        }));
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}

post(data: any){
  return this.http.post(this.baseUrl + '/insertcompany', data);

}

get(){

  return this.http.get(this.baseUrl + '/viewcompany');
}

delete(data: any){
  return this.http.get(this.baseUrl  + '/delete/'+data);
}

update(id: any, data: any){

  return this.http.post(this.baseUrl  + '/'+id,data);
}


postemployee(data: any){
  return this.http.post(this.baseUrl + '/employee/insertemployee', data);

}

getemployee(){

  return this.http.get(this.baseUrl + '/employee/viewemployee');
}

deleteemployee(data: any){
  return this.http.get(this.baseUrl  + '/employee/delete/'+data);
}

updateemployee(id: any, data: any){

  return this.http.post(this.baseUrl  + '/employee/'+id,data);
}


search(data: any){

  return this.http.post(this.baseUrl + '/common/search', data);

}

}
