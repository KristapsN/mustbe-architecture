import Head from 'next/head'
import Image from 'next/image'
import { Catamaran } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { RefObject, useEffect, useState } from 'react';
import Link from 'next/link';
import Paragraph from './components/paragrah';
import NextJsCarousel from './components/carusel';
import { debounce } from '@mui/material/utils';
import AnimateIn from './components/animateIn';

const catamaran = Catamaran({ subsets: ['latin'], weight: '500' })
export const catamaranLight = Catamaran({ subsets: ['latin'], weight: '300' })

const thumbnailImages = [
  ["/01_main.jpg", "profile.jpg", "/02_main.jpg" ],
  ["/02_main.jpg", "profile.jpg", "/04_main.jpg" ],
  ["/03_main.jpg", "profile.jpg", "/04_main.jpg" ],
  ["/04_main.jpg", "profile.jpg", "/04_main.jpg" ],
  ["/05_main.jpg", "profile.jpg", "/04_main.jpg" ],
  ["/06_main.jpg", "profile.jpg", "/04_main.jpg" ],
  ["/07_main.jpg", "profile.jpg", "/04_main.jpg" ],
  ["/08_main.jpg", "profile.jpg", "/04_main.jpg" ],
]

const thumbnailText = [
  "Arhitekta profesionālā pieredze uzkrāta Latvijā vadošos arhitektu birojos. MUST BE architecture darbība aizsākusies 2019. gadā un kopš tā laika ir izstrādāti dažāda mēroga objekti un izveidoti veiksmīgi sadarbības partneri.",
  'Second longer text',
  'Next longer text',
  'Next longer text',
  'Next longer text',
  'Next longer text',
  'Next longer text',
  'Last longer text',
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
    element && element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [prevScrollPos, visible, handleScroll]);

  console.log(visible)

  return (
    <>
      <Head>
        <title>MUST BE architecture</title>
        <meta name="MUST BE architecture" content="architecture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Grid container sx={{ position: 'fixed', zIndex: 100, top: visible ? 0 : '-75px', transition: 'top 0.4s' }}>
          <Grid item xs={12}>
            <Grid container spacing={0} justifyContent="space-between" direction="row" alignItems="flex-end" sx={{ backgroundColor: 'white' }}>
              <Grid item xs={4} sm={3} md={2}>
                <div className={styles.logo_wrapper}>
                  <Image
                    src="/logo.svg"
                    alt="MUST BE architecture"
                    width={150}
                    height={63}
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
                    <Link
                      className={styles.social_icon}
                      href="https://www.linkedin.com/"
                    >
                      <Image
                        src="/linkedin.svg"
                        alt="MUST BE architecture"
                        width={15}
                        height={15}
                      />
                    </Link>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ overflow: 'hidden' }}>
          <Grid container sx={{ flexGrow: 1 }} className={styles.parallax} id='top'>
            <Grid container sx={{ flexGrow: 1 }}>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: "flex-end", justifyContent: 'center' }}>
                <div className={`${styles.under_construction_wrapper} `}>
                  {/* <h1 className={`${catamaranLight.className} ${styles.under_construction}`}>under construction...</h1> */}
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
        </Box>
        <Box className={styles.go_up_wrapper} >
          <Grid container sx={{ flexGrow: 1, padding: "20px 8vw" }} >
            <AnimateIn>
            <Grid
              container
              justifyContent="space-around"
              alignItems="center"
              spacing={4}
            >
              <Grid item xs={6}>
                <Grid container>
                  <Paragraph
                    text="Telpa tiek uztverta ne tikai fiziski, bet arī emocionāli. Telpa, vide kurā dzīvojam, arhitektūra ietekmē
                cilvēka labsajūtu, tādēļ tās veidosanai ir liela nozīme ar ilgstosu iedarbību uz sabiedrību. (ūdens
                turpināsies / koriģēsies). Plānotais garums – 4-5 teikumi"
                  />
                </Grid>
              </Grid>
              <Grid item xs={6} >
                <Grid container>
                  <Paragraph
                    text="MUST BE architecture ir Rīgā bāzēts uzņēmums, kuru vada arhitekts Monvīds Bekmanis un arhitekts
                Kristiāns Beķeris. Veidojot komandu ar inženieriem mēs nodrošinām projektēšanas pakalpojumus sākot
                no koncepcijas stadijas līdz būvprojekta iztrādei un autoruzraudzībai būvniecibas laikā, kā arī
                piedāvājam sagatavot interjera dizaina projektus sadarbībā ar Donna Victoria Design."
                  />
                </Grid>
              </Grid>
            </Grid>
            </AnimateIn>
            <AnimateIn>
            <Grid item xs={12}><h1 className={`${catamaranLight.className} ${styles.margin_bottom}`} id="projects">PROJEKT</h1></Grid>
            </AnimateIn>
            <Grid
              container
              // justifyContent="space-around"
              // alignItems="center"
              spacing={4}
              sx={{ flexGrow: 1, marginBottom: '20px' }}
            >
              <>
                {thumbnailImages.map((images, index) =>
                  <Grid item xs={12} md={6} key={index} className={styles.thumbnail_content}>
                    <Box className={styles.thumbnail_title_wrapper} >
                      <h1 className={`${styles.thumbnail_title} ${catamaranLight.className}`}>{"Name of project / 2019"}</h1>
                    </Box>
                    <Box sx={{ overflow: 'hidden' }}>
                      {/* @ts-ignore */}
                        <NextJsCarousel images={images} text={thumbnailText} index={index}/>
                    </Box>
                  </Grid>
                )}

              </>
            </Grid>
            <AnimateIn>
              <Grid item xs={12}><h1 className={catamaranLight.className} id="about-us">PAR MUMS</h1></Grid>
            </AnimateIn>

            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={4}
              sx={{ marginBottom: '20px' }}
            >
              <Grid item xs={6}>
              <AnimateIn>
                <Grid container>
                  <Paragraph text={'Monvīds Bekmanis'}/>
                  <Box
                    className={styles.profile_image}
                  />
                </Grid>
              </AnimateIn>
              </Grid>
              <Grid item xs={6}>
              <AnimateIn>
              <Paragraph text={'Kristiāns Beķeris'}/>
                <Grid container>
                  <Box
                    className={styles.profile_image}
                  />
                </Grid>
              </AnimateIn>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={4}
              sx={{ marginBottom: "20px" }}
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

            <Grid item xs={12}><h1 className={catamaranLight.className} id="contacts">KONTAKTI</h1></Grid>

            <Grid
              container
              sx={{ marginBottom: "20px" }}
            >
              <Grid item xs={6}>
              <AnimateIn>
              <Box sx={{ display: 'flex'}}>
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
                    width="100%" height="438px"
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
                  <Link
                    className={styles.social_icon}
                    href="https://www.linkedin.com/"
                  >
                    <Image
                      src="/linkedin.svg"
                      alt="MUST BE architecture"
                      width={15}
                      height={15}
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
