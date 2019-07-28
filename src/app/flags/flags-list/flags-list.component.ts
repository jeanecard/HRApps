import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flags-list',
  templateUrl: './flags-list.component.html',
  styleUrls: ['./flags-list.component.scss']
})
export class FlagsListComponent implements OnInit {
  columnCount = 3;
  cards = [
    {
      title: 'Afghanistan', alt: 'Bird', src: 'https://restcountries.eu/data/afg.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'France', alt: 'Bird', src: 'https://restcountries.eu/data/fra.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'USA', alt: 'Bird', src: 'https://restcountries.eu/data/usa.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Brazil', alt: 'Bird', src: 'https://restcountries.eu/data/bra.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Sweden', alt: 'Bird', src: 'https://restcountries.eu/data/swe.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Argentine', alt: 'Bird', src: 'https://restcountries.eu/data/arg.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Perou', alt: 'Bird', src: 'https://restcountries.eu/data/per.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Thailand', alt: 'Bird', src: 'https://restcountries.eu/data/tha.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Tunisia', alt: 'Bird', src: 'https://restcountries.eu/data/tun.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Ukraine', alt: 'Bird', src: 'https://restcountries.eu/data/ukr.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Norway', alt: 'Bird', src: 'https://restcountries.eu/data/nor.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Oman', alt: 'Bird', src: 'https://restcountries.eu/data/omn.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Pakistan', alt: 'Bird', src: 'https://restcountries.eu/data/pak.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'New Zealand', alt: 'Bird', src: 'https://restcountries.eu/data/nzl.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Portugal', alt: 'Bird', src: 'https://restcountries.eu/data/prt.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Puerto rico', alt: 'Bird', src: 'https://restcountries.eu/data/pri.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Mexico', alt: 'Bird', src: 'https://restcountries.eu/data/mex.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Mozambique', alt: 'Bird', src: 'https://restcountries.eu/data/moz.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Italy', alt: 'Bird', src: 'https://restcountries.eu/data/ita.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Islamic republic of Iran', alt: 'Bird', src: 'https://restcountries.eu/data/irn.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Iraq', alt: 'Bird', src: 'https://restcountries.eu/data/irq.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Jamaica', alt: 'Bird', src: 'https://restcountries.eu/data/jam.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Greece', alt: 'Bird', src: 'https://restcountries.eu/data/grc.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Grenada', alt: 'Bird', src: 'https://restcountries.eu/data/grd.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'French Guiana', alt: 'Bird', src: 'https://restcountries.eu/data/guf.svg', textImage: 'truc', reDirect: '/ornithology'
    },
    {
      title: 'Hong Kong', alt: 'Bird', src: 'https://restcountries.eu/data/hkg.svg', textImage: 'truc', reDirect: '/ornithology'
    }
  ];

  constructor() { }

  ngOnInit() {
  }
  onResize(event: any): void {
    if (event.target.innerWidth <= 700) {
      this.columnCount = 1;
    } else if (event.target.innerWidth <= 800) {
      this.columnCount = 2;
    } else if (event.target.innerWidth <= 1500) {
      this.columnCount = 3;
    } else {
      this.columnCount = 4;
    }
  }
}
