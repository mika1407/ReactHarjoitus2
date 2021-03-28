import axios from 'axios'

const baseUrl = "https://localhost:5001/nw/products"

let token = null
// Tämä on metodi jota kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
// Parametrina annetaan token joka otetaan local storagesta
const setToken = newToken => {
    token = `bearer ${newToken}`
}

// Token liitetään metodeissa mukaan pyyntöön config objektin muodossa

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = newProduct => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newProduct, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token },
    }
return axios.delete(`${baseUrl}/${id}`, config)
}

const update = changedProduct => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/${changedProduct.productId}`, changedProduct, config)
}



export default { getAll, create, remove, update, setToken }