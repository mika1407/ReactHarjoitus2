import './App.css';
import React, {useState} from 'react'


const Customer = ({customer, handleDeleteClick, handleEditClick}) => {

const [näytäEnemmän, setNäytäEnemmän] = useState(false)

// console.log(näytäEnemmän)

return (
    <>
    <h3><nobr
            onMouseOver={() => setNäytäEnemmän(true)}
            onMouseLeave={() => setNäytäEnemmän(false)}
        >
            {customer.companyName}

        </nobr>

      {/* <h3 onClick={() => setNäytäEnemmän(!näytäEnemmän)}>   
        {customer.companyName}  */}
        
        <button className="nappi" onClick={() => handleDeleteClick(customer.customerId)} >Delete</button>

        <button className="nappi" onClick={() => handleEditClick(customer)} >Edit</button>
      </h3>

      {näytäEnemmän && <div className="customerWindow">
      <table>
        <thead>
          <tr>
            <th>Contact person: </th>
            <th>Phone:</th>
            <th>Address:</th>
            <th>City: </th>
            <th>Country: </th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>{customer.contactName}{' '}</td>
          <td>{customer.phone}</td>
          <td>{customer.address}</td>
          <td>{customer.city}{'  '}</td>
          <td>{customer.country}</td>
        </tr>
        </tbody>
      </table></div>}
    </>
  );
}

export default Customer;
