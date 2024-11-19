
import React from "react";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import {Sidemenu} from "../../../components/global/Sidemenu";
import { Header } from "../../../components/global/Header";
import styles from './Home.module.css';


export function Home() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (<div className={styles.main}>
      {/* <Header text={"Create DataList CMB"} /> */}
      <div className={styles.container2}>
        <Sidemenu />
        <div className={styles.content}>
          <h1>Home</h1>
          <p>Bem-vindo a página inicial, </p>
          <h2>{user.username}</h2>
        </div>
      </div>
    </div>
    
    )
}