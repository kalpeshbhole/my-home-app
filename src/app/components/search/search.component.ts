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
    this.searchService.searchTitle(this.searchTerm, 10).subscribe(movies => {
      this.error = movies;
      this.movies = movies;
    },
    (err) => {
      this.error = err;
    });
  }

}
