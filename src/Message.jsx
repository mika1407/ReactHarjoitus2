import './App.css'

const Message = ({message, isPositive }) => {

if (isPositive == true){
    var tyyli = "pos"
  }
else {
    var tyyli = "neg"
}

  return(
    <div className={tyyli}>
      {message}
    </div>
  )
}

export default Message