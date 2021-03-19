import '../App.css'

const LoginAdd = ({setLisäystila}) => {
  return (
    <>
      <p>Tähän tulee lisäys formi</p>

      <button onClick={() => setLisäystila(false)}>Cancel</button>
            

    </>
  )
}

export default LoginAdd