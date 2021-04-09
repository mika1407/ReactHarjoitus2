import React, { useState, useEffect } from 'react'
import '../App.css'
import EmployeeService from '../services/employee'
import EmployeeAdd from './EmployeeAdd'
import Employee from './Employee'
import EmployeeEdit from './EmployeeEdit'     
import Message from '../Message'


const EmployeeList = () => {

  const [employees, setEmployees] = useState([])
  const [näytetäänkö, setNäytetäänkö] = useState(false) // muutin false => true, näyttää työntekijät heti
  const [search, setSearch] = useState("")
  const [lisäysTila, setLisäystila] = useState(false)
  const [muokkausTila, setMuokkaustila] = useState(false)
  const [muokattavaEmployee, setMuokattavaEmployee] = useState({}) // yksi login olio

  const [showMessage, setShowMessage] = useState(false)
  const [isPositive, setIsPositive] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
      const token = localStorage.getItem('token')
        EmployeeService
            .setToken(token)
        EmployeeService
          .getAll()
          .then(data => {
            console.log(data)
            setEmployees(data)     
        })
  }, [lisäysTila, näytetäänkö, muokkausTila])

  //Hakukentän onChange tapahtumankäsittelijä
  const handleSeachInputChange = (event) => {
    setNäytetäänkö(true)
    setSearch(event.target.value.toLowerCase())
  }

   const handleDeleteClick = id => {

        //Kaivetaan esiin koko employee olio jotta alertissa voidaan näyttää firstname id:n sijaan
        const employee = employees.find(employee => employee.employeeId === id)

        // Poiston varmistus kyselyikkuna
        const confirm = window.confirm(`Haluatko todella poistaa: ${employee.firstName}:n pysyvästi?`)

        if (confirm) {

            const jwt = localStorage.getItem('token') // Token local storagesta
            EmployeeService.setToken(jwt) // Token servicelle tiedoksi

            EmployeeService.remove(id)
                .then(response => {

                    if (response.status === 200) {
                        // Poistetaan employee statesta
                        setEmployees(employees.filter(filtered => filtered.emplyeeId !== id))

                        setMessage(`${employee.firstName}:n poisto onnistui!`)
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

    //EDIT buttonin tapahtumankäsittelijä saa parametrin employee componentista
    const handleEditClick = employee => {
        //console.log()
        setMuokattavaEmployee(employee)
        setMuokkaustila(true)

    }

  return(
      <>

    <h1><nobr style={{ cursor: 'pointer'}} 
      onClick={() => setNäytetäänkö(!näytetäänkö)}>Employees</nobr>

    <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button></h1>

    {!lisäysTila && !muokkausTila &&
       <input placeholder="Search by Firstname" value={search} onChange={handleSeachInputChange}/>
    }

    { showMessage &&
        <Message message={message} isPositive={isPositive}/>
    }

    
    {employees.length>0 && näytetäänkö && !lisäysTila && !muokkausTila  && employees.map(employee =>{
      const lowerCaseName = employee.firstName.toLowerCase()
        if (lowerCaseName.indexOf(search) > -1) {
          return (
            <Employee key={employee.employeeId} employee={employee} 
              handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick}/>
          )
        }
      }   
      )
    }
      {!employees && <p>Loading...</p>}

      {lisäysTila === true && <EmployeeAdd setLisäystila={setLisäystila}  employees={employees} setEmployees={setEmployees} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive}/>}

      {muokkausTila && <EmployeeEdit setMuokkaustila={setMuokkaustila} muokattavaEmployee={muokattavaEmployee} employees={employees} setEmployees={setEmployees} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />}
      </>
  )

   
}

export default EmployeeList