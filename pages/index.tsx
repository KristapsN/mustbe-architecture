import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { RefObject, useEffect, useState } from 'react';
import Link from 'next/link';
import Paragraph from './components/paragrah';
import NextJsCarousel from './components/carusel';
import AnimateIn from './components/animateIn';
import { styled, Divider, Button, ButtonProps } from '@mui/material';
import { Parallax } from 'react-scroll-parallax';

const LanguageButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'black',
  minWidth: 0,
  paddingRight: 0,
  '&:hover': {
    backgroundColor: 'transparent',
  }
}));

const thumbnailImages = [
  ["01_Birojs/01_main.jpg", "white.jpg", "01_Birojs/03_main.jpg", "01_Birojs/04_main.jpg", "01_Birojs/05_main.jpg", "01_Birojs/06_main.jpg"],
  ["02_Ogre/01_main.jpg", "white.jpg", "02_Ogre/02_main.jpg", "02_Ogre/03_main.jpg", "02_Ogre/04_main.jpg"],
  ["03_Olaine/01_main.jpg", "white.jpg", "03_Olaine/02_main.jpg", "03_Olaine/03_main.jpg", "03_Olaine/04_main.jpg", "03_Olaine/05_main.jpg", "03_Olaine/06_main.jpg", "03_Olaine/07_main.jpg", "03_Olaine/08_main.jpg", "03_Olaine/09_main.jpg"],
  ["04_R47/01_main.jpg", "white.jpg", "04_R47/02_main.jpg", "04_R47/03_main.jpg", "04_R47/04_main.jpg", "04_R47/05_main.jpg", "04_R47/06_main.jpg", "04_R47/07_main.jpg", "04_R47/08_main.jpg", "04_R47/09_main.jpg"],
  ["05_Bergi/01_main.jpg", "white.jpg", "05_Bergi/02_main.jpg", "05_Bergi/03_main.jpg"],
  ["06_Graudi/01_main.jpg", "white.jpg", "06_Graudi/02_main.jpg"],
  ["07_Nometnu/01_main.jpg", "white.jpg", "07_Nometnu/02_main.jpg", "07_Nometnu/03_main.jpg", "07_Nometnu/04_main.jpg", "07_Nometnu/05_main.jpg", "07_Nometnu/06_main.jpg"],
  ["09_Garkalne/01_main.jpg", "white.jpg", "09_Garkalne/02_main.jpg", "09_Garkalne/03_main.jpg", "09_Garkalne/04_main.jpg", "09_Garkalne/06_main.jpg", "09_Garkalne/07_main.jpg", "09_Garkalne/08_main.jpg", "09_Garkalne/09_main.jpg", "09_Garkalne/10_main.jpg", "09_Garkalne/11_main.jpg"]
]


const firstDescriptionTitles = [
  'Autors:',
  'Vizuālizācijas:',
  'Adrese:',
  'Apjoms:',
  'Statuss:'
]

const secondDescriptionTitles = [
  'Komanda:',
  'Interjera dizains un labiekārtojums:',
  'Vizualizācijas:',
  'Sadarbības partneris:',
  'Apjoms:',
  'Adrese:',
  'Statuss:'
]

const thirdDescriptionTitles = [
  'Komanda:',
  'Interjera dizains:',
  'Vizualizācija:',
  'Sadarbības partneris:',
  'Adrese:',
  'Apjoms:',
  'Statuss:'
]

const fourthDescriptionTitles = [
  'Komanda:',
  'Vizuālizācijas:',
  'Adrese:',
  'Apjoms:',
  'Statuss:'
]

const fifthDescriptionTitles = [
  'Komanda:',
  'Labiekārtojums un interjera dizains',
  'Vizualizācijas',
  'Adrese',
  'Apjoms',
  'Statuss',
]

const allDescriptionTitles = [
  firstDescriptionTitles,
  firstDescriptionTitles,
  secondDescriptionTitles,
  thirdDescriptionTitles,
  firstDescriptionTitles,
  fourthDescriptionTitles,
  fourthDescriptionTitles,
  fifthDescriptionTitles
]

const firstProjectDescription = [
  'MONVIDS BEKMANIS',
  'Donna Victoria Design',
  'Toma iela 3, Rīga',
  '1950 m2',
  'Meta stadija'
]

const secondProjectDescription = [
  'Monvīds Bekmanis',
  'Reinis Jansons / Regger /',
  'Ogres novads',
  '230 m2',
  'Būvprojekts minimālā sastāvā',
]

const thirdProjectDescription = [
  'Monvīds Bekmanis, Kristiāns Beķeris',
  'Donna Victoria Design',
  'Reinis Jansons / Regger /,  Donna Victoria Design',
  'SIA "Būvdizains"',
  '5080 m2',
  'Jelgavas iela 23, Olaine',
  'Meta konkurss',
]

const fourthProjectDescription = [
  'Monvīds Bekmanis, Kristiāns Beķeris',
  'Donna Victoria Design',
  'Reinis Jansons / Regger /, Donna Victoria Design',
  'SIA "Būvdizains"',
  'Rīgas iela 47, Jūrmala',
  '2630 m2',
  'Pabeigta būvniecība',
]

const fifthProjectDescription = [
  'Monvīds Bekmanis',
  'Reinis Jansons / Regger /',
  'Pastaigu iela 6, Berģi',
  '265 m2',
  'Būvprojekts',
]

const sixtProjectDescription = [
  'Kristiāns Beķeris, Monvīds Bekmanis',
  'Vinalds Petjukevičs',
  '"Rūķīši" 1, Vecsaule, Vecsaules pagasts',
  '1770 m2',
  'Pabeigta būvniecība',
]

const seventhProjectDescription = [
  'Monvīds Bekmanis, Kristiāns Beķeris',
  'Rinalds Petjukevičs',
  'Mazā Nometņu iela 80, Rīga',
  '905 m2',
  'Meta stadija',
]

const eightProjectDescription = [
  'Monvīds Bekmanis, Kristiāns Beķeris',
  'Donna Victoria Design',
  'Reinis Jansons / Regger /,  Donna Victoria Design',
  'Vidzemes šoseja 34A, 38A, Garkalne',
  '3320 m2',
  'Meta konkurss',
]


const thumbnailText = [
  firstProjectDescription,
  secondProjectDescription,
  thirdProjectDescription,
  fourthProjectDescription,
  fifthProjectDescription,
  sixtProjectDescription,
  seventhProjectDescription,
  eightProjectDescription
]

const projectTitles = [
  'CLT PANEĻU BIROJA ĒJA',
  'PRIVĀTMĀJA OGRĒ',
  'MULTIFUNKCIONĀLAS CENTRS',
  'DAUDZDZĪVOKĻU ĒKA JŪRMALĀ',
  'PRIVĀTMĀJA BERĢOS',
  'GRAUDU PIRMSAPSTRĀDES KOMPLEKSS',
  'DAUDZDZĪVOKĻU ĒKA PĀRDAUGAVĀ',
  'PIRMSKOLAS IZGLĪTĪBAS IESTĀDE'

]

const projectYear = [
  '2020',
  '2020',
  '2020',
  '2019-2020',
  '2020-2022',
  '2019-2020',
  '2021',
  '2021'
]


export const useElementOnScreen = (
  ref: RefObject<Element>,
  rootMargin = "-50px",
) => {
  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return isIntersecting;
}

export default function Home() {
  const handleLinkClick = (event: { preventDefault: () => void; }, value: string) => {
    event.preventDefault();
    const element = document.getElementById(value);
    element && element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const [language, setLanguage] = useState('LV');
  const [showLoader, setShowLoader] = useState(true)


  const handleChange = () => {
    language === 'LV'
      ? setLanguage('EN')
      : setLanguage('LV')
  };

  const loaderHandler = () => {
    setShowLoader(false)
  }

  setTimeout(loaderHandler, 2000)

  return (
    <>
      <Head>
        <title>MUST BE architecture</title>
        <meta name="MUST BE architecture" content="architecture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Box sx={{}} className={`${!showLoader && styles.preloader_fade}`}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ flexGrow: 1 }}
            className={`${styles.preloader}`}
          >

            <Image
              src="/logo-loader.svg"
              alt="MUST BE architecture"
              width={400}
              height={94}
            />
          </Grid>
        </Box>

        <Grid container sx={{ position: 'fixed', zIndex: 100 }}>
          <Grid item xs={12}>
            <Grid container spacing={0} justifyContent="space-between" direction="row" alignItems="flex-end" sx={{ backgroundColor: 'white' }}>
              <Grid item xs={4} sm={3} md={2}>
                <div className={styles.logo_wrapper}>
                  <Image
                    src="/logo.svg"
                    alt="MUST BE architecture"
                    width={400}
                    height={94}
                    onClick={(e) => handleLinkClick(e, 'top')}
                  />
                </div>
              </Grid>
              <Grid item xs={7} sm={4} md={4}>
                <div className={styles.menu_wrapper}>
                  <Box className={styles.nav_link_wrapper}>
                    <Box sx={{ height: '4px' }}>
                      <svg className={styles.nav_arrow} width="10" height="4" viewBox="0 0 521 216" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M260.5 216L0.259418 0.749951L520.741 0.749996L260.5 216Z" fill="black" />
                      </svg>
                    </Box>

                    <Link
                      className={`${styles.nav_link}`}
                      href="#projects"
                      onClick={(e) => handleLinkClick(e, 'projects')}
                    >
                      Projekti
                    </Link>
                  </Box>
                  <Box className={styles.nav_link_wrapper}>
                    <Box sx={{ height: '4px' }}>
                      <svg className={styles.nav_arrow} width="10" height="4" viewBox="0 0 521 216" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M260.5 216L0.259418 0.749951L520.741 0.749996L260.5 216Z" fill="black" />
                      </svg>
                    </Box>
                    <Link
                      className={`${styles.nav_link}`}
                      href="#about-us"
                      onClick={(e) => handleLinkClick(e, 'about-us')}                    >
                      Par mums
                    </Link>
                  </Box>
                  <Box className={styles.nav_link_wrapper}>
                    <Box sx={{ height: '4px' }}>
                      <svg className={styles.nav_arrow} width="10" height="4" viewBox="0 0 521 216" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M260.5 216L0.259418 0.749951L520.741 0.749996L260.5 216Z" fill="black" />
                      </svg>
                    </Box>
                    <Link
                      className={`${styles.nav_link}`}
                      href="#contacts"
                      onClick={(e) => handleLinkClick(e, 'contacts')}
                    >
                      Kontakti
                    </Link>
                  </Box>
                  <Box className={styles.center_flex}>
                    <Link
                      className={styles.social_icon}
                      href="https://www.facebook.com/"
                    >
                      <Image
                        src="/facebook.svg"
                        alt="MUST BE architecture"
                        width={20}
                        height={20}
                      />
                    </Link>
                    <Link
                      href="https://www.instagram.com/"
                      className={styles.social_icon}
                    >
                      <Image
                        src="/instagram.svg"
                        alt="MUST BE architecture"
                        width={20}
                        height={20}
                      />
                    </Link>
                    <LanguageButton disableRipple sx={{ width: 20, height:20, fontWeight: 300, fontSize: '14px' }} onClick={() => handleChange()}>{language}</LanguageButton>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ overflow: 'hidden', minHeight: '100vh' }}>
          <Parallax speed={0}>
          <Grid container sx={{ flexGrow: 1 }} className={styles.parallax} id='top'>
          </Grid>
          </Parallax>
          <Parallax speed={-5}>
          <Grid
            container
            justifyContent="space-around"
            alignItems="flex-start"
            spacing={4}
            sx={{ padding: "20px 8vw", backgroundColor: 'white' }}
          >
            <Grid item xs={6}>
              <Grid container>
                <Paragraph
                  text="Telpa, vide, arhitektūra ir neatņemama ikdienas sastāvdaļa,
                  daļa no mums pašiem, daļa no sabiedrības veidotāja, tādēļ tās radīšanas procesam
                  ir jābūt rūpīgi pārdomātam, veidojot funkcionāli ērtu, energo gudru, ilgstpējīgu un vienlaikus
                  labklājības veicinošu fizikālu un emocionālu kopumu."
                />
              </Grid>
            </Grid>
            <Grid item xs={6} >
              <Grid container>
                <Paragraph
                  text="MUST BE architecture ir Rīgā bāzēts uzņēmums, kuru vada arhitekts Monvīds Bekmanis
                  un arhitekts Kristiāns Beķeris. Veidojot komandu ar dažādu profesiju speciālistiem
                  mēs nodrošinām projektēšanas pakalpojumus sākot no koncepcijas stadijas
                  līdz būvprojekta izstrādei un autoruzraudzībai būvniecības laikā. "
                />
              </Grid>
            </Grid>
          </Grid>
          </Parallax>
        </Box>
        <Box className={styles.go_up_wrapper} >
          <Grid container sx={{ flexGrow: 1, padding: "20px 8vw" }} >
            <AnimateIn>
              <Grid item xs={12}><h1 className={styles.margin_bottom} id="projects">PROJEKT</h1></Grid>
            </AnimateIn>
            <Grid
              container
              justifyContent="space-around"
              alignItems="center"
              spacing={4}
              sx={{ flexGrow: 1, marginBottom: '40px' }}
            >
              <>
                {thumbnailImages.map((images, index) =>
                  <Grid item xs={12} md={6} key={index} sx={{marginTop: 3}} className={styles.thumbnail_content}>
                    <Box className={styles.thumbnail_title_wrapper} >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1 className={styles.thumbnail_title}>{projectTitles[index]}</h1>
                        <h1 className={styles.thumbnail_title}>{projectYear[index]}</h1>
                      </Box>
                      <Divider sx={{ backgroundColor: 'rgb(26, 26, 26)' }} />
                    </Box>
                    <Box sx={{ overflow: 'hidden' }}>
                      <NextJsCarousel images={images} text={thumbnailText} descriptionTitles={allDescriptionTitles} index={index} />
                    </Box>
                  </Grid>
                )}

              </>
            </Grid>
            <AnimateIn>
              <Grid item xs={12}><h1 className={styles.margin_bottom} id="about-us">PAR MUMS</h1></Grid>
            </AnimateIn>

            <Grid
              container
              spacing={4}
              sx={{ marginBottom: "40px" }}
            >

              <Grid item xs={6}>
                <AnimateIn>
                  <Grid container>
                    <Paragraph
                      text="Arhitekta profesionālā pieredze uzkrāta Latvijā vadošos arhitektu birojos. MUST BE architecture darbība
                aizsākusies 2019. gadā un kopš tā laika ir izstrādāti dažāda mēroga objekti un izveidoti veiksmīgi
                sadarbības partneri."
                    />
                  </Grid>
                </AnimateIn>
              </Grid>
              <Grid item xs={6} >
                <AnimateIn>
                  <Grid container>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '1rem' }}>
                      <Paragraph
                        text="Sadarbības partneri:"
                      />
                      <Paragraph
                        text="Donna Victoria Design - interjera dizains un teritorijas labiekārtojums"
                      />
                      <Paragraph
                        text="Rinalds Petjukevičs - 3D modelēšanas un BIM speciālists"
                      />
                      <Paragraph
                        text="Uldis Jaunsubrēns - tehnisko risinājumu konsultants"
                      />
                      <Paragraph
                        text="Reinis Jansons - 3D vizualizācijas"
                      />
                      <Paragraph
                        text="Aigars Tereško - arhitekts"
                      />
                      <Paragraph
                        text="Mikus Druviņš - arhitekts"
                      />
                      <Paragraph
                        text="Jānis Atelbauers - arhitekts"
                      />
                      <Paragraph
                        text="Būvdizains SIA - arhitektu birojs"
                      />
                      <Paragraph
                        text="Aver brokerage - nekustamo īpašumu aģentūra"
                      />
                    </Box>
                  </Grid>
                </AnimateIn>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={4}
              sx={{ marginBottom: '40px' }}
            >
              <Grid item xs={6}>
                <AnimateIn>
                  <Grid container className={styles.thumbnail_content}>
                    <Box className={styles.thumbnail_title_wrapper} >
                      <h1 className={styles.thumbnail_title}>
                        {"Monvīds Bekmanis"}
                      </h1>
                    </Box>
                    <Box
                      className={styles.profile_image}
                    />
                  </Grid>
                </AnimateIn>
              </Grid>
              <Grid item xs={6}>
                <AnimateIn>
                  <Grid container className={styles.thumbnail_content}>
                    <Box className={styles.thumbnail_title_wrapper} >
                      <h1 className={styles.thumbnail_title}>
                        {"Kristiāns Beķeris"}
                      </h1>
                    </Box>
                    <Box
                      className={styles.profile_image}
                    />
                  </Grid>
                </AnimateIn>
              </Grid>
            </Grid>

            <Grid item xs={12}><h1 id="contacts">KONTAKTI</h1></Grid>

            <Grid
              container
              sx={{ marginBottom: "40px" }}
              spacing={4}
            >
              <Grid item xs={6}>
                <AnimateIn>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '1rem' }}>
                      <Paragraph
                        text="Saziņa:"
                      />
                      <Paragraph
                        text="A: Torņa iela 4-2c, Vecrīga"
                      />
                      <Paragraph
                        text=" M: info@mustbe-architecture.lv"
                      />
                      <Paragraph
                        text="T: +371 29121613"
                      />
                      <Paragraph
                        text="(starpā ikonas - fb, insta, linkdin)"
                      />
                    </Box>
                    <br />
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '1rem', marginLeft: '1rem' }}>
                      <Paragraph
                        text="Rekvizīti:"
                      />
                      <Paragraph
                        text="N: MUST BE architecture SIA"
                      />
                      <Paragraph
                        text="R: 40103354466"
                      />
                      <Paragraph
                        text="PVN: LV40103354466"
                      />
                      <Paragraph text="A: Rubeņu iela 19, Jūrmala, LV-2008" />
                    </Box>
                  </Box>
                </AnimateIn>
              </Grid>
              <Grid item xs={6} >
                <AnimateIn>
                  <Grid container >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4628.72510816559!2d24.101442221661383!3d56.95051397128047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eecfd0eb9c6729%3A0xe79c8c86f527aa2c!2sTor%C5%86a%20iela%204-2c%2C%20Centra%20rajons%2C%20R%C4%ABga%2C%20LV-1050!5e0!3m2!1sen!2slv!4v1677524894449!5m2!1sen!2slv"
                      width="100%" height="452px"
                      style={{ border: 0, filter: 'grayscale(100%)' }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </Grid>
                </AnimateIn>
              </Grid>
            </Grid>
            <Grid container sx={{ marginBottom: "20px" }}>
              <Grid item xs={12}>
                <Box className={styles.center_flex}>
                  <Link
                    className={styles.social_icon}
                    href="https://www.facebook.com/"
                  >
                    <Image
                      src="/facebook.svg"
                      alt="MUST BE architecture"
                      width={20}
                      height={20}
                    />
                  </Link>
                  <Link
                    href="https://www.instagram.com/"
                    className={styles.social_icon}
                  >
                    <Image
                      src="/instagram.svg"
                      alt="MUST BE architecture"
                      width={20}
                      height={20}
                    />
                  </Link>
                </Box>
                <Box className={styles.center_flex}>
                  <p>© MUSTBE architecture </p>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <button
            onClick={(e) => handleLinkClick(e, 'top')}
            className={styles.go_up}
          >
            <Image
              src="/arrow_down.svg"
              alt="Arrow down"
              width={30}
              height={10}
              className={styles.go_up_image}
            />
          </button>
        </Box>
      </Box>
    </>
  )
}
function useCallback(arg0: (event: any) => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}

