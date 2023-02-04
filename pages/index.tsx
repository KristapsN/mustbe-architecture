import Head from 'next/head'
import Image from 'next/image'
import { Catamaran } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Grid from '@mui/material/Grid';

const catamaran = Catamaran({ subsets: ['latin'], weight: '500' })
const catamaranLight = Catamaran({ subsets: ['latin'], weight: '300' })


export default function Home() {
  return (
    <>
      <Head>
        <title>MUST BE architecture</title>
        <meta name="MUST BE architecture" content="architecture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container sx={{ flexGrow: 1 }} className={styles.parallax}>
        <Grid item xs={12}>
          <Grid container spacing={0} justifyContent="space-between" direction="row" alignItems="flex-end">
            <Grid item xs={4} sm={3} md={2}  >
              <div className={styles.margin_20}>
                <Image
                  src="/mustbe_architecture_logo.png"
                  alt="MUST BE architecture"
                  width={100}
                  height={100}
                />
              </div>
            </Grid>
            <Grid item xs={7} sm={4} md={3}>
              <div className={styles.display_flex_column}>
                <span className={`${catamaranLight.className} ${styles.contact}`}>Contact</span>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={0} justifyContent="space-between">
            <Grid item xs={12}>
              <hr className={styles.hr_style}></hr>
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <div className={styles.logo_wrapper}>
                <Image
                  src="/logo_text.svg"
                  alt="MUST BE architecture"
                  width={100}
                  height={35}
                />
              </div>
            </Grid>
            <Grid item xs={7} sm={4} md={3}>
              <div className={styles.display_flex_column}>
                <span className={`${catamaranLight.className} ${styles.contact}`}>info@mustbe-architecture.lv</span>
                <span className={`${catamaranLight.className} ${styles.contact}`}>+371 29121613</span>
                <span className={`${catamaranLight.className} ${styles.contact}`}>Torņa iela 4, 2c, Rīga</span>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid container sx={{ flexGrow: 1 }}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: "flex-end", justifyContent: 'center' }}>
            <div className={`${styles.under_construction_wrapper} `}>
              <h1 className={`${catamaranLight.className} ${styles.under_construction}`}>under construction...</h1>
              <Image
                src="/arrow_down.svg"
                alt="Arrow down"
                width={50}
                height={20}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
