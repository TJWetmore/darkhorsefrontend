import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from'../components/navbar'
import Footer from'../components/footer'
import SplashPage from './splash'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dark Horse Fantasy Sports</title>
        <link rel="icon" href="/DarkHorse.ico" />
      </Head>
      <Navbar/>
      <SplashPage />
    <Footer/>
    </div>
  )
}
