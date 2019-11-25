// import { getMusicUrl, getPlaylistDetail, getSongDetail } from "../../api";

export default {
  state: {
    list: [],
    song: {},
    music_urls: [],
    is_play: false,
    currentTime: 0,
    goToTime: 0,
    // 播放次序 0单曲循环 1列表循环 2随机播放
    play_type: 1
  },
  mutations: {
    SET_PLAYER_LIST: (state, data) => {
      state.list = data
    },
    SET_PLAYER_DATA: (state, data) => {
      Object.keys(data).forEach(function (key) {
        state[key] = data[key]
      })
    }
  },
  actions: {
    playMusic ({ commit, state }, song) {
      console.log('song=' + song)
      commit('SET_PLAYER_DATA', { is_play: false, currentTime: 0, song: song })
      setTimeout(() => {
        commit('SET_PLAYER_DATA', {is_play: true})
      }, 100)
    },
    playPlaylist ({ commit, state, dispatch }, id) {
    //   getPlaylistDetail(id).then(res => {
    //     commit('SET_PLAYER_LIST', res.playlist.tracks)
    //     dispatch('playMusic', res.playlist.tracks[0].id)
    //   })
    },
    playBefore ({ commit, state, dispatch }) {
      let i = -1
      state.list.map((item, index) => {
        if (state.song.path === item.path && index > 0) {
          i = index - 1
        }
      })
      var beforeSong = i >= 0 ? state.list[i] : false
      if (beforeSong) {
        dispatch('playMusic', beforeSong)
      } else {
        commit('SET_PLAYER_DATA', { is_play: false, currentTime: 0 })
      }
    },
    playAfter ({ commit, state, dispatch }) {
      let i = -1
      state.list.map((item, index) => {
        if (state.song.path === item.path && index < state.list.length - 1) {
          i = index + 1
        }
      })
      var afterSong = i >= 0 ? state.list[i] : false
      console.log('playAfter afterSong=' + afterSong)
      if (afterSong) {
        dispatch('playMusic', afterSong)
      } else {
        commit('SET_PLAYER_DATA', { is_play: false, currentTime: 0 })
      }
    },
    playEnded ({ commit, state, dispatch }) {
      switch (state.play_type) {
        case 0:
          commit('SET_PLAYER_DATA', { is_play: false, currentTime: 0 })
          setTimeout(() => {
            commit('SET_PLAYER_DATA', { is_play: true })
          }, 1000)
          break
        case 1:
          dispatch('playAfter')
          break
      }
    }
  }
}
