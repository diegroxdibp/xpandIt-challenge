import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieDetailComponent } from './movie-deatil/movie-detail.component';
import { MovieRankingComponent } from './movie-ranking/movie-ranking.component';
import { MoviesListTop10Component } from './movies-list-top10/movies-list-top10.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { PillComponent } from './pill/pill.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieRankingComponent,
    NavbarTopComponent,
    PillComponent,
    MoviesListComponent,
    MoviesListTop10Component,
    MovieDetailComponent,
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
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
