import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const CheckNotLogged = (OriginComponent) => {
  function ExtendComponent() {
    const logged = useSelector(({Auth}) => Auth.login.logged);
    return logged 
      ? <OriginComponent/>
      : <Navigate to={"/"}/>
  }
  return ExtendComponent
}

export default CheckNotLogged;