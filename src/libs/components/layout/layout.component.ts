import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavigationComponent } from '@libs/components/navigation/navigation.component';
import { FooterComponent } from '@libs/components/footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styles: [`main { max-width: 85rem; margin: auto; }`],
  imports: [RouterOutlet, NavigationComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
