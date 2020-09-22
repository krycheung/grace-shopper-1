import axios from 'axios'

const SET_SPOONS = 'SET_SPOONS'

export const setSpoons = spoons => ({
  type: SET_SPOONS,
  spoons
})

export const fetchSpoons = () => {
  return async dispatch => {
    const response = await axios.get('/api/spoons')
    const spoons = response.data
    const action = setSpoons(spoons)
    dispatch(action)
  }
}

export default function allSpoonsReducer(spoons = [], action) {
  switch (action.type) {
    case SET_SPOONS:
      return action.spoons
    default:
      return spoons
  }
}
