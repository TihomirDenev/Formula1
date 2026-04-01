import { Routes } from '@angular/router';

import { LayoutComponent } from '@libs/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@libs/pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('@libs/pages/gallery/gallery.component').then((m) => m.GalleryComponent),
      },
      {
        path: 'point-system',
        loadComponent: () =>
          import('@libs/pages/point-system/point-system.component').then(
            (m) => m.PointSystemComponent
          ),
      },
      {
        path: 'hall-of-fame',
        loadComponent: () =>
          import('@libs/pages/hof/hof.component').then((m) => m.HofComponent),
      },
      {
        path: 'hall-of-fame/:racer',
        loadComponent: () =>
          import('@libs/pages/racer/racer.component').then((m) => m.RacerComponent),
      },
      {
        path: 'teams',
        loadComponent: () =>
          import('@libs/pages/teams/teams.component').then((m) => m.TeamsComponent),
      },
      {
        path: 'teams/:team',
        loadComponent: () =>
          import('@libs/pages/team/team.component').then((m) => m.TeamComponent),
      },
      {
        path: 'compare',
        loadComponent: () =>
          import('@libs/pages/compare/compare.component').then((m) => m.CompareComponent),
      },
      {
        path: 'contacts',
        loadComponent: () =>
          import('@libs/pages/contacts/contacts.component').then((m) => m.ContactsComponent),
      },
      {
        path: '**',
        loadComponent: () =>
          import('@libs/pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
      },
    ],
  },
];
