import React, { useState, useEffect } from 'react'
import '../App.css'
import LoginService from '../services/logins'
import LoginAdd from './LoginAdd'
import Login from './Login'
import LoginEdit from './LoginEdit'     
import Message from '../Message'

const LoginList = () => {

  const [logins, setLogins] = useState([])
  const [näytetäänkö, setNäytetäänkö] = useState(true) // muutin false true, näyttää henkilöt heti
  const [search, setSearch] = useState("")
  const [lisäysTila, setLisäystila] = useState(false)
  const [muokkausTila, setMuokkaustila] = useState(false)
  const [muokattavaLogin, setMuokattavaLogin] = useState({}) // yksi login olio

  const [showMessage, setShowMessage] = useState(false)
  const [isPositive, setIsPositive] = useState(false)
  const [message, setMessage] = useState('')

    ////////////// ADMIN TILATIETO ////////////////////////////
    const [admin, setAdmin] = useState(true)

  useEffect(() => {
            ////ADMIN TARKISTUS LOCAL STORAGESTA JA ASETUS STATEEN/////////
        const accesslevelId = localStorage.getItem('accesslevelId')
        if (accesslevelId == 1) {
            setAdmin(true)
        }
        else {
            setAdmin(false)
        }
    LoginService
      .getAll()
      .then(data => {
        //console.log(data)
        setLogins(data)     
    })
  }, [lisäysTila])

  //[lisäysTila, näytetäänkö, muokkausTila]) vanha koodi

  //Hakukentän onChange tapahtumankäsittelijä
  const handleSeachInputChange = (event) => {
    setNäytetäänkö(true)
    setSearch(event.target.value.toLowerCase())
  }

   const handleDeleteClick = id => {

        //Kaivetaan esiin koko login olio jotta alertissa voidaan näyttää firstname id:n sijaan
        const login = logins.find(login => login.loginId === id)

        // Poiston varmistus kyselyikkuna
        const confirm = window.confirm(`Haluatko todella poistaa: ${login.username}:n pysyvästi?`)

        if (confirm) {

            LoginService.remove(id)
                .then(response => {

                    if (response.status === 200) {
                        // Poistetaan login statesta
                        setLogins(logins.filter(filtered => filtered.loginId !== id))

                        setMessage(`${login.username}:n poisto onnistui!`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

                        setTimeout(() => {
                            setShowMessage(false)
                        }, 4000
                        )
                    }

                })

                .catch(error => {
                    console.log(error)
                    setMessage(`Tapahtui virhe: ${error}. ?`)
                    setIsPositive(false)
                    setShowMessage(true)
                    setNäytetäänkö(false)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 7000
                    )
                })
        }
        else { // JOS KÄYTTÄJÄ EI VAHVISTANUT POISTOA:
            setMessage('Poisto peruutettu')
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 4000
            )
        }
    }

    //EDIT buttonin tapahtumankäsittelijä saa parametrin login componentista
    const handleEditClick = login => {
        //console.log(login)
        setMuokattavaLogin(login)
        setMuokkaustila(true)
    }

        //////Jos ei ole adminkäyttäjä tulee aina tämä näkymä////////////
    if (!admin) {
        return (<h2>Sorry, this page is for admin users only</h2>)
    }

     // Jos logineja ei ole ehtinyt tulla kannasta stateen, mutta on adminkäyttäjä
    if (!lisäysTila && admin && logins.length === 0) {
        return (<>
            <h1><nobr> Logins</nobr>

                <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button></h1>
            { showMessage &&
                <Message message={message} isPositive={isPositive} />
            }
            <p>Loading...</p>
        </>)
    }

    // Jos kirjautuneena on adminkäyttäjä ja statessa on jo kannasta saapuneet loginit ja lisäystilakin on pois päältä
    if (!lisäysTila && admin && logins) {
        return (
            <>
                
                 <h1><nobr style={{ cursor: 'pointer'}} 
      onClick={() => setNäytetäänkö(!näytetäänkö)}>Users</nobr>

      <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button></h1>

     {!lisäysTila && !muokkausTila &&
       <input placeholder="Search by Firstname" value={search} onChange={handleSeachInputChange}/>
    }

    { showMessage &&
        <Message message={message} isPositive={isPositive}/>
    }

    {logins && näytetäänkö && !lisäysTila && !muokkausTila  && logins.map(login =>{
      const caseInsensName = login.firstname.toLowerCase()
        if (caseInsensName.indexOf(search) > -1) {
          return (
            <Login key={login.loginId} login={login} 
              handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick}/>
          )
        }
      }  
          )
    }
            </>

        )
    }

    if (lisäysTila && admin) {
        return (<>
            <h1>Logins</h1>
            { showMessage &&
                <Message message={message} isPositive={isPositive} />
            }
            <LoginAdd setLisäystila={setLisäystila} logins={logins} setLogins={setLogins} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />
        </>
        )
    }

    //ALLA VANHA KOODI !!!

  // return(
  //     <>

  //   <h1><nobr style={{ cursor: 'pointer'}} 
  //     onClick={() => setNäytetäänkö(!näytetäänkö)}>Users</nobr>

  //   <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button></h1>

  //   {!lisäysTila && !muokkausTila &&
  //      <input placeholder="Search by Firstname" value={search} onChange={handleSeachInputChange}/>
  //   }

  //   { showMessage &&
  //       <Message message={message} isPositive={isPositive}/>
  //   }

  //   {logins && näytetäänkö && !lisäysTila && !muokkausTila  && logins.map(login =>{
  //     const caseInsensName = login.firstname.toLowerCase()
  //       if (caseInsensName.indexOf(search) > -1) {
  //         return (
  //           <Login key={login.loginId} login={login} 
  //             handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick}/>
  //         )
  //       }
  //     }   
  //     )
  //   }
  //     {!logins && <p>Loading...</p>}

  //     {lisäysTila === true && <LoginAdd setLisäystila={setLisäystila}  logins={logins} setLogins={setLogins} setMessage={setMessage} setShowMessage={setShowMessage}
  //               setIsPositive={setIsPositive}/>}

  //     {muokkausTila && <LoginEdit setMuokkaustila={setMuokkaustila} muokattavaLogin={muokattavaLogin} logins={logins} setLogins={setLogins} setMessage={setMessage} setShowMessage={setShowMessage}
  //               setIsPositive={setIsPositive} />}
  //     </>
  // )

   
}

export default LoginList