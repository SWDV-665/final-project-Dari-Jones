import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject }    from 'rxjs';


/*
  Generated class for the InventoryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InventoryServiceProvider {

  items: any = [];
  photo: any = [];

  dataChanged$: Observable<boolean>;    // Creates Observable

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080";    // Base URL is localhost:8080

  constructor(public http: HttpClient) {
    console.log('Hello InventoryServiceProvider Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
  
  getItems(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/groceries').pipe(   // GET request utilizes localhost:8080/api/petinventory
      map(this.extractData),
      catchError(this.handleError)
      );
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  // removeItem(id) {
  //   console.log("#### Remove Item - id = ", id);
  //   this.http.delete(this.baseURL + "/api/petinventory/" + id).subscribe(res => {
  //     this.items = res;
  //     this.dataChangeSubject.next(true);
  //   });
  // }

  // addItem(item) {
  //   this.http.post(this.baseURL + "/api/petinventory", item).subscribe(res => {
  //     this.items = res;
  //     this.dataChangeSubject.next(true);
  //   });
  // }

  // editItem(item, index) {
  //   console.log("Editing item = ", item);
  //   this.http.put(this.baseURL + "/api/petinventory/" + item._id, item).subscribe(res => {
  //     this.items = res;
  //     this.dataChangeSubject.next(true);
  //   });
  // }
  
  removeItem(id) {
    console.log("#### Remove Item - id = ", id);
    this.http.delete(this.baseURL + "/api/groceries/" + id).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  addItem(item) {
    this.http.post(this.baseURL + "/api/groceries", item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  editItem(item, index) {
    console.log("Editing item = ", item);
    this.http.put(this.baseURL + "/api/groceries/" + item._id, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }
 

}
