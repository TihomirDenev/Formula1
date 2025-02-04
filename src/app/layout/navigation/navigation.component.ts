import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  constructor(
    private translateService: TranslateService,
    private router: Router
  ) {}

  translateText(lang: string) {
    this.translateService.use(lang);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
