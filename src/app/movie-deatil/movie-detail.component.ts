import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieFullDescription } from '../models/movie';

@Component({
  selector: 'app-movie-deatil',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {


  constructor(
    public dialogRef: MatDialogRef<MovieDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public movie: MovieFullDescription,
  ) { }


  closeDialog(): void {

    this.dialogRef.close();

  }
}
