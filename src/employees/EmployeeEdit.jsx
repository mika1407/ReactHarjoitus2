import React, { useState } from 'react'
import '../App.css'
import EmployeeService from '../services/employee'

const EmployeeEdit = ({ setMuokkaustila, setEmployees, employees, setMessage, setShowMessage,
    setIsPositive, muokattavaEmployee }) => {

       // console.log(muokattavaEmployee)
    // State määritykset

    const [newEmployeeId, setNewEmployeeId] = useState(muokattavaEmployee.employeeId)
    const [newLastname, setNewLastname] = useState(muokattavaEmployee.lastName)
    const [newFirstname, setNewFirstname] = useState(muokattavaEmployee.firstName)
    //const [newTitle, setNewTitle] = useState(muokattavaEmployee.title) 
    const [newTitleOfCourtesy, setNewTitleOfCourtesy] = useState(muokattavaEmployee.titleOfCourtesy)
    const [newBirthDate, setNewBirthDate] = useState(muokattavaEmployee.birthDate)

    const [newHireDate, setNewHireDate] = useState(muokattavaEmployee.hireDate)
    const [newAddress, setNewAddress] = useState(muokattavaEmployee.address) 
    const [newCity, setNewCity] = useState(muokattavaEmployee.city) 
    const [newRegion, setNewRegion] = useState(muokattavaEmployee.region) 
    const [newPostalCode, setNewPostalCode] = useState(muokattavaEmployee.postalCode) 
    const [newCountry, setNewCountry] = useState(muokattavaEmployee.country) 
    const [newHomePhone, setNewHomePhone] = useState(muokattavaEmployee.homePhone) 
  
        console.log(typeof(muokattavaEmployee.birthDate))
        console.log(muokattavaEmployee.birthDate)

    // Muokkauslomakkeen onSubmit tapahtumankäsittelijä

    const submitEmployee = (event) => {
        event.preventDefault()
          //console.log(typeof())
          //console.log()

        var changedEmployee = {
            lastName: newLastname,
            firstName: newFirstname, 
            //title: newTitle,
            titleOfCourtesy: newTitleOfCourtesy,
            birthDate: newBirthDate,
            hireDate: newHireDate,
            address: newAddress,
            city: newCity,
            region: newRegion,
            postalcode: newPostalCode,
            country: newCountry,
            homephone: newHomePhone
     
        }

          console.log(changedEmployee)

    const id = muokattavaEmployee.employeeId
    // Lähetetään servicelle token ennen kuin tehdään update pyyntö serviceen
    const jwt = localStorage.getItem('token')
    EmployeeService.setToken(jwt)

    EmployeeService
        .update(id, changedEmployee) // Put pyyntö back-endille
        .then(response => {

            if (response.status === 200) {

                const id = changedEmployee.employeeId

                // Poistetaan ensin vanha product statesta
                setEmployees(employees.filter(filtered => filtered.employeeId !== id))

                // Ja lisätään uudestaan muuttuneilla tiedoilla
                setEmployees(employees.concat(changedEmployee))

                //console.log(typeof(newUnitPrice))
                setMessage(`Päivitetty ${changedEmployee.firstName}`)
                setIsPositive(true)
                setShowMessage(true)
                window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

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
    // Lisätty required 

    return (
        <form onSubmit={submitEmployee}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}
            <div>
                <p style={{ color: 'white' }}>ID field cannot be edited</p>
                <input type="text" value={newEmployeeId} readOnly/>
            </div>
            <div>
                <input type="text" value={newLastname || ''} placeholder="Lastname"
                    onChange={({ target }) => setNewLastname(target.value)} required />
            </div>
            <div>
                <input type="text" value={newFirstname || ''} placeholder="Firstname"
                    onChange={({ target }) => setNewFirstname(target.value)} required/>
            </div>
            {/* <div>
                <input type="text" value={newTitle} placeholder="Title"
                    onChange={({ target }) => setNewTitle(target.value)} />
            </div> */}
            <div>
                <input type="text" value={newTitleOfCourtesy} placeholder="TitleOfCourtesy"
                    onChange={({ target }) => setNewTitleOfCourtesy(target.value)} />
            </div>
            <div>
                <input type="text" value={newBirthDate} placeholder="BirthDate"
                    onChange={({ target }) => setNewBirthDate(target.value)} required/>
            </div>
            <div>
                <input type="text" value={newHireDate} placeholder="HireDate"
                    onChange={({ target }) => setNewHireDate(target.value)} required/>
            </div>
            <div>
                <input type="text" value={newAddress} placeholder="Address"
                    onChange={({ target }) => setNewAddress(target.value)} />
            </div>
            <div>
                <input type="text" value={newCity} placeholder="City"
                    onChange={({ target }) => setNewCity(target.value)} />
            </div>
            <div>
                <input type="text" value={newRegion} placeholder="Region"
                    onChange={({ target }) => setNewRegion(target.value)} />
            </div>
            <div>
                <input type="text" value={newPostalCode} placeholder="PostalCode"
                    onChange={({ target }) => setNewPostalCode(target.value)} />
            </div>
            <div>
                <input type="text" value={newCountry} placeholder="Country"
                    onChange={({ target }) => setNewCountry(target.value)} />
            </div>
            <div>
                <input type="text" value={newHomePhone} placeholder="HomePhone"
                    onChange={({ target }) => setNewHomePhone(target.value)} />
            </div>
   
     

            <button className="nappi" type="submit" >Save</button>  
            {/* poistettu: style={{ background: 'green' }} */}

            <button className="nappi" onClick={() => setMuokkaustila(false)} style={{ background: 'red' }}>
                Cancel</button>
        </form>
    )
}

export default EmployeeEdit
