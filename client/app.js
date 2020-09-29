import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import toaster from 'toasted-notes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
