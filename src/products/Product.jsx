import '../App.css';
import React, {useState} from 'react'

const Product = ({product, handleDeleteClick, handleEditClick}) => {

const [näytäEnemmän, setNäytäEnemmän] = useState(false)

return (
    <>
      <h3><nobr onMouseOver={() => setNäytäEnemmän(!näytäEnemmän)}
          onMouseLeave={() => setNäytäEnemmän(!näytäEnemmän)}
      >
        {product.productName}       {/* productName */}
        </nobr>
        <button className="nappi" onClick={() => handleDeleteClick(product.productId)} >Delete</button>

        <button className="nappi" onClick={() => handleEditClick(product)} >Edit</button>
      </h3>

      {näytäEnemmän && <div className="customerWindow">
      <table>
        <thead>
          <tr>
            <th>ProductName: </th>
            <th>SupplierId:</th>
            <th>QuantityPerUnit:</th>
            <th>UnitPrice: </th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>{product.productName}</td>   {/* productName, camelcase myös tänne */}
          <td>{product.supplierId}</td>
          <td>{product.quantityPerUnit}</td>
          <td>{product.unitPrice}</td>
        </tr>
        </tbody>
      </table></div>}
    </>
  );
}

export default Product;