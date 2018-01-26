import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '../../../store';
import { Song, SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-playlist',
  template: `
  <div class="songs">
    <songs-list
      [list]="playlist$ | async"
      >
      Played
    </songs-list>
  </div>
  `
})
export class SongsPlaylistComponent implements OnInit, OnDestroy {
  playlist$: Observable<Song[]>;
  subscription: Subscription;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit() {
    this.playlist$ = this.store.select('playlist');
    this.subscription = this.songsService.getPlaylist$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
