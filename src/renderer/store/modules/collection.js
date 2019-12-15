// import { getMusicUrl, getPlaylistDetail, getSongDetail } from "../../api";

export default {
  state: {
    collection_songs: [],
    collection_albums: [],
    collection_videos: [],
    collection_singers: []
  },
  mutations: {
    SET_COLLECTION_: (state, data) => {
      state.collection_songs = data
    }
  },
  actions: {
    collectSong ({ commit, state }, song) {
      console.log('collectSong song=' + JSON.stringify(song))
      for (let i in state.collection_songs) {
        if (state.collection_songs[i].path === song.path) {
          return
        }
      }
      state.collection_songs.push(song)
    },
    collectSinger ({ commit, state }, singer) {
      console.log('collectSinger singer=' + JSON.stringify(singer))
      state.collection_singers.push(singer)
    },
    collectAlbum ({ commit, state }, album) {
      console.log('collectAlbum album=' + JSON.stringify(album))
      state.collection_albums.push(album)
    },
    collectVideo ({ commit, state }, video) {
      console.log('collectVideo video=' + JSON.stringify(video))
      state.collection_videos.push(video)
    }
  }
}
