import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { F1_TEAMS } from './teams.data';
import { F1_Team } from '../../interfaces';
import { ImageOptimizationService } from '../../services/image-optimization.service';

@Component({
  selector: 'app-teams',
  imports: [TranslateModule, CommonModule, InfiniteScrollModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent implements OnInit, OnDestroy {
  readonly TEAMS_PER_PAGE: number = 2;

  allTeams: F1_Team[] = [];
  displayedTeams: F1_Team[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private imageService: ImageOptimizationService
  ) {}

  ngOnInit(): void {
    this.loadTeams();
    this.loadMoreTeams();
    this.preloadVisibleImages();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTeams(): void {
    this.allTeams = F1_TEAMS.map((team, index) => ({
      ...team,
      photo: `assets/images/teams/${index + 1}.webp`,
      logo: `assets/images/logos/${index + 1}.png`,
    }));
  }

  loadMoreTeams(): void {
    const nextTeams = this.allTeams.slice(
      this.displayedTeams.length,
      this.displayedTeams.length + this.TEAMS_PER_PAGE
    );
    this.displayedTeams.push(...nextTeams);

    // Preload images for newly loaded teams
    this.preloadTeamImages(nextTeams);
  }

  preloadVisibleImages(): void {
    this.preloadTeamImages(this.displayedTeams);
  }

  preloadTeamImages(teams: F1_Team[]): void {
    teams.forEach((team) => {
      if (team.photo) {
        this.imageService.preloadImage(team.photo).catch(console.error);
      }
      if (team.logo) {
        this.imageService.preloadImage(team.logo).catch(console.error);
      }
    });
  }

  isImageLoaded(imageUrl: string): boolean {
    return this.imageService.isImageLoaded(imageUrl);
  }

  isImageLoading(imageUrl: string): boolean {
    return this.imageService.isImageLoading(imageUrl);
  }

  hasImageError(imageUrl: string): boolean {
    return this.imageService.hasImageError(imageUrl);
  }

  trackByTeam(index: number, team: F1_Team): string {
    return team.name;
  }

  getTeamInfoTranslation(teamName: string): string {
    const teamNameMap: { [key: string]: string } = {
      'Red Bull Racing': 'RedBull',
      Mercedes: 'Mercedes',
      Ferrari: 'Ferrari',
      McLaren: 'McLaren',
      'Aston Martin': 'AstonMartin',
      Alpine: 'Alpine',
      Williams: 'Williams',
      'Haas F1 Team': 'Haas',
      'Visa Cash App RB': 'VisaCashAppRB',
      'Kick Sauber': 'KickSauber',
    };

    return `teamInfo.${teamNameMap[teamName] || teamName}`;
  }

  viewTeamDetails(team: F1_Team): void {
    const formattedName = team.name.split(' ').join('');
    this.router.navigate(['/teams', formattedName]);
  }
}
