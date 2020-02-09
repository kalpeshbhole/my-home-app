import { Component, OnInit } from '@angular/core';
import { SearchService, MovieService } from 'src/app/services';
import { Movie } from 'src/app/models';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  movies: Movie[] = [];
  error: any;

  constructor(private searchService: SearchService, private movieService: MovieService, private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
  }

  search() {
    this.spinnerService.show();
    this.searchService.SearchMoviesInTMDB(this.searchTerm, 1).subscribe(movies => {
      //this.error = movies;
      this.movies = movies;
      this.spinnerService.hide();
    },
    (err) => {
      this.error = err;
      this.spinnerService.hide();
    });
  }

  add(movieId: string) {
    this.spinnerService.show();
    this.searchService.getMovieFromTMDB(movieId).subscribe(movie => {
      this.searchService.getMovieCreditsFromTMDB(movieId).subscribe(credits => {
        movie.cast = credits.cast;
        movie.crew = credits.crew;
        this.movieService.createMovie(movie);
        this.spinnerService.hide();
        //this.error = movie;
      });
    },
    (err) => {
      this.error = err;
      this.spinnerService.hide();
    });
  }
}
