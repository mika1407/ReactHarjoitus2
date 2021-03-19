import '../App.css';
import React, {useState} from 'react'

const Login = ({login}) => {

const [näytäEnemmän, setNäytäEnemmän] = useState(false)

return (
    <>
      <h3 onMouseOver={() => setNäytäEnemmän(!näytäEnemmän)}
          onMouseLeave={() => setNäytäEnemmän(!näytäEnemmän)}
      >
        {login.firstname} <button>Delete</button><button>Edit</button>  {/* firstname pienellä */}
      </h3>

      {näytäEnemmän && <div className="customerWindow">
      <table>
        <thead>
          <tr>
            <th>Username: </th>
            <th>Firstname:</th>
            <th>Lastname:</th>
            <th>Email: </th>
            <th>AccessLevelId: </th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>{login.username}{' '}</td>
          <td>{login.firstname}</td>
          <td>{login.lastname}</td>
          <td>{login.email}{' '}</td>
          <td>{login.accesslevelId}</td>
        </tr>
        </tbody>
      </table></div>}
    </>
  );
}

export default Login;