import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

import { HomeComponent } from './pages/home/home.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { PointSystemComponent } from './pages/point-system/point-system.component';
import { HofComponent } from './pages/hof/hof.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { RacerComponent } from './pages/racer/racer.component';
import { TeamComponent } from './pages/team/team.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'photos', component: PhotosComponent },
      { path: 'point-system', component: PointSystemComponent },
      { path: 'hall-of-fame', component: HofComponent },
      { path: 'hall-of-fame/:racer', component: RacerComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'teams/:team', component: TeamComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];
