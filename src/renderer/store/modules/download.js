// import { getMusicUrl, getPlaylistDetail, getSongDetail } from "../../api";

export default {
  state: {
    download_task_list: []
  },
  actions: {
    downloadMusic ({ commit, state }, song) {
      console.log('collectSong song=' + JSON.stringify(song))
      for (let i in state.collection_songs) {
        if (state.download_task_list[i].path === song.path) {
          return
        }
      }
      state.download_task_list.push({
        song: song,
        size: 0,
        status: 0 // downloading: 0, finished: 1, pause: 2, waitting: 4, error: 5
      })
    }
  }
}
