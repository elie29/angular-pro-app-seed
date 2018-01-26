import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SongsFavouritesComponent } from './components/songs-favourites/songs-favourites.component';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { SongsListenedComponent } from './components/songs-listened/songs-listened.component';
import { SongsPlaylistComponent } from './components/songs-playlist/songs-playlist.component';
import { SongsService } from './services/songs.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [SongsService],
  declarations: [
    SongsFavouritesComponent,
    SongsListenedComponent,
    SongsPlaylistComponent,
    SongsListComponent
  ],
  exports: [
    SongsFavouritesComponent,
    SongsListenedComponent,
    SongsPlaylistComponent
  ]
})
export class SongsModule {}
