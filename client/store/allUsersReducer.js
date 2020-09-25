import axios from 'axios'

const GET_USERS = 'GET_USERS'

const getUsers = users => ({type: GET_USERS, users})

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/users')
      const users = response.data
      dispatch(getUsers(users))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return users
  }
}
