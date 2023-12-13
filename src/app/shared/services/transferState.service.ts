import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TransferState } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferStateService {

  constructor(private transferHttp: TransferState) { }

  getData(url, options, callback: () => Observable<any>): Observable<any> {
    const optionsString = options ? JSON.stringify(options) : '';
    let key = `${url + optionsString}`;
    try {
      return this.resolveData(key);
    } catch (e) {
      return callback()
        .pipe(tap((data) => {
          this.setCache(key, data);
        }))
    }
  }

  private resolveData(key) {
    let resultData: any;
    if (this.hasKey(key)) {
      resultData = this.getFromCache(key);
    } else {
      throw new Error()
    }
    return of(resultData)
  }

  private setCache(key, value) {
    this.transferHttp.set(key, value)
  }
  private getFromCache(key) {
    return this.transferHttp.get(key, null) // null set as default value
  }
  private hasKey(key) {
    return this.transferHttp.hasKey(key)
  }
}
