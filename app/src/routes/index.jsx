import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./privateRoutes";
import { Login } from "../Pages/Login";
import { Config } from "../Pages/Private/Config/Config";
import { Register } from "../Pages/Register";

export function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/config" element={ 
          <PrivateRoute>
              <Config/>
          </PrivateRoute> }/>

          <Route
          path="/registro" element={ 
          <PrivateRoute>
              <Register/>
          </PrivateRoute> }/>
        
      </Routes>
    </BrowserRouter>
  );
}
