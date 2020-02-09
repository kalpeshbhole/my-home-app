import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent, MovieListComponent, MovieDetailsComponent, DashboardComponent } from './components';


const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  // { path: 'dashboard', component: DashboardComponent },
  { path: '', component: DashboardComponent },
  { path: 'search', component: SearchComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movie/:movieId', component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
