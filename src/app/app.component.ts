import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InfiniteScrollModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'Formula1';
}
