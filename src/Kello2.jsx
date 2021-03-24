import React from 'react';
import Kello from './Kello';
import './App.css'


 
 const Kello2 = () => {
 

  return (
    <div className="kello2">
      {<Kello koko={450}/>}
    
      <div style={{display: 'flex', justifyContent: 'left', marginLeft: 20}}>
         <div>Otsikkoa Northwind 2021 painamalla aukeaa toinen kello!</div>
      </div>
      
    </div>
  )
}

export default Kello2;