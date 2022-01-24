import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListTop10Component } from './movies-list-top10.component';

describe('MoviesListTop10Component', () => {
  let component: MoviesListTop10Component;
  let fixture: ComponentFixture<MoviesListTop10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesListTop10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListTop10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
