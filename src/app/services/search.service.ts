import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../models';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  service_url: string = 'https://kgsearch.googleapis.com/v1/entities:search';
wiki_api_url: string = 'https://en.wikipedia.org/w/api.php';
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
          return {
            id: element['result']['@id'],
            name: element['result']['name'],
            description: element['result']['description'],
            imageUrls: element['result']['image'] === undefined ? [] : [element['result']['image']['url']],
            url: element['result']['url']
          } as Movie;
        })
      })
    );
  }


  searchTitle(title: string, limit: number) {

    const params = new HttpParams()
      .set('action', 'query')
      .set('format', 'json')
      .set('prop', 'info|images|templates')
      .set('list', '')
      .set('generator', 'allpages')
      .set('inprop', 'url')
      .set('tltemplates', 'Template:Infobox film' )
      .set('gapprefix', title)
      .set('gapnamespace', '0')
      .set('gapfilterredir','nonredirects')
      .set('gaplimit', limit.toString());

    return this.httpClient.get<Movie[]>(this.wiki_api_url, { params }).pipe(
      map(response => {
        return response['query']['pages'].map(page => {
          return {
            id: page['pageid'],
            name: page['title'],
            imageUrls: _.map(page['images'], (image) => {
              return 'https://en.wikipedia.org/wiki/' + image.title;
            }),
            url: page['fullurl']
          } as Movie;
        })
      })
    );
  }
}
