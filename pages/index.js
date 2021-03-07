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

        {/* <!-- The core Firebase JS SDK is always required and must be listed first --> */}
        <script src="/__/firebase/8.2.10/firebase-app.js"></script>

        {/* <!-- TODO: Add SDKs for Firebase products that you want to use
            https://firebase.google.com/docs/web/setup#available-libraries --> */}
        <script src="/__/firebase/8.2.10/firebase-analytics.js"></script>

        {/* <!-- Initialize Firebase --> */}
        <script src="/__/firebase/init.js"></script>
      {user !== null? 
      <DashBoard />
      :
      <SplashPage />
    }
    </div>
  )
}
