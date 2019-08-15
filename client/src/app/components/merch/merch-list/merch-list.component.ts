import { IMerch } from './../../../core/models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-merch-list',
  templateUrl: './merch-list.component.html',
  styleUrls: ['./merch-list.component.scss']
})
export class MerchListComponent implements OnInit {
  @Input() merch: Array<IMerch>;

  constructor() { }

  ngOnInit() { }


}
