import React from 'react';
import Kello from './Kello';
import './App.css'


 
 const Kello2 = () => {
 

  return (
    <div className="kello2">
      <div style={{display: 'flex', justifyContent: 'left', marginLeft: 30}}>
         <div>Tämä sivu näyttää vain kellon</div>
      </div>

      {<Kello koko={400}/>}
    
      
    </div>
  )
}

export default Kello2;