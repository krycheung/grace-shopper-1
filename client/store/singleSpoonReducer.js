import axios from 'axios'
//import history from '../history'

//ACTION TYPE
const SET_SPOON = 'SET_SPOON'
const UPDATE_SPOON = 'UPDATE_SPOON'

// INITIAL STATE
const defaultSingleSpoon = {}

// ACTION CREATOR
const getSpoon = singleSpoon => ({type: SET_SPOON, spoon: singleSpoon})
const updateSpoon = singleSpoon => ({type: UPDATE_SPOON, spoon: singleSpoon})

// THUNK CREATOR

export const getSingleSpoonThunk = spoonId => {
  return async dispatch => {
    try {
      const singleSpoonRes = await axios.get(`/api/spoons/${spoonId}`)
      const singleSpoon = singleSpoonRes.data
      dispatch(getSpoon(singleSpoon))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateSpoonThunk = (spoonId, data) => {
  console.log('in updatespoon thunk spoonId:', spoonId)
  console.log('in updatespoon thunk data:', data)
  return async dispatch => {
    try {
      const spoonRes = await axios.put(`/api/spoons/${spoonId}`, data)
      dispatch(updateSpoon(spoonRes.data))
    } catch (err) {
      console.error(err)
    }
  }
}

///REDUCER

export default function(state = defaultSingleSpoon, action) {
  switch (action.type) {
    case SET_SPOON:
      return action.spoon
    case UPDATE_SPOON:
      return action.spoon
    default:
      return state
  }
}
