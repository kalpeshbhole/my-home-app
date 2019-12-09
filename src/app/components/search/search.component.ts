import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  elements: any[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  search() {
    this.searchService.searchTerm(this.searchTerm, 10).subscribe(elements => {
      this.elements = elements;
    });
  }

}
