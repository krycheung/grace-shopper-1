import axios from 'axios'

export const SET_SPOONS = 'SET_SPOONS'

export const setSpoons = spoons => ({
  type: SET_SPOONS,
  spoons
})

export const fetchSpoons = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/spoons')
      const spoons = response.data
      dispatch(setSpoons(spoons))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(spoons = [], action) {
  switch (action.type) {
    case SET_SPOONS:
      return action.spoons
    default:
      return spoons
  }
}
