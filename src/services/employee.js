import axios from 'axios'

const baseUrl = "https://localhost:5001/nw/employees"

let token = null
// Tämä on metodi jota kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
// Parametrina annetaan token joka otetaan local storagesta
const setToken = newToken => {
    token = `bearer ${newToken}`
}


const getAll = () => {
        const config = {
          headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = newEmployee => {
      const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newEmployee, config)
}

const remove = id => {
      const config = {
        headers: { Authorization: token },
    }
return  axios.delete(`${baseUrl}/${id}`, config)
} 

// const update = changedEmployee => {
//       const config = {
//         headers: { Authorization: token },
//     }
//     return axios.put(`${baseUrl}/${changedEmployee.employeeId}`, changedEmployee, config)
// }

const update = (id, changedEmployee) => {
      const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/${id}`, changedEmployee, config)
}


export default { getAll, create, remove, update, setToken }