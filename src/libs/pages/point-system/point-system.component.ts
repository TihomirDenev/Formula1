import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PointsSystem } from '@libs/models/points-system.model';
import { POINT_SYSTEM, POINT_SYSTEM_HEADER } from './point-system.data';

@Component({
  selector: 'app-point-system',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './point-system.component.html',
  styleUrl: './point-system.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PointSystemComponent {
  readonly pointsSystems: PointsSystem[] = POINT_SYSTEM;
  readonly pointSystemHeader: PointsSystem = POINT_SYSTEM_HEADER;
}
