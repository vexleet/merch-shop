import { ActivatedRoute } from '@angular/router';
import { IMerch } from './../../../core/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merch-shop',
  templateUrl: './merch-shop.component.html',
  styleUrls: ['./merch-shop.component.scss']
})
export class MerchShopComponent implements OnInit {
  merch: Array<IMerch>;
  private _merch: Array<IMerch>;

  sortByOptions: Array<object> = [
    { label: 'Alphabetically, A-Z', value: 'a-to-z' },
    { label: 'Alphabetically, Z-A', value: 'z-to-a' },
    { label: 'Price, low to high', value: 'low-to-high' },
    { label: 'Price, high to low', value: 'high-to-low' },
  ];

  filterByOptions: Array<object> = [
    { label: 'All', value: 'all' },
    { label: 'Shirt', value: 'shirt' },
    { label: 'Hat', value: 'hat' },
    { label: 'Hoodie', value: 'hoodie' },
  ];

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.merch = this.route.snapshot.data['merch'].data;
    this._merch = this.merch;
    this.sortMerch('a-to-z');
  }

  searchMerch(toSearch: string, filterBy: string, sortBy: string) {
    this.merch = this._merch.filter(merch => merch.merchName.includes(toSearch)
      && ('all' === filterBy ? true : merch.typeOfMerch.toLowerCase() === filterBy));

    this.sortMerch(sortBy);
  }

  sortMerch(sortBy: string) {
    switch (sortBy) {
      case 'a-to-z':
        this.merch = this.merch.sort((a, b) => {
          const nameA = a.merchName.toLowerCase();
          const nameB = b.merchName.toLowerCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
        break;

      case 'z-to-a':
        this.merch = this.merch.sort((a, b) => {
          const nameA = a.merchName.toLowerCase();
          const nameB = b.merchName.toLowerCase();

          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }

          return 0;
        });
        break;

      case 'low-to-high':
        this.merch = this.merch.sort((a, b) => a.price - b.price);
        break;

      case 'high-to-low':
        this.merch = this.merch.sort((a, b) => b.price - a.price);
        break;
    }

  }

  filterMerch(filterBy: string, toSearch: string, sortBy: string) {
    if (toSearch !== '') {
      this.searchMerch(toSearch, filterBy, sortBy);

      return;
    }

    if (filterBy === 'all') {
      this.merch = this._merch;

      return;
    }

    this.merch = this._merch.filter((x) => x.typeOfMerch.toLowerCase() === filterBy);
  }

}
