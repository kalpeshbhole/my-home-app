import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie, ProductionCompany, Crew, Cast } from '../models';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  service_url: string = 'https://kgsearch.googleapis.com/v1/entities:search';
  wiki_api_url: string = 'https://en.wikipedia.org/w/api.php';
  the_movie_db_search_url: string = 'https://api.themoviedb.org/3/search/movie';
  the_movie_db_movie_url: string = 'https://api.themoviedb.org/3/movie';
  the_movie_db_image_url: string = 'https://image.tmdb.org/t/p/original';
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
      .set('tltemplates', 'Template:Infobox film')
      .set('gapprefix', title)
      .set('gapnamespace', '0')
      .set('gapfilterredir', 'nonredirects')
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

  //Themoviedb.org
  SearchMoviesInTMDB(title: string, page: number) {
    const params = new HttpParams()
      .set('api_key', '9541c22073c3d2aa3521d1a99c015460')
      .set('include_adult', 'false')
      .set('language', 'en-US')
      .set('query', title)
      .set('page', page.toString());

    return this.httpClient.get<Movie[]>(this.the_movie_db_search_url, { params }).pipe(
      map(response => {
        return response['results'].map(movie => {
          return {
            id: movie['id'],
            name: movie['title'],
            description: movie['overview'],
            imageUrls: [movie['poster_path'] ? this.the_movie_db_image_url + movie['poster_path']: ''],
            url: '',
            releaseDate: movie['release_date']
          } as Movie;
        })
      })
    );
  }

  //Themoviedb.org
  getMovieFromTMDB(movieId: string) {
    const params = new HttpParams()
      .set('api_key', '9541c22073c3d2aa3521d1a99c015460')
      .set('language', 'en-US');

    return this.httpClient.get<Movie>(this.the_movie_db_movie_url + '/' + movieId, { params }).pipe(
      map(movie => {
        return {
          id: movie['id'],
          name: movie['title'],
          description: movie['overview'],
          imageUrls: [this.the_movie_db_image_url + movie['poster_path']],
          url: '',
          releaseDate: movie['release_date'],
          ProductionCompanies: _.map(movie['production_companies'], (productionCompany) => {
            return {
              id: productionCompany['id'],
              name: productionCompany['name'],
              logoImageUrl: productionCompany['logo_path'] ? this.the_movie_db_image_url + productionCompany['logo_path']: '',
              country: _.result(_.find(movie['production_countries'], country => {
                return country['iso_3166_1'] === productionCompany['origin_country'];
              }), 'name')
            } as ProductionCompany;
          }),
          genres: movie['genres'],
          languages: _.map(movie['spoken_languages'], 'name'),
          runtime: movie['runtime']
        } as Movie;
      })
    );
  }

  getMovieCreditsFromTMDB(movieId: string) {
    const params = new HttpParams()
      .set('api_key', '9541c22073c3d2aa3521d1a99c015460');

    return this.httpClient.get<any>(this.the_movie_db_movie_url + '/' + movieId + '/credits', { params }).pipe(
      map(credits => {
        return {
          cast: _.map(credits['cast'], (cast) => {
            return {
              id: cast['credit_id'],
              character: cast['character'],
              gender: cast['gender'],
              name: cast['name'],
              order: cast['order'],
              profileImageUrl: cast['profile_path'] ? this.the_movie_db_image_url + cast['profile_path']: ''
            } as Cast;
          }),
          crew: _.map(credits['crew'], (crew) => {
            return {
              id: crew['credit_id'],
              department: crew['department'],
              gender: crew['gender'],
              name: crew['name'],
              job: crew['job'],
              profileImageUrl: crew['profile_path'] ? this.the_movie_db_image_url + crew['profile_path']: ''
            } as Crew;
          }),
        };
      })
    );
  }

}
