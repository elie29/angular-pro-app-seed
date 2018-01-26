import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';

import { Store } from '../../../store';
import { SongsService, Song } from '../../services/songs.service';

@Component({
  selector: 'songs-listened',
  template: `
  <div class="songs">
    <songs-list
      [list]="listened$ | async"
      >
      Listened
    </songs-list>
  </div>
  `
})
export class SongsListenedComponent implements OnInit {
  listened$: Observable<Song[]>;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit() {
    this.listened$ = this.store.select('playlist').pipe(
      // Wait until we get data
      // same as filter(items => !!items)
      filter(Boolean),
      // Retrieve only listened items
      map(playlist => playlist.filter(track => track.listened))
    );
  }
}
