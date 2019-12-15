// import { getMusicUrl, getPlaylistDetail, getSongDetail } from "../../api";

export default {
  state: {
    download_list: [],
    on_download: {}
  },
  actions: {
    downloadMusic ({ commit, state }, task) {
      console.log('song=' + JSON.stringify(task))
      for (let i in state.download_list) {
        if (state.download_list[i].url === task.url) {
          state.on_download = {}
          setTimeout(() => {
            state.on_download = task
          }, 500)
          return
        }
      }
      state.download_list.push(task)
      setTimeout(() => {
        state.on_download = task
      }, 500)
    }
  }
}
