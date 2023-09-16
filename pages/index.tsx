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
import { Player } from '@lottiefiles/react-lottie-player';
import { getStaticProps } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';

const LanguageButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'black',
  minWidth: 0,
  paddingRight: 0,
  '&:hover': {
    backgroundColor: 'transparent',
  }
}));

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

interface ProjectProps {
  order_number: number
}
interface ContentProps {
  title: string
  content: string
}
interface DescriptionsProps {
  descriptions: ContentProps[]
}

interface ImagesProps {
  images: string[]
}

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
      block: 'start',
    });
    setOpenMenu(false)
  };

  const [language, setLanguage] = useState('LV');
  const [showLoader, setShowLoader] = useState(true)
  const [intro, setIntro] = useState({ first: '', second: '' })
  const [allDescriptionTitles, setAllDescriptionTitles] = useState<string[][]>([[]])
  const [thumbnailText, setThumbnailText] = useState<string[][]>([[]])
  const [mainImage, setMainImage] = useState('')
  const [openMenu, setOpenMenu] = useState(false)
  const [thumbnailImages, setThumbnailImages] = useState<string[][]>([])

  useEffect(() => {
    getStaticProps().then(({ props }) => {
      setIntro({ first: props.intro[0].first, second: props.intro[0].second })
      setMainImage(urlForImage(props.main[0].hero).url())

      const project_titles = props.projects_descriptions.sort((a: ProjectProps, b: ProjectProps) =>
        a.order_number - b.order_number).map(({ descriptions }: DescriptionsProps) =>
          descriptions.map(({ title }) => title)
      )

      setAllDescriptionTitles(project_titles)

      const project_content = props.projects_descriptions.sort((a: ProjectProps, b: ProjectProps) =>
        a.order_number - b.order_number).map(({ descriptions }: DescriptionsProps) =>
          descriptions.map(({ content }) => content)
      )
      setThumbnailText(project_content)

      const project_images = props.projects_images.sort((a: ProjectProps, b: ProjectProps) =>
        a.order_number - b.order_number).map(({images}: ImagesProps) =>
          images.map((image) => urlForImage(image).url())
      )

      setThumbnailImages(project_images)

    })

  }, [])

  const handleMenuClick = () => {
    setOpenMenu(!openMenu)
  }


  const handleChange = () => {
    language === 'LV'
      ? setLanguage('EN')
      : setLanguage('LV')
  };

  const loaderHandler = () => {
    setShowLoader(false)
  }

  setTimeout(loaderHandler, 3700)

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
            <Player
              autoplay
              keepLastFrame
              src="/logo_loader/logo_loader.json"
              style={{ height: '600px' }}
            >
            </Player>
          </Grid>
        </Box>

        <Grid container sx={{ position: 'fixed', zIndex: 100 }}>
          <Grid item xs={12}>
            <Grid container spacing={0} justifyContent="space-between" direction="row" alignItems="flex-end" sx={{ backgroundColor: 'white' }}>
              <Grid item xs={8} sm={4} md={4}>
                <Box className={styles.logo_wrapper}>
                  <Image
                    src="/logo.svg"
                    alt="MUST BE architecture"
                    fill
                    onClick={(e) => handleLinkClick(e, 'top')}
                  />
                </Box>
              </Grid>
              <Grid item xs={3} sm={7} md={5} lg={4}>
                <Box className={styles.mobile_menu_burger}>
                  {!openMenu ?
                    <Image
                      src="/menu.svg"
                      alt="menu"
                      fill
                      onClick={handleMenuClick}
                    />
                    :
                    <Image
                      src="/close.svg"
                      alt="menu"
                      fill
                      onClick={handleMenuClick}
                    />
                  }
                </Box>
                <Box className={styles.menu_wrapper}>
                  <Box className={styles.nav_link_wrapper}>
                    <Box sx={{ height: '4px', marginBottom: '4px' }}>
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
                    <Box sx={{ height: '4px', marginBottom: '4px' }}>
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
                    <Box sx={{ height: '4px', marginBottom: '4px' }}>
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
                        height={12}
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
                        height={12}
                      />
                    </Link>
                    <LanguageButton disableRipple sx={{ width: 20, height: 12, fontWeight: 300, fontSize: '14px' }} onClick={() => handleChange()}>{language}</LanguageButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {openMenu &&
              <Grid container spacing={0} sx={{ backgroundColor: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column' }}>
                  <Link
                    className={`${styles.nav_link} ${styles.mobile_nav_link}`}
                    href="#projects"
                    onClick={(e) => handleLinkClick(e, 'projects')}
                  >
                    Projekti
                  </Link>
                  <Link
                    className={`${styles.nav_link} ${styles.mobile_nav_link}`}
                    href="#about-us"
                    onClick={(e) => handleLinkClick(e, 'about-us')}
                  >
                    Par mums
                  </Link>
                  <Link
                    className={`${styles.nav_link} ${styles.mobile_nav_link}`}
                    href="#contacts"
                    onClick={(e) => handleLinkClick(e, 'contacts')}
                  >
                    Kontakti
                  </Link>
                </Box>
              </Grid>
            }
          </Grid>
        </Grid>
        <Box sx={{ overflow: 'hidden', minHeight: '85vh' }}>
          <Parallax speed={-50}>
            <Grid container sx={{ flexGrow: 1, backgroundImage: `url(${mainImage})` }} className={styles.parallax} id='top'>
            </Grid>
          </Parallax>
        </Box>
        <Box sx={{ overflow: 'hidden', minHeight: '15vh' }}>
          <Grid
            container
            justifyContent="space-around"
            alignItems="flex-start"
            spacing={4}
            sx={{ padding: "20px 8vw", backgroundColor: 'white' }}
          >
            <Grid item xs={12} md={6}>
              <Grid container>
                <Paragraph
                  text={intro.first}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container>
                <Paragraph
                  text={intro.first}
                />
              </Grid>
            </Grid>
          </Grid>
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
                  <Grid item xs={12} md={6} key={index} sx={{ marginTop: 3 }} className={styles.thumbnail_content}>
                    <Box className={styles.thumbnail_title_wrapper} >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 className={styles.thumbnail_title}>{projectTitles[index]}</h2>
                        <h2 className={styles.thumbnail_title}>{projectYear[index]}</h2>
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

              <Grid item xs={12} md={6}>
                <AnimateIn>
                  <Grid container>
                    <Paragraph
                      text="Arhitekta profesionālā pieredze uzkrāta Latvijā vadošos arhitektu birojos,
                      darbojoties ar dažāda mēroga ēku koncepciju izstrādi, ēku projektēšanu un projekta vadību.
                      MUST BE architecture darbība aizsākusies 2019. gadā un veidojot sadarbību ar dažādu profesiju
                      speciālistiem mēs palīdzam transformēt klienta velmes no idejām līdz objekta realizēšanai."
                    />
                  </Grid>
                </AnimateIn>
              </Grid>
              <Grid item xs={12} md={6} >
                <AnimateIn>
                  <Grid container>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '1rem' }}>
                      <Paragraph
                        text="Sadarbības partneri:"
                      />
                      <Paragraph
                        text="Interjera dizainere: Donna Victoria Design"
                      />
                      <Paragraph
                        text="Arhitekti: Aigars Tereško, Mikus Druviņš, Toms Ambrozs "
                      />
                      <Paragraph
                        text="Uldis Jaunsubrēns - tehnisko risinājumu konsultants"
                      />
                      <Paragraph
                        text="BIM speciālists: Rinalds Petjukēvičš"
                      />
                      <Paragraph
                        text="Vizualizāciju speciālists: Reinis Janson"
                      />
                      <Paragraph
                        text="Inženieri: Miķelis Siliņš, Pāvels Stepanovs, Māris Arnavs, Kārlis Mūrnieks, Dāvis Vecbaštiks"
                      />
                      <Paragraph
                        text="Konsultants: Uldis Jaunsubrēns"
                      />
                      <Paragraph
                        text="Uzņēmumi: Būvdizains, AZ Service, Aver Brokarage"
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
                      <h2 className={styles.thumbnail_title}>
                        {"Monvīds Bekmanis"}
                      </h2>
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
                      <h2 className={styles.thumbnail_title}>
                        {"Kristiāns Beķeris"}
                      </h2>
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6} >
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
