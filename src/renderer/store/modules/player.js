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
    play_type: 1,
    recent_play: [],
    local_songs: [],
    collection_songs: []
  },
  mutations: {
    SET_PLAYER_LIST: (state, data) => {
      state.list = data
    },
    ADD_LOCAL_SONG: (state, song) => {
      state.local_songs.push(song)
    },
    SET_PLAYER_DATA: (state, data) => {
      Object.keys(data).forEach(function (key) {
        state[key] = data[key]
      })
    }
  },
  actions: {
    addRecentPlay ({ commit, state }, song) {
      console.log('addRecentPlay song=' + JSON.stringify(song))
      let recentPlay = state.recent_play
      let lastPos = recentPlay.length - 1
      if (lastPos >= 0 && recentPlay[lastPos].song.path === song.path) {
        recentPlay[lastPos].time = new Date().getTime()
        console.log('addRecentPlay 1')
      } else {
        recentPlay.push({
          'song': song,
          'time': new Date().getTime()
        })
        console.log('addRecentPlay 2')
      }
    },
    playOrPause ({ commit, state, dispatch }) {
      if (!state.is_play) {
        dispatch('addRecentPlay', {
          'song': state.song,
          'time': new Date().getTime()
        })
      }
      commit('SET_PLAYER_DATA', { is_play: !state.is_play })
    },
    addToPlayList ({ commit, state, dispatch }, recentSong) {
      // songs.forEach(function (song) {
      //   state.list.push(song)
      // })
      for (let index in state.list) {
        console.log('song.path=' + state.list[index].path + '   recentSong.path=' + recentSong.path + '   state.list[index].path === recentSong.path = ' + (state.list[index].path === recentSong.path))
        if (state.list[index].path === recentSong.path) {
          console.log('============================================')
          dispatch('playMusic', recentSong)
          return
        }
      }
      console.log('0000000000000000000000000000000000000')
      state.list.push(recentSong)
      dispatch('playMusic', recentSong)
    },
    playMusic ({ commit, state, dispatch }, song) {
      console.log('playMusic song=' + JSON.stringify(song))
      // let recentPlay = state.recent_play
      // let lastPos = recentPlay.length - 1
      // if (recentPlay[lastPos].song === song) {
      //   // state.recent_play.push(song)
      //   recentPlay[lastPos].time = new Date().getTime()
      // } else {
      //   recentPlay.push({
      //     'song': song,
      //     'time': new Date().getTime()
      //   })
      // }
      // state.recent_play = []
      commit('SET_PLAYER_DATA', { is_play: false, currentTime: 0, song: song })
      setTimeout(() => {
        commit('SET_PLAYER_DATA', {is_play: true})
      }, 100)
      dispatch('addRecentPlay', {
        'song': song,
        'time': new Date().getTime()
      })
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
