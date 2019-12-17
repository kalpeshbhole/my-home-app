import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services';
import { map } from 'rxjs/operators';
import { Movie } from 'src/app/models';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];
 
  constructor(private movieService: MovieService) { }
 
  ngOnInit() {
    this.getMoviesList();
  }
 
  getMoviesList() {
    this.movieService.getMoviesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(movies => {
      this.movies = movies;
    });
  }

}
