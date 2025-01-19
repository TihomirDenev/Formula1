import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointsSystem } from '../../interfaces';
import { POINT_SYSTEM, POINT_SYSTEM_HEADER } from './point-system.data';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-point-system',
  imports: [CommonModule, TranslateModule],
  templateUrl: './point-system.component.html',
  styleUrl: './point-system.component.scss',
})
export class PointSystemComponent {
  pointsSystems: PointsSystem[] = POINT_SYSTEM;
  pointSystemHeader: PointsSystem = POINT_SYSTEM_HEADER;
}
