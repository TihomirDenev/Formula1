import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InfiniteScrollModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}
