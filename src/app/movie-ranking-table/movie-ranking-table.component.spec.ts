import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRankingTableComponent } from './movie-ranking-table.component';

describe('MovieRankingTableComponent', () => {
  let component: MovieRankingTableComponent;
  let fixture: ComponentFixture<MovieRankingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieRankingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRankingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
