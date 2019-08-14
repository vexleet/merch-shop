import { Component, OnInit } from '@angular/core';
import { IMerch } from 'src/app/core/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  merch: Array<IMerch>;

  constructor(
    private route: ActivatedRoute) {
    this.merch = this.route.snapshot.data['merch'].data;
  }

  ngOnInit() {
  }

}
