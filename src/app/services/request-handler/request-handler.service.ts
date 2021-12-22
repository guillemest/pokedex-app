import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestHandlerService {
  private timeOut = 60000;
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  doGet(url: string, params?: HttpParams): Promise<Object> {
    const httpHeaders = new HttpHeaders().set('Accept', 'application/json');
    const bodyRequest = { headers: httpHeaders, params: {} };

    if (params) {
      bodyRequest.params = params;
    }

    return this.http
      .get(this.baseUrl + url, bodyRequest)
      .pipe(
        timeout(this.timeOut),
        catchError((e) => {
          return throwError(this.handleError(e));
        })
      )
      .toPromise()
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  }


  handleError(httpErrorResponse: HttpErrorResponse): string {
    let errorMessage = 'Unknown error';
    if (
      !(httpErrorResponse.error instanceof ErrorEvent) &&
      !(httpErrorResponse.error instanceof ProgressEvent)
    ) {
      errorMessage = `Error: ${httpErrorResponse.error.message}`;
    } else {
      errorMessage = `Message: ${httpErrorResponse.message}`;
    }
    return errorMessage;
  }
}
