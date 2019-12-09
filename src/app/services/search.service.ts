import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchParameters } from '../models';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  service_url: string = 'https://kgsearch.googleapis.com/v1/entities:search';

  constructor(private httpClient: HttpClient) { }

  searchTerm(query: string, limit: number) {
    const params = new HttpParams()
      .set('query', query)
      .set('limit', limit.toString())
      .set('indent', 'true')
      .set('key', 'AIzaSyAg2onbjaE3fg1DPQ_1Lp-b-SkzX94rJNs')
      .set('types', 'Movie');

    return this.httpClient.get(this.service_url, { params }).pipe(
      map(response => {
        return response['itemListElement'].map(element => {
          return element.result;
        })
      })
    );
  }
}
