import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/allUsersReducer'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const users = this.props.users
    return (
      <div>
        <h1>All Users</h1>
        {users.map(user => {
          return (
            <div className="user" key={user.id}>
              <p>ID: {user.id}</p>
              <p>Email: {user.email}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
