import { configureStore } from '@reduxjs/toolkit'
import sessionSlice from './slicers/session.slice'

export default configureStore({
  reducer: {
    session: sessionSlice,
  }
})