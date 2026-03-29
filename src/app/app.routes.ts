import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'photos',
        loadComponent: () =>
          import('./pages/photos/photos.component').then((m) => m.PhotosComponent),
      },
      {
        path: 'point-system',
        loadComponent: () =>
          import('./pages/point-system/point-system.component').then(
            (m) => m.PointSystemComponent
          ),
      },
      {
        path: 'hall-of-fame',
        loadComponent: () =>
          import('./pages/hof/hof.component').then((m) => m.HofComponent),
      },
      {
        path: 'hall-of-fame/:racer',
        loadComponent: () =>
          import('./pages/racer/racer.component').then((m) => m.RacerComponent),
      },
      {
        path: 'teams',
        loadComponent: () =>
          import('./pages/teams/teams.component').then((m) => m.TeamsComponent),
      },
      {
        path: 'teams/:team',
        loadComponent: () =>
          import('./pages/team/team.component').then((m) => m.TeamComponent),
      },
      {
        path: 'contacts',
        loadComponent: () =>
          import('./pages/contacts/contacts.component').then((m) => m.ContactsComponent),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
      },
    ],
  },
];
