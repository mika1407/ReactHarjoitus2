import React, { useState, useEffect } from 'react'
import '../App.css'
import ProductService from '../services/product'
import ProductAdd from './ProductAdd'
import Product from './Product'
import ProductEdit from './ProductEdit'     
import Message from '../Message'


const ProductList = () => {

  const [products, setProducts] = useState([])
  const [näytetäänkö, setNäytetäänkö] = useState(true) // muutin falsen trueksi, näyttää tuotteet heti
  const [search, setSearch] = useState("")
  const [lisäysTila, setLisäystila] = useState(false)
  const [muokkausTila, setMuokkaustila] = useState(false)
  const [muokattavaProduct, setMuokattavaProduct] = useState({}) // yksi login olio

  const [showMessage, setShowMessage] = useState(false)
  const [isPositive, setIsPositive] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    ProductService
        .setToken(token)
    ProductService
      .getAll()
      .then(data => {
        setProducts(data)     
    })
  }, [lisäysTila, näytetäänkö, muokkausTila])

  //Hakukentän onChange tapahtumankäsittelijä
  const handleSeachInputChange = (event) => {
    setNäytetäänkö(true)
    setSearch(event.target.value.toLowerCase())
  }

   const handleDeleteClick = id => {

        //Kaivetaan esiin koko login olio jotta alertissa voidaan näyttää productname id:n sijaan
        const product = products.find(product => product.productId === id)

        // Poiston varmistus kyselyikkuna
        const confirm = window.confirm(`Haluatko todella poistaa: ${product.productName}:n pysyvästi?`)

        if (confirm) {

            const jwt = localStorage.getItem('token') // Token local storagesta
            ProductService.setToken(jwt) // Token servicelle tiedoksi

            ProductService.remove(id)
                .then(response => {

                    if (response.status === 200) {
                        // Poistetaan product statesta
                        setProducts(products.filter(filtered => filtered.productId !== id))

                        setMessage(`${product.productName}:n poisto onnistui!`)
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

    //EDIT buttonin tapahtumankäsittelijä saa parametrin product componentista
    const handleEditClick = product => {
        setMuokattavaProduct(product)
        setMuokkaustila(true)
    }

  return(
      <>
    <h1><nobr style={{ cursor: 'pointer'}} 
      onClick={() => setNäytetäänkö(!näytetäänkö)}>Products</nobr>

    <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button></h1>

    {!lisäysTila && !muokkausTila &&
       <input placeholder="Search by Productname" value={search} onChange={handleSeachInputChange}/>
    }

    { showMessage &&
        <Message message={message} isPositive={isPositive}/>
    }

    {products && näytetäänkö === true && lisäysTila === false && products.map(product =>{
      const lowerCaseName = product.productName.toLowerCase()
        if (lowerCaseName.indexOf(search) > -1) {
          return (
            <Product key={product.productId} product={product} 
              handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick}/>
          )
        }

      }   
      )
    }
      {!products && <p>Loading...</p>}

      {lisäysTila === true && <ProductAdd setLisäystila={setLisäystila}  products={products} setProducts={setProducts} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive}/>}

      {muokkausTila && <ProductEdit setMuokkaustila={setMuokkaustila} muokattavaProduct={muokattavaProduct} products={products} setProducts={setProducts} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />}
      </>
  )
  
}

export default ProductList