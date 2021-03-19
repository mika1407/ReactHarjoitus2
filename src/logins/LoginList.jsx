import React, { useState, useEffect } from 'react'
import '../App.css'
import LoginService from '../services/logins'
import LoginAdd from './LoginAdd'
import Login from './Login'

const LoginList = () => {

  const [logins, setLogins] = useState([])
  const [näytetäänkö, setNäytetäänkö] = useState(false)
  const [search, setSearch] = useState("")
  const [lisäysTila, setLisäystila] = useState(false)

  useEffect(() => {
    LoginService
    .getAll()
    .then(data => {
      //console.log(data)
      setLogins(data)     
    })
  }, [])

  //Hakukentän onChange tapahtumankäsittelijä
  const handleSeachInputChange = (event) => {
    setNäytetäänkö(true)
    setSearch(event.target.value.toLowerCase())
  }

  return(
      <>

    <h1 style={{ cursor: 'pointer'}} 
      onClick={() => setNäytetäänkö(!näytetäänkö)}>Logins
    <button onClick={() => setLisäystila(true)}>Add new</button>
    </h1>

    <input placeholder="Search by Firstname" value={search} onChange={handleSeachInputChange}/>

    {logins && näytetäänkö === true && lisäysTila === false && logins.map(login =>{
      const caseInsensName = login.firstname.toLowerCase()
        if (caseInsensName.indexOf(search) > -1) {
          return (
            <Login key={login.loginId} login={login} />
          )
        }
      }   
      )
    }
      {!logins && <p>Loading...</p>}

      {lisäysTila === true && <LoginAdd setLisäystila={setLisäystila} />}
      </>
  )

   
}

export default LoginList