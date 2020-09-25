import axios from 'axios'

export const SET_SPOONS = 'SET_SPOONS'
export const ADD_NEW_SPOON = 'ADD_NEW_SPOON'

export const setSpoons = spoons => ({
  type: SET_SPOONS,
  spoons
})

export const addNewSpoon = spoon => ({
  type: ADD_NEW_SPOON,
  spoon: spoon
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

export const createSpoonThunk = newSpoon => async dispatch => {
  const response = await axios.post('/api/spoons', newSpoon)
  dispatch(addNewSpoon(response.data))
}

export default function(spoons = [], action) {
  switch (action.type) {
    case SET_SPOONS:
      return action.spoons
    case ADD_NEW_SPOON:
      return [...spoons, action.spoon]
    default:
      return spoons
  }
}
