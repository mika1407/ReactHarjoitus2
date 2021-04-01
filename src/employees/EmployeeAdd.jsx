import React, { useState } from 'react'
import '../App.css'
import EmployeeService from '../services/employee'


const EmployeeAdd = ({ setLisäystila, setEmployees, employees, setMessage, setShowMessage,
    setIsPositive }) => {

    // State määritykset, id:tä ei anneta vaan tietokanta luo sen

    const [newLastname, setNewLastname] = useState('')
    const [newFirstname, setNewFirstname] = useState('')
    //const [newTitle, setNewTitle] = useState('') 
    const [newTitleOfCourtesy, setNewTitleOfCourtesy] = useState('')
    const [newBirthDate, setNewBirthDate] = useState('')

    const [newHireDate, setNewHireDate] = useState('')
    const [newAddress, setNewAddress] = useState('') 
    const [newCity, setNewCity] = useState('') 
    const [newRegion, setNewRegion] = useState('') 
    const [newPostalCode, setNewPostalCode] = useState('') 
    const [newCountry, setNewCountry] = useState('') 
    const [newHomePhone, setNewHomePhone] = useState('') 



    // Lomakkeen onSubmit tapahtumankäsittelijä

    const submitEmployee = (event) => {
        event.preventDefault()

        var newEmployee = {
            lastname: newLastname,
            firstname: newFirstname, 
            //title: newTitle,
            titleofcourtesy: newTitleOfCourtesy,
            birthdate: newBirthDate,
            hiredate: newHireDate,
            address: newAddress,
            city: newCity,
            region: newRegion,
            postalcode: newPostalCode,
            country: newCountry,
            homephone: newHomePhone
        }

        const jwt = localStorage.getItem("token");
        EmployeeService.setToken(jwt);

        console.log(newEmployee)

        EmployeeService
            .create(newEmployee)
            .then(response => {

                if (response.status === 200) {
                    setEmployees(employees.concat(newEmployee))

                    setMessage(`Lisätty ${newEmployee.lastname}`)
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
            setLisäystila(false)
        }, 4500
        )

    }
    // Komponentti palauttaa käyttöliittymään form elementin

    return (
        <form onSubmit={submitEmployee}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set kyseinen state hookia parametrina target.value, eli se teksti mitä on kirjoitettu */}

            <div>
                <input type="text" value={newLastname} placeholder="Lastname"
                    onChange={({ target }) => setNewLastname(target.value)} required />
            </div>
            <div>
                <input type="text" value={newFirstname} placeholder="Firstname"
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            {/* <div>
                <input type="text" value={newTitle} placeholder="Title"
                    onChange={({ target }) => setNewTitle(target.value)}  />
            </div> */}
            <div>
                <input type="text" value={newTitleOfCourtesy} placeholder="TitleOfCourtesy"
                    onChange={({ target }) => setNewTitleOfCourtesy(target.value)}  />
            </div>
            <div>
                <p style={{ color: 'white' }}>Birthdate: </p>
                <input type="date" value={newBirthDate} placeholder="BirthDate"
                    onChange={({ target }) => setNewBirthDate(target.value)} required />
            </div>
            <div>
                <p style={{ color: 'white' }}>Hiredate: </p>
                <input type="date" value={newHireDate} placeholder="HireDate"
                    onChange={({ target }) => setNewHireDate(target.value)} required />
            </div>
            <div>
                <input type="text" value={newAddress} placeholder="Address"
                    onChange={({ target }) => setNewAddress(target.value)}  />
            </div>
            <div>
                <input type="text" value={newCity} placeholder="City"
                    onChange={({ target }) => setNewCity(target.value)}  />
            </div>
            <div>
                <input type="text" value={newRegion} placeholder="Region"
                    onChange={({ target }) => setNewRegion(target.value)}  />
            </div>
            <div>
                <input type="text" value={newPostalCode} placeholder="PostalCode"
                    onChange={({ target }) => setNewPostalCode(target.value)}  />
            </div>
            <div>
                <input type="text" value={newCountry} placeholder="Country"
                    onChange={({ target }) => setNewCountry(target.value)}  />
            </div>
            <div>
                <input type="text" value={newHomePhone} placeholder="HomePhone"
                    onChange={({ target }) => setNewHomePhone(target.value)}  />
            </div>
     
        

            <button className="nappi" type="submit" style={{ background: 'green' }}>Create</button>

            <button className="nappi" onClick={() => setLisäystila(false)} style={{ background: 'red' }}>
                Cancel</button>
        </form>
    )
}

export default EmployeeAdd