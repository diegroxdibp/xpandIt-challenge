import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRankingComponent } from './movie-ranking.component';

describe('MovieRankingComponent', () => {
  let component: MovieRankingComponent;
  let fixture: ComponentFixture<MovieRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
