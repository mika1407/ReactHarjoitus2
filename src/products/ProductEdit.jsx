import React, { useState } from 'react'
import '../App.css'
import ProductService from '../services/product'

const ProductEdit = ({ setMuokkaustila, setProducts, products, setMessage, setShowMessage,
    setIsPositive, muokattavaProduct }) => {

    // State määritykset

    const [newProductId, setNewProductId] = useState(muokattavaProduct.productId)
    const [newProductName, setNewProductName] = useState(muokattavaProduct.productName);
    const [newSupplierId, setNewSupplierId] = useState(muokattavaProduct.supplierId);
    const [newCategoryId, setNewCategoryId] = useState(muokattavaProduct.categoryId);
    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit);
    const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice);

    const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock);
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder);
    const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel);
    const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued);

    // Muokkauslomakkeen onSubmit tapahtumankäsittelijä

    const submitProduct = (event) => {
        event.preventDefault()
          //console.log(typeof(newDiscontinued))
          //console.log(typeof(newUnitPrice))
          //console.log(newDiscontinued)
        let disc = true;
        newDiscontinued === "1" ? disc=true : disc=false

        var changedProduct = {
            productName: newProductName,
            supplierId: parseInt( newSupplierId),
            categoryId: parseInt( newCategoryId),
            quantityPerUnit: newQuantityPerUnit,
            unitPrice: parseFloat(newUnitPrice),
            unitsInStock: parseInt( newUnitsInStock),
            unitsOnOrder: parseInt( newUnitsOnOrder),
            reorderLevel: parseInt(newReorderLevel),
            discontinued: disc 
           
        }


          //console.log(changedProduct)
    const id = muokattavaProduct.productId
    // Lähetetään servicelle token ennen kuin tehdään update pyyntö serviceen
    const jwt = localStorage.getItem('token')
    ProductService.setToken(jwt)

    ProductService
        .update(id, changedProduct) // Put pyyntö back-endille
        .then(response => {

            if (response.status === 200) {

                const id = changedProduct.productId

                // Poistetaan ensin vanha product statesta
                setProducts(products.filter(filtered => filtered.productId !== id))

                // Ja lisätään uudestaan muuttuneilla tiedoilla
                setProducts(products.concat(changedProduct))

                //console.log(typeof(newUnitPrice))
                setMessage(`Päivitetty ${changedProduct.productName}`)
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
    // Lisätty required 

    return (
        <form onSubmit={submitProduct}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}
            <div>
                <p style={{ color: 'white' }}>ID field cannot be edited</p>
                <input type="text" value={newProductId} readOnly/>
            </div>
            <div>
                <input type="text" value={newProductName} placeholder="Product Name"
                    onChange={({ target }) => setNewProductName(target.value)} required />
            </div>
            <div>
                <input type="number" value={newSupplierId} placeholder="SupplierId"
                    onChange={({ target }) => setNewSupplierId(target.value)} />
            </div>
            <div>
                <input type="number" value={newCategoryId} placeholder="CategoryId"
                    onChange={({ target }) => setNewCategoryId(target.value)} />
            </div>
            <div>
                <input type="text" value={newQuantityPerUnit} placeholder="QuantityPerUnit"
                    onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
            </div>
            <div>
                <input type="number" value={newUnitPrice} placeholder="UnitPrice"
                    onChange={({ target }) => setNewUnitPrice(target.value)} step=".01"/>
            </div>
            <div>
                <input type="number" value={newUnitsInStock} placeholder="UnitsInStock"
                    onChange={({ target }) => setNewUnitsInStock(target.value)} />
            </div>
            <div>
                <input type="number" value={newUnitsOnOrder} placeholder="UnitsOnOrder"
                    onChange={({ target }) => setNewUnitsOnOrder(target.value)} />
            </div>
            <div>
                <input type="number" value={newReorderLevel} placeholder="ReorderLevel"
                    onChange={({ target }) => setNewReorderLevel(target.value)} />
            </div>
            <div>
                <input type="number" min="0" max="1" value={newDiscontinued} placeholder="Discontinued, anna 0 tai 1"    
                    onChange={({ target }) => setNewDiscontinued(target.value)} />   
            </div>

            <button className="nappi" type="submit" >Save</button>  
            {/* poistettu: style={{ background: 'green' }} */}

            <button className="nappi" onClick={() => setMuokkaustila(false)} style={{ background: 'red' }}>
                Cancel</button>
        </form>
    )
}

export default ProductEdit