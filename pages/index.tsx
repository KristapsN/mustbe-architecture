import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { RefObject, useEffect, useRef, useState } from 'react';
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
}))

interface ProjectProps {
  order_number: number
  project_name: string
}
interface ContentProps {
  title: string
  content: string
}
interface DescriptionsProps {
  project_name: string
  year: string
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
  const [projectTitles, setProjectTitles] = useState<string[]>([])
  const [projectYears, setProjectYears] = useState<string[]>([])

  const nodeRef = useRef(null);

  useEffect(() => {
    getStaticProps().then(({ props }) => {
      setIntro({ first: props.intro[0].first, second: props.intro[0].second })
      setMainImage(urlForImage(props.main[0].hero).url())

      const projectTitles = props.projects_descriptions.sort((a: ProjectProps, b: ProjectProps) =>
        a.order_number - b.order_number).map(({ project_name }: DescriptionsProps) =>
          project_name)

      setProjectTitles(projectTitles)

      const projectYears = props.projects_descriptions.sort((a: ProjectProps, b: ProjectProps) =>
        a.order_number - b.order_number).map(({ year }: DescriptionsProps) =>
          year)

      setProjectYears(projectYears)


      const projectDescriptionTitles = props.projects_descriptions.sort((a: ProjectProps, b: ProjectProps) =>
        a.order_number - b.order_number).map(({ descriptions }: DescriptionsProps) =>
          descriptions.map(({ title }) => title)
        )

      setAllDescriptionTitles(projectDescriptionTitles)

      const projectContent = props.projects_descriptions.sort((a: ProjectProps, b: ProjectProps) =>
        a.order_number - b.order_number).map(({ descriptions }: DescriptionsProps) =>
          descriptions.map(({ content }) => content)
        )
      setThumbnailText(projectContent)

      const projectImages = props.projects_images.sort((a: ProjectProps, b: ProjectProps) =>
        a.order_number - b.order_number).map(({ images }: ImagesProps) =>
          images.map((image) => urlForImage(image).url())
        )

      setThumbnailImages(projectImages)

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
                    width={325}
                    height={50}
                    // fill
                    onClick={(e) => handleLinkClick(e, 'top')}
                    className={styles.desktop_logo}

                  />
                  <Image
                    src="/mobile_logo.svg"
                    alt="MUST BE architecture"
                    width={125}
                    height={50}
                    // fill
                    onClick={(e) => handleLinkClick(e, 'top')}
                    className={styles.mobile_logo}
                  />
                </Box>
              </Grid>
              <Grid item xs={2} sm={7} md={5} lg={4}>
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
              <Box ref={nodeRef} className={styles.menu_mob}
                sx={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column' }}
              >
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
            }
          </Grid>
        </Grid>
        <Box className={styles.parallax_wrapper}>
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
            sx={{ padding: "20px 8vw 60px", backgroundColor: 'white' }}
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
        <Box className={styles.go_up_wrapper} id="projects">

          <AnimateIn>
            <Divider />
          </AnimateIn>

          <Grid container sx={{ flexGrow: 1, padding: "20px 8vw 60px" }} >
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={'4rem'}
              sx={{ flexGrow: 1, marginBottom: '40px' }}
            >
              <>
                {thumbnailImages.map((images, index) =>
                  <Grid item xs={12} md={6} key={index} sx={{ marginTop: 3 }} className={styles.thumbnail_content}>
                    <Box sx={{ overflow: 'hidden', position: 'relative' }} className={styles.carousel_wrapper}>
                      <NextJsCarousel images={images} text={thumbnailText} descriptionTitles={allDescriptionTitles} index={index} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
                      <h2>{projectTitles[index]}</h2>
                      <h2>{projectYears[index]}</h2>
                    </Box>
                  </Grid>
                )}

              </>
            </Grid>
          </Grid>

          <AnimateIn>
            <Divider />
          </AnimateIn>

          <Grid container sx={{ flexGrow: 1, padding: "20px 8vw" }} id="about-us">
            <Grid
              container
              spacing={4}
              sx={{ marginBottom: "60px" }}
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
                        text="Interjera dizainere: Donna Victoria Design
                        // Arhitekti: Aigars Tereško, Mikus Druviņš, Toms Ambrozs
                        // BIM speciālists: Rinalds Petjukēvičš // Vizualizāciju speciālists: Reinis Jansons
                        // Inženieri: Miķelis Siliņš, Pāvels Stepanovs, Māris Arnavs, Kārlis Mūrnieks, Dāvis Vecbaštiks
                        // Konsultants: Uldis Jaunsubrēns // Uzņēmumi: Būvdizains, AZ Service, Aver Brokarage"
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
              spacing={'4rem'}
              sx={{ marginBottom: '40px' }}
            >
              <Grid item md={12 / 5} xs={12} sx={{ marginBottom: '40px' }}>
                <AnimateIn>
                  <Grid container>
                    <Box
                      sx={{ backgroundImage: 'url("/01_profile.jpg")', }}
                      className={styles.profile_image}
                    />
                    <Box sx={{ marginTop: 1 }}>
                      <h2>
                        {"Monvīds Bekmanis"}
                      </h2>
                      <span className={styles.contact_subtitle}>Arhitekts / valdes loceklis </span>
                    </Box>
                  </Grid>
                </AnimateIn>
              </Grid>
              <Grid item md={12 / 5} xs={12} sx={{ marginBottom: '40px' }}>
                <AnimateIn>
                  <Grid container>
                    <Box
                      sx={{ backgroundImage: 'url("/02_profile.jpg")', }}
                      className={styles.profile_image}
                    />
                    <Box sx={{ marginTop: 1 }}>
                      <h2>
                        {"Kristiāns Beķeris"}
                      </h2>
                      <span className={styles.contact_subtitle}>Arhitekts / valdes loceklis </span>
                    </Box>
                  </Grid>
                </AnimateIn>
              </Grid>
              <Grid item md={12 / 5} xs={12} sx={{ marginBottom: '40px' }}>
                <AnimateIn>
                  <Grid container>
                    <Box
                      sx={{ backgroundImage: 'url("/03_profile.jpg")', }}
                      className={styles.profile_image}
                    />
                    <Box sx={{ marginTop: 1 }}>
                      <h2>
                        {"Donna Viktorija Bordo"}
                      </h2>
                      <span className={styles.contact_subtitle}>Interjera dizainere</span>
                    </Box>
                  </Grid>
                </AnimateIn>
              </Grid>
              <Grid item md={12 / 5} xs={12} sx={{ marginBottom: '40px' }}>
                <AnimateIn>
                  <Grid container>
                    <Box
                      sx={{ backgroundImage: 'url("/04_profile.jpg")', }}
                      className={styles.profile_image}
                    />
                    <Box sx={{ marginTop: 1 }}>
                      <h2>
                        {"Rihards Petjukevičs"}
                      </h2>
                      <span className={styles.contact_subtitle}>3D speciālists</span>
                    </Box>
                  </Grid>
                </AnimateIn>
              </Grid>
              <Grid item md={12 / 5} xs={12} sx={{ marginBottom: '40px' }}>
                <AnimateIn>
                  <Grid container>
                    <Box
                      sx={{ backgroundImage: 'url("/05_profile.jpg")', }}
                      className={styles.profile_image}
                    />
                    <Box sx={{ marginTop: 1 }}>
                      <h2>
                        {"Toms Ambrozs"}
                      </h2>
                      <span className={styles.contact_subtitle}>Arhitekts</span>
                    </Box>
                  </Grid>
                </AnimateIn>
              </Grid>
            </Grid>
          </Grid>

          <AnimateIn>
            <Divider />
          </AnimateIn>

          <Grid container sx={{ flexGrow: 1, padding: "20px 8vw 10px" }} id="contacts">
            <Grid
              container
              sx={{ marginBottom: "40px" }}
              spacing={'4rem'}
            >
              <Grid item xs={12} md={12 / 5}>
                <AnimateIn>
                  {/* <Box sx={{ display: 'flex' }}> */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '1rem' }}>
                    <h2>
                      Kontakti:
                    </h2>
                    <Box sx={{ marginTop: 1 }}>
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
                  </Box>
                </AnimateIn>
              </Grid>
              <Grid item xs={12} md={3}>
                <AnimateIn>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '1rem' }}>
                    <h2>
                      Rekvizīti
                    </h2>
                    <Box sx={{ marginTop: 1 }}>
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
                  {/* </Box> */}
                </AnimateIn>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{ marginBottom: "260px" }}
              spacing={'4rem'}
            >
              <Grid item xs={12} md={7.2} >
                <AnimateIn>
                  <Grid container >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4628.72510816559!2d24.101442221661383!3d56.95051397128047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eecfd0eb9c6729%3A0xe79c8c86f527aa2c!2sTor%C5%86a%20iela%204-2c%2C%20Centra%20rajons%2C%20R%C4%ABga%2C%20LV-1050!5e0!3m2!1sen!2slv!4v1677524894449!5m2!1sen!2slv"
                      width="100%" height="350.89px"
                      style={{ border: 0, filter: 'grayscale(100%)' }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                  </Grid>
                </AnimateIn>
              </Grid>
              <Grid item xs={12} md={4.8}>
                <AnimateIn>
                  <Box className={styles.contact_image} sx={{ backgroundImage: 'url("/contact.jpg")' }} />
                </AnimateIn>
              </Grid>
            </Grid>
          </Grid>

          <Grid container sx={{ marginBottom: "10px" }}>
            <Grid item xs={12}>
              <AnimateIn>
                <Box sx={{ height: '20px', textAlign: 'center', rotate: '180deg' }}>
                  <button
                    onClick={(e) => handleLinkClick(e, 'top')}
                    className={styles.go_up}
                  >
                    <svg width="20" height="8" viewBox="0 0 521 216" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M260.5 216L0.259418 0.749951L520.741 0.749996L260.5 216Z" fill="black" />
                    </svg>
                  </button>
                </Box>
                <Divider />
                <Box className={styles.center_flex}>
                  <p>© MUSTBE architecture </p>
                </Box>
              </AnimateIn>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}
