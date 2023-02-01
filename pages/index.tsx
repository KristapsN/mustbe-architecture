import Head from 'next/head'
import Image from 'next/image'
import { Catamaran } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const catamaran = Catamaran({ subsets: ['latin'], weight: '500' })
const catamaranLight = Catamaran({ subsets: ['latin'], weight: '300' })

export default function Home() {
  return (
    <>
      <Head>
        <title>Mustbe architecture</title>
        <meta name="mustbe architecture" content="architecture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={styles.parallax}>
        <Grid container spacing={0} justifyContent="space-between" direction="row" alignItems="flex-end">
          <Grid item xs={3} sm={2} md={2}  >
            <div className={`${styles.centered_flexbox} ${styles.margin_20}`}>
              <Image
                src="/mustbe_architecture_logo.svg"
                alt="Picture of the author"
                width={60}
                height={60}
              />
            </div>
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
          <span className={`${catamaranLight.className} ${styles.contact}`}>Contact</span>
          </Grid>
        </Grid>
        <Grid container spacing={0} justifyContent="space-between">
          <Grid item xs={12}>
            <hr className={styles.hr_style}></hr>
          </Grid>
          <Grid item xs={3} sm={2} md={2}>
            <div className={styles.centered_flexbox}>
              <span className={`${catamaran.className} ${styles.logo_main}`}>MUST BE</span>
              <span className={`${catamaranLight.className} ${styles.logo_second}`}>architecture</span>
            </div>
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
            <div className={styles.display_flex_column}>
              <span className={`${catamaranLight.className} ${styles.contact}`}>info@mustbe-architecture.lv</span>
              <span className={`${catamaranLight.className} ${styles.contact}`}>+371 29121613</span>
              <span className={`${catamaranLight.className} ${styles.contact}`}>Torņa iela 4, 2c, Rīga</span>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={`${styles.centered_flexbox} ${styles.height_500}`}>
              <h1 className={`${catamaranLight.className} ${styles.font_size_28}`}>under construction...</h1>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
