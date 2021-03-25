import React, { useState } from 'react'
import '../App.css'
import LoginService from '../services/logins'

const LoginEdit = ({ setMuokkaustila, setLogins, logins, setMessage, setShowMessage,
    setIsPositive, muokattavaLogin }) => {

    // State määritykset

    const [newLoginId, setNewLoginId] = useState(muokattavaLogin.loginId)
    const [newUsername, setNewUsername] = useState(muokattavaLogin.username)
    const [newPassword, setNewPassword] = useState(muokattavaLogin.password)
    const [newFirstname, setNewFirstname] = useState(muokattavaLogin.firstname)

    const [newLastname, setNewLastname] = useState(muokattavaLogin.lastname)
    const [newEmail, setNewEmail] = useState(muokattavaLogin.email)
    const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaLogin.accesslevelId)
    

    // Muokkauslomakkeen onSubmit tapahtumankäsittelijä

    const submitLogin = (event) => {
        event.preventDefault()

        var changedLogin = {
            loginId: newLoginId,
            username: newUsername,
            password: newPassword,
            firstname: newFirstname,
            lastname: newLastname,
            email: newEmail,
            accesslevelId: parseInt(newAccesslevelId)  // lisäsin parseInt !!
        }

        LoginService
            .update(changedLogin) // Put pyyntö back-endille
            .then(response => {

                if (response.status === 200) {

                    const id = changedLogin.loginId

                    // Poistetaan ensin vanha login statesta
                    setLogins(logins.filter(filtered => filtered.loginId !== id))

                    // Ja lisätään uudestaan muuttuneilla tiedoilla
                    setLogins(logins.concat(changedLogin))

                    setMessage(`Päivitetty ${changedLogin.firstname}`)
                    setIsPositive(true)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 4000
                    )
                }

            })
            .catch(error => {
                setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                setIsPositive(false)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 7000
                )
            })

    setTimeout(() => {
      setMuokkaustila(false)
    }, 800
    )
        

    }
    // Komponentti palauttaa käyttöliittymään form elementin
    // Lisätty required 2 ensimmäiseen inputiin

    return (
        <form onSubmit={submitLogin}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}
            <div>
                <p style={{ color: 'white' }}>ID field cannot be edited</p>
                {<input type="text" value={newLoginId} /> }
            </div>
            <div>
                <input type="text" value={newUsername} placeholder="Username"
                    onChange={({ target }) => setNewUsername(target.value)} required/>
            </div>
            <div>
                <input type="text" value={newFirstname} placeholder="Firstname"
                    onChange={({ target }) => setNewFirstname(target.value)} />
            </div>
            <div>
                <input type="text" value={newLastname} placeholder="Lastname"
                    onChange={({ target }) => setNewLastname(target.value)} />
            </div>
            <div>
                <input type="email" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
                <input type="password" value={newPassword} placeholder="Password"   //type password
                    onChange={({ target }) => setNewPassword(target.value)} />
            </div>
            {/* <div>
                <input type="password" value={passwordAgain} placeholder="Re-enter password"
                    onChange={({ target }) => setPasswordAgain(target.value)} required />
            </div> */}
            <div>
                <input type="number" value={newAccesslevelId} placeholder="AccesslevelID"
                    onChange={({ target }) => setNewAccesslevelId(target.value)} />
            </div>

            <button className="nappi" type="submit" >Save</button>  
            {/* poistettu: style={{ background: 'green' }} */}

            <button className="nappi" onClick={() => setMuokkaustila(false)} style={{ background: 'red' }}>
                Cancel</button>
        </form>
    )
}

export default LoginEdit