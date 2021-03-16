import React, {useState} from 'react'
import './App.css';
/*import Laskuri from './laskuri'*/
import CustomerList from './CustomerList'
import Kello from './Kello'
import Message from './Message'

const App = () => {

const [luku, setLuku] = useState(0)
const [clock, setClock] = useState(false)

const [showMessage, setShowMessage] = useState(false)
const [isPositive, setIsPositive] = useState(false)
const [message, setMessage] = useState('')

/*setTimeout(() => {
  setLuku(luku + 1)
}, 1000
)*/

  return (
    <div className="App">
      <header className="App-header">
        <h1 onClick={() => setClock(!clock)} style={{ cursor: 'pointer'}} >Northwind 2021</h1>   {/*lisätty: style={{ cursor: 'pointer'}} , postettu <marquee> */}
      </header>

        { showMessage &&
          <Message message={message} isPositive={isPositive}/>
        }
        

        {clock && <Kello koko={450} />}

        {!clock && <CustomerList setShowMessage={setShowMessage} setIsPositive={setIsPositive}
        setMessage={setMessage} />}
        
        {/*<Laskuri luku={luku} setLuku={setLuku}/>*/}

    </div>
  );
}

export default App;
