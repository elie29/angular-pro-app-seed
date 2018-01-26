import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '../../store';

import { tap } from 'rxjs/operators/tap';

export interface Song {
  id: number;
  name: string;
  listened: boolean;
  favourite: boolean;
}

@Injectable()
export class SongsService {
  getPlaylist$ = this.http
    .get<Song[]>('/api/playlist')
    .pipe(tap(next => this.store.set('playlist', next)));

  constructor(private http: HttpClient, private store: Store) {}

  toggle(event: { track: Song }): void {
    this.http
      .put<Song>(`/api/playlist/${event.track.id}`, event.track)
      .subscribe(track => {
        const value = this.store.value;
        const playlist = value.playlist.map(song => {
          if (song.id === event.track.id) {
            return track; // the updated one
          }
          return song;
        });
        this.store.set('playlist', playlist);
      });
  }
}
