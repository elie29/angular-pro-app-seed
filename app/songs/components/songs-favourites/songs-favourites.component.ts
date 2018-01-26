import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';

import { Store } from '../../../store';
import { Song, SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-favourites',
  template: `
  <div class="songs">
    <songs-list
      [list]="favourites$ | async"
      (toggle)="onToggle($event)"
      >
      Favourites
    </songs-list>
  </div>
  `
})
export class SongsFavouritesComponent implements OnInit {
  favourites$: Observable<Song[]>;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit() {
    this.favourites$ = this.store.select('playlist').pipe(
      filter(Boolean),
      // Retrieve only favourite items
      map(playlist => playlist.filter(track => track.favourite))
    );
  }

  onToggle(event): void {
    this.songsService.toggle(event);
  }
}
