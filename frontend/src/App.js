import React from 'react'
import UserTable from './components/UserTable'
import UserForm from './components/UserForm'
import Header from './components/Header'

const App = () => {
  return (
    <>
    <Header/>
    <div style={{display:"flex"}}>
      <UserTable/>
      <UserForm/>
    </div>
    </>
  )
}

export default App
