import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import {
  HOME_CONSTANTS,
  HOME_INFO_SECTIONS,
  HOME_STATS,
  HOME_VIDEOS,
} from '@libs/constants/home.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly c = HOME_CONSTANTS;
  readonly stats = HOME_STATS;
  readonly sections = HOME_INFO_SECTIONS;
  readonly videos = HOME_VIDEOS;
}
