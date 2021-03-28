import React, { useState } from "react";
import "../App.css";
import ProductService from "../services/product";

const ProductAdd = ({ setLisäystila, setProducts, products,setMessage,setShowMessage,
    setIsPositive }) => {
  // State määritykset

  const [newProductName, setNewProductName] = useState("");
  const [newSupplierId, setNewSupplierId] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newQuantityPerUnit, setNewQuantityPerUnit] = useState("");
  const [newUnitPrice, setNewUnitPrice] = useState("");

  const [newUnitsInStock, setNewUnitsInStock] = useState("");
  const [newUnitsOnOrder, setNewUnitsOnOrder] = useState("");
  const [newReorderLevel, setNewReorderLevel] = useState("");
  const [newDiscontinued, setNewDiscontinued] = useState("");

  // Lomakkeen onSubmit tapahtumankäsittelijä

  const submitProduct = (event) => {
    event.preventDefault();

    var newProduct = {
      productName: newProductName,
      supplierId: newSupplierId,
      categoryId: newCategoryId,
      quantityPerUnit: newQuantityPerUnit,
      unitPrice: newUnitPrice,
      unitsInStock: newUnitsInStock,
      unitsOnOrder: newUnitsOnOrder,
      reorderLevel: newReorderLevel,
      discontinued: newDiscontinued    
    };

    const jwt = localStorage.getItem("token");
    ProductService.setToken(jwt);

    console.log(newProduct)
    
    ProductService
      .create(newProduct)
      .then((response) => {
        if (response.status === 200) {
          setProducts(products.concat(newProduct));

          setMessage(`Lisätty ${newProduct.productName}`);
          setIsPositive(true);
          setShowMessage(true);

          setTimeout(() => {
            setShowMessage(false);
          }, 4000);
        }
      })
      .catch((error) => {
        setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`);
        setIsPositive(false);
        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
        }, 7000);
      });

    setTimeout(() => {
      setLisäystila(false);
    }, 500);
  };
  // Komponentti palauttaa käyttöliittymään form elementin

  return (
    <form onSubmit={submitProduct}>
      {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}
      <div>
        <input type="text" value={newProductName} placeholder="Productname" onChange={({ target }) => setNewProductName(target.value)} required />
      </div>
      <div>
        <input type="text" value={newSupplierId} placeholder="SupplierId" onChange={({ target }) => setNewSupplierId(target.value)} />
      </div>
      <div>
        <input type="text" value={newCategoryId} placeholder="CategoryId" onChange={({ target }) => setNewCategoryId(target.value)} />
      </div>
      <div>
        <input type="text" value={newQuantityPerUnit} placeholder="QuantityPerUnit" onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
      </div>
      <div>
        <input type="text" value={newUnitPrice} placeholder="UnitPrice" onChange={({ target }) => setNewUnitPrice(target.value)} />
      </div>
      <div>
        <input type="text" value={newUnitsInStock} placeholder="Units In Stock" onChange={({ target }) => setNewUnitsInStock(target.value)} />
      </div>
      <div>
        <input type="text" value={newUnitsOnOrder} placeholder="Units On Order" onChange={({ target }) => setNewUnitsOnOrder(target.value)} />
      </div>
      <div>
        <input type="text" value={newReorderLevel} placeholder="Reorderlevel" onChange={({ target }) => setNewReorderLevel(target.value)} />
      </div>
      <div>
        <input type="text" value={newDiscontinued} placeholder="Discontinued" onChange={({ target }) => setNewDiscontinued(target.value )} required />
      </div>
    

      <button className="nappi" type="submit">Create</button>
      
      <button className="nappi" onClick={() => setLisäystila(false)} style={{ background: "red" }}>Cancel</button>
    </form>
  );
};

export default ProductAdd;
