import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieDetailComponent } from './movie-deatil/movie-detail.component';
import { MovieRankingComponent } from './movie-ranking/movie-ranking.component';
import {
  MoviesListTop10RevenuePerYearComponent,
} from './movies-list-top10-revenue-per-year/movies-list-top10-revenue-per-year.component';
import { MoviesListTop10Component } from './movies-list-top10/movies-list-top10.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { PillComponent } from './pill/pill.component';
import { YearSelectComponent } from './year-select/year-select.component';
import { MoviesSearchComponent } from './movies-search/movies-search.component';
import { MoviesMenuComponent } from './movies-menu/movies-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieRankingComponent,
    NavbarTopComponent,
    PillComponent,
    MoviesListComponent,
    MoviesListTop10Component,
    MovieDetailComponent,
    MoviesListTop10RevenuePerYearComponent,
    YearSelectComponent,
    MoviesSearchComponent,
    MoviesMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
