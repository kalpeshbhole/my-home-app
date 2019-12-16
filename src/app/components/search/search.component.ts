import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services';
import { Movie } from 'src/app/models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  movies: Movie[] = [];
  error: any;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  search() {
    this.searchService.SearchMoviesInTMDB(this.searchTerm, 1).subscribe(movies => {
      //this.error = movies;
      this.movies = movies;
    },
    (err) => {
      this.error = err;
    });
  }

  add(movieId: string) {
    this.searchService.getMovieFromTMDB(movieId).subscribe(movie => {
      this.error = movie;
    },
    (err) => {
      this.error = err;
    });
  }
}
