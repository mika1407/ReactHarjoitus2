import React, { useState, useEffect } from 'react'
import './App.css'
import CustomerService from './services/customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'

const CustomerList = ({ setMessage, setShowMessage, setIsPositive }) => {

    const [customers, setCustomers] = useState([])
    const [näytetäänkö, setNäytetäänkö] = useState(false)
    const [search, setSearch] = useState("")
    const [lisäysTila, setLisäystila] = useState(false)

    useEffect(() => {
        CustomerService
            .getAll()
            .then(data => {
                console.log(data)
                setCustomers(data)
            })
    }, [näytetäänkö])

    //Hakukentän onChange tapahtumankäsittelijä
    const handleSearchInputChange = (event) => {
        console.log(search)
        setNäytetäänkö(true)
        setSearch(event.target.value.toLowerCase())
    }

    // Poisto on nyt korjattu (14.3.2021)

    const handleDeleteClick = id => {

        //Kaivetaan esiin koko customer olio jotta alertissa voidaan näyttää companyName id:n sijaan
        const customer = customers.find(cust => cust.customerId === id)

        // Poiston varmistus kyselyikkuna
        const confirm = window.confirm(`Haluatko todella poistaa: ${customer.companyName}:n pysyvästi?`)

        if (confirm) {

            CustomerService.remove(id)
                .then(response => {

                    if (response.status === 200) {
                        // Poistetaan customer statesta
                        setCustomers(customers.filter(filtered => filtered.customerId !== id))

                        setMessage(`${customer.companyName}:n poisto onnistui!`)
                        setIsPositive(true)
                        setShowMessage(true)
                        setNäytetäänkö(false)
                        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

                        setTimeout(() => {
                            setShowMessage(false)
                        }, 4000
                        )
                    }

                })

                .catch(error => {
                    setMessage(`Tapahtui virhe: ${error}. Onkohan asiakkaalla tilauksia?`)
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

    return (
        <>
            <h1 style={{ cursor: 'pointer' }}
                onClick={() => setNäytetäänkö(!näytetäänkö)}> customers
            <button onClick={() => setLisäystila(true)}>Add new</button>
            </h1>

            {!lisäysTila &&
                <input placeholder="Search by company name" value={search} onChange={handleSearchInputChange} />
            }

            {
                customers && näytetäänkö === true && lisäysTila === false && customers.map(customer => {
                    const lowerCaseName = customer.companyName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return (
                            <Customer key={customer.customerId} customer={customer}
                                handleDeleteClick={handleDeleteClick} />
                        )
                    }
                }
                )
            }

            { !customers && <p>Loading...</p>}

            {lisäysTila && <CustomerAdd setLisäystila={setLisäystila} customers={customers} setCustomers={setCustomers} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />}

        </>
    )
}

export default CustomerList