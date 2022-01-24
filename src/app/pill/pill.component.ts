import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { PillsStatusService } from '../pills-status.service';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})
export class PillComponent implements OnInit {

  @Input() title: string;
  @HostBinding('class') get hostClasses() {
    return `${this.pillsService.top10RevenueActive ? 'active-pill' : ''}`;
  }

  constructor(private pillsService: PillsStatusService) { }

  ngOnInit(): void { }

}
