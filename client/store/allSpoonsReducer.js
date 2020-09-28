import axios from 'axios'

export const SET_SPOONS = 'SET_SPOONS'
export const ADD_NEW_SPOON = 'ADD_NEW_SPOON'
export const DELETE_SPOON = 'DELETE_SPOON'

export const setSpoons = spoons => ({
  type: SET_SPOONS,
  spoons
})

export const addNewSpoon = spoon => ({
  type: ADD_NEW_SPOON,
  spoon: spoon
})

export const deleteSpoon = spoon => ({
  type: DELETE_SPOON,
  spoon
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

export const createSpoonThunk = newSpoon => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/spoons', newSpoon)
      dispatch(addNewSpoon(response.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteSpoonThunk = spoonId => {
  return async dispatch => {
    try {
      const response = await axios.delete(`/api/spoons/${spoonId}`)
      dispatch(setSpoons(response.data))
    } catch (err) {
      console.error(err)
    }
  }
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
