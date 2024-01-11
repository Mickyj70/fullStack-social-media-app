import Loader from "../../components/Loader"

const LoadingScreen = () => {
  return (
    <div className="loadingContainer">
      <img src="/applogo.png"/>
      <Loader/>
    </div>
  )
}

export default LoadingScreen
