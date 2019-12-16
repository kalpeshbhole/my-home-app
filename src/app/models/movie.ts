import { Cast } from './cast';
import { Crew } from './crew';
import { Genre } from './genre';
import { ProductionCompany } from './production-company';
import { Time } from '@angular/common';

export interface Movie {
   id: string;
   name: string;
   description: string;
   imageUrls: string[];
   url: string;
   releaseDate: Date;
   cast: Cast[];
   crew: Crew[];
   genres: Genre[];
   ProductionCompanies: ProductionCompany[];
   runtime: Time;
   languages: string[];
}