import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bestofferviewhome',
  templateUrl: './bestofferviewhome.component.html',
  styleUrls: ['./bestofferviewhome.component.scss'],
})
export class BestofferviewhomeComponent implements OnInit {
  @Input('data') p;//product data

  data: any[];
  constructor() { }

  ngOnInit() {}

}
