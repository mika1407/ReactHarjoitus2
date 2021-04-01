import '../App.css';
import React, {useState} from 'react'

const Employee = ({employee, handleDeleteClick, handleEditClick}) => {

const [näytäEnemmän, setNäytäEnemmän] = useState(false)

return (
    <>
      <h3><nobr onMouseOver={() => setNäytäEnemmän(!näytäEnemmän)}
          onMouseLeave={() => setNäytäEnemmän(!näytäEnemmän)}
      >
        {employee.firstName}       {/* firstName  */}
        </nobr>
        <button className="nappi" onClick={() => handleDeleteClick(employee.employeeId)} >Delete</button>

        <button className="nappi" onClick={() => handleEditClick(employee)} >Edit</button>
      </h3>

      {näytäEnemmän && <div className="customerWindow">
      <table>
        <thead>
          <tr>
            <th>Firstname:</th>
            <th>Lastname:</th>
            <th>Title: </th>
            <th>City: </th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>{employee.title}</td>
          <td>{employee.city}</td>
        </tr>
        </tbody>
      </table></div>}
    </>
  );
}

export default Employee;