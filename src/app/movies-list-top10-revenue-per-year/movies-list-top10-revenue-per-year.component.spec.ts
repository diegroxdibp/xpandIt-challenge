import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListTop10RevenuePerYearComponent } from './movies-list-top10-revenue-per-year.component';

describe('MoviesListTop10RevenuePerYearComponent', () => {
  let component: MoviesListTop10RevenuePerYearComponent;
  let fixture: ComponentFixture<MoviesListTop10RevenuePerYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesListTop10RevenuePerYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListTop10RevenuePerYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
