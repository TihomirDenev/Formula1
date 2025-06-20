import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { RACERS_INFO } from './racers.data';
import { RacerInfo } from '../../interfaces';

@Component({
  selector: 'app-racer',
  imports: [CommonModule, TranslateModule],
  templateUrl: './racer.component.html',
  styleUrl: './racer.component.scss',
})
export class RacerComponent implements OnInit {
  RACER = 'racer';
  RACERS_INFO = RACERS_INFO;

  racer: RacerInfo | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getRacerInfo();
  }

  private getRacerInfo(): void {
    this.route.paramMap.subscribe((params) => {
      const selectedRacer = params.get(this.RACER);

      this.racer = this.RACERS_INFO.find(
        (racer) => racer.identifier === selectedRacer!
      );
    });
  }
}
