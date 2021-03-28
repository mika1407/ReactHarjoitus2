import '../App.css';
import React, {useState} from 'react'

const Login = ({login, handleDeleteClick, handleEditClick}) => {

const [näytäEnemmän, setNäytäEnemmän] = useState(false)

return (
    <>
      <h3><nobr onMouseOver={() => setNäytäEnemmän(!näytäEnemmän)}
          onMouseLeave={() => setNäytäEnemmän(!näytäEnemmän)}
      >
        {login.firstname}       {/* firstname pienellä */}
        </nobr>
        <button className="nappi" onClick={() => handleDeleteClick(login.loginId)} >Delete</button>

        <button className="nappi" onClick={() => handleEditClick(login)} >Edit</button>
      </h3>

      {näytäEnemmän && <div className="customerWindow">
      <table>
        <thead>
          <tr>
            <th>Username: </th>
            <th>Firstname:</th>
            <th>Lastname:</th>
            <th>Email: </th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>{login.username}</td>
          <td>{login.firstname}</td>
          <td>{login.lastname}</td>
          <td>{login.email}</td>
        </tr>
        </tbody>
      </table></div>}
    </>
  );
}

export default Login;