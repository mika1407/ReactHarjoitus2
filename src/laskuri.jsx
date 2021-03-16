import './App.css';

const Laskuri = ({luku, setLuku}) => {
  return (
    <>
    <h2>{luku}</h2>
    
    <button onClick={() => setLuku(luku +1)}>Kasvata </button>
    
    <button onClick={() => setLuku(luku -1)}>Vähennä </button>
    <br/>
    <button onClick={() => setLuku(0)}>Nollaa laskuri</button>
    </>
  );
}


export default Laskuri;