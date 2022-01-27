import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesMenuComponent } from './movies-menu.component';

describe('MoviesMenuComponent', () => {
  let component: MoviesMenuComponent;
  let fixture: ComponentFixture<MoviesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
