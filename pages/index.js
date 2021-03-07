import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useEffect} from "react"
import SplashPage from './splash'
import DashBoard from './dashboard'
import { useAuth } from '../hooks/useAuth';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { auth, db } from '../config/fire-config';
import fire from '../config/fire-config';


export default function Home() {
  const auth = useRequireAuth()
  let user = auth.user;

  return (
    <div className={styles.container}>
      <Head>
        <title>Dark Horse Fantasy Sports</title>
        <link rel="icon" href="/DarkHorse.ico" />
      </Head>
      {user !== null? 
      <DashBoard />
      :
      <SplashPage />
    }
    </div>
  )
}
