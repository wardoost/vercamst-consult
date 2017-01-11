import { State, Goto } from 'jumpsuit'
import { isInitialized } from './auth'

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
    if (authInitRequired ? !isInitialized() || (exists && loading) : exists && loading) {
      reject()
    } else {
      if (!exists) {
        const { chunks } = chunksState.getState()
        if (!chunks.filter(e => { return e.key === chunkName }).length > 0) {
          chunksState.initLoad(chunkName)
          const { pathname, hash } = loc.location
          Goto(hash ? pathname + hash : pathname)
        }
      }
      resolve(chunkName, !exists)
    }
  })
}
