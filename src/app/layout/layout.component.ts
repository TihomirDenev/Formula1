import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [`main { max-width: 85rem; margin: auto; }`],  
  imports: [RouterOutlet, NavigationComponent, FooterComponent],
})
export class LayoutComponent {}
