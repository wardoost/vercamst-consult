import { State, Goto } from 'jumpsuit'
import { isInitialized } from './auth'
import Loading from '../../components/Loading'
import LoadingAuth from '../../components/LoadingAuth'

const chunksState = State('chunks', {
  initial: {
    chunks: [],
    loading: false
  },

  initLoad: (state, payload) => ({
    chunks: [...state.chunks, {'key': payload, loading: true}],
    loading: true
  }),

  loadSuccess: (state, payload) => ({
    chunks: state.chunks.map(chunk => { return chunk.key === payload ? {'key': payload, loading: false} : chunk }),
    loading: false
  })
})

export default chunksState

export function chunkLoaded (key) {
  const { loading } = chunksState.getState()
  if (loading) chunksState.loadSuccess(key)
}

function getChunkState (key) {
  const chunk = chunksState.getState().chunks.filter(e => { return e.key === key }).pop()
  return chunk ? {exists: true, loading: chunk.loading} : {exists: false, loading: false}
}

export function lazyLoadChunk (chunkName, loc, authInitRequired = false) {
  return new Promise((resolve, reject) => {
    const { exists, loading } = getChunkState(chunkName)

    if (authInitRequired && !isInitialized()) {
      reject(LoadingAuth)
    } else if (exists && loading) {
      reject(Loading)
    } else {
      if (!exists) {
        const { chunks } = chunksState.getState()
        if (!chunks.filter(e => { return e.key === chunkName }).length > 0) {
          chunksState.initLoad(chunkName)
          const { pathname, hash } = loc.location
          Goto({path: pathname, hash: hash.substr(1)}, false, true)
        }
      }
      resolve(chunkName, !exists)
    }
  })
}
