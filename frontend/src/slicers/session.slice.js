import { createSlice } from '@reduxjs/toolkit'

const sessionSlice = createSlice({
  name: 'session',
  initialState: {userData:{}},
  reducers: {
    setSessionData(state, action) {
      state.userData = action.payload
    },
    todoToggled(state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    }
  }
})

export const { setSessionData } = sessionSlice.actions
export default sessionSlice.reducer