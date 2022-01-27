import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MoviesMenuService } from '../movies-menu.service';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})
export class PillComponent implements OnInit {

  @Input() title: string;
  @HostBinding('class') get hostClasses() {
    return `${this.moviesMenuService.top10RevenueActive ? 'active-pill' : ''}`;
  }

  constructor(private moviesMenuService: MoviesMenuService) { }

  ngOnInit(): void { }

}
