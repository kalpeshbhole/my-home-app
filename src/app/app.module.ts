import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SearchComponent, EntityListComponent, EntityDetailsComponent } from './components';
import { SearchService, EntityService } from './services';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    EntityDetailsComponent,
    EntityListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    SearchService,
    EntityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
