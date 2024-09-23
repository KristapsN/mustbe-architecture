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
import { styled, Divider, Button, ButtonProps, Menu, MenuItem, MenuProps, Collapse, IconButton } from '@mui/material';
import { Parallax } from 'react-scroll-parallax';
import { Player } from '@lottiefiles/react-lottie-player';
import { getStaticProps } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import ContactMap from './components/map';
import { Turn as Hamburger } from 'hamburger-react'
import CloseIcon from '@mui/icons-material/Close';
import { AnimatePresence, motion } from "framer-motion";
import { scrollIntoView } from "seamless-scroll-polyfill";

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
    console.log('work?', element)
    // element && element.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    // });
    element && scrollIntoView(element, { behavior: "smooth", block: "start" });

    setOpenMenu(false)
  }

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openProject, setOpenProject] = useState(false)
  const openedImagesIndex = useRef(0)
  const [windowSize, setWindowSize] = useState(0)

  const nodeRef = useRef(null);

  useEffect(() => {
    setAnchorEl(document.getElementById('menu'))
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

    window.addEventListener('keydown', (event) => event.key === 'Escape' && setOpenProject(false))

    setWindowSize(window.innerWidth)

  }, [])

  const handleChange = () => {
    language === 'LV'
      ? setLanguage('EN')
      : setLanguage('LV')
  };

  const loaderHandler = () => {
    setShowLoader(false)
  }
  setTimeout(loaderHandler, 500)

  useEffect(() => {
    openProject ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'scroll')

  }, [openProject])

  const containerVariant = {
    initial: { top: "100%", transition: { type: "spring", delay: 1 } },
    isOpen: { top: windowSize > 599 ? "78px" : "50px" },
    exit: { top: "100%" }
  };

  const ModalContainer = styled(motion.div)`
    width: 100vw;
    height: 100%;
    justify-content: center;
    background-color: white;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    scrollbar-width: none;
    padding-bottom: 2rem;

    overflow: scroll;
    z-index: 100;
  `

  return (
    <>
      <Head>
        <title>MBA arhitekti</title>
        <meta name="MBA arhitekti" content="architecture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={'scroll-container'}>
        {/* className={`${showLoader && styles.preloader}`} */}
        <Box sx={{ maxWidth: '100vw' }} className={`${!showLoader && styles.preloader_fade}`}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ flexGrow: 1 }}
            className={`${styles.preloader}`}
          >
        {/* <Player
              onEvent={event => {
                if (event === 'play') {
                  setTimeout(loaderHandler, 3800)
                }
              }}
              id='introLoader'
              autoplay
              keepLastFrame
              src="/logo_loader/logo_loader.json"
              style={{ height: '300px' }}
              speed={8}
            /> */}
        {/* </Player> */}
        </Grid>
        </Box>
        <>
          <Grid container sx={{ position: 'fixed', zIndex: 100 }}>
            <Grid item xs={12}>
              <Grid container spacing={0} justifyContent="space-between" direction="row" alignItems={{ md: "flex-end", sm: "center", xs: "center" }} sx={{ backgroundColor: 'white' }} className={styles.fade_in}>
                <Grid item xs={8} sm={4} md={4}>
                  <Box className={styles.logo_wrapper} sx={{ display: 'flex', marginLeft: { md: '15vw', sm: '15vw', xs: '6vw' } }}>
                    <Image
                      src="/logo.svg"
                      alt="MUST BE architecture"
                      width={70}
                      height={40}
                      onClick={(e) => handleLinkClick(e, 'top')}
                      className={styles.desktop_logo}
                    />
                    <Image
                      src="/logo.svg"
                      alt="MUST BE architecture"
                      width={55}
                      height={30}
                      onClick={(e) => handleLinkClick(e, 'top')}
                      className={styles.mobile_logo}
                    />
                    {/* <Box sx={{ display: 'flex', alignItems: 'flex-end', marginLeft: '10px' }}>
                      <span className={styles.logo_title}>ARHITEKTI</span>
                    </Box> */}
                  </Box>
                </Grid>
                <Grid item xs={3} sm={7} md={6} lg={5}>
                  <Box className={styles.mobile_menu_burger} id='menu'>
                    {!openProject &&
                      <Hamburger
                        toggled={openMenu}
                        toggle={setOpenMenu}
                        hideOutline={true}
                      />
                    }
                  </Box>
                  {!openProject &&
                    <Box className={`${styles.menu_wrapper} ${!showLoader && styles.preloader_fade_menu_wrapper}`}>
                      <Box className={styles.nav_link_wrapper}>
                        {/* <Box sx={{ height: '4px', marginBottom: '8px' }}>
                          <svg className={styles.nav_arrow} width="10" height="4" viewBox="0 0 521 216" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M260.5 216L0.259418 0.749951L520.741 0.749996L260.5 216Z" fill="black" />
                          </svg>
                        </Box> */}

                        <Link
                          className={`${styles.nav_link} scroll`}
                          href="#projects"
                          onClick={(e) => handleLinkClick(e, 'projects')}
                        >
                          Projekti
                        </Link>
                      </Box>
                      <Box className={styles.nav_link_wrapper}>
                        {/* <Box sx={{ height: '4px', marginBottom: '8px' }}>
                          <svg className={styles.nav_arrow} width="10" height="4" viewBox="0 0 521 216" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M260.5 216L0.259418 0.749951L520.741 0.749996L260.5 216Z" fill="black" />
                          </svg>
                        </Box> */}
                        <Link
                          className={`${styles.nav_link}`}
                          href="#about-us"
                          onClick={(e) => handleLinkClick(e, 'about-us')}
                        >
                          Par mums
                        </Link>
                      </Box>
                      <Box className={styles.nav_link_wrapper}>
                        {/* <Box sx={{ height: '4px', marginBottom: '8px' }}>
                          <svg className={styles.nav_arrow} width="10" height="4" viewBox="0 0 521 216" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M260.5 216L0.259418 0.749951L520.741 0.749996L260.5 216Z" fill="black" />
                          </svg>
                        </Box> */}
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
                        <LanguageButton
                          disableRipple
                          sx={{ width: 20, height: 12, fontWeight: 300, fontSize: '16px' }}
                          onClick={() => handleChange()}
                        >
                          {language}
                        </LanguageButton>
                      </Box>
                    </Box>
                  }
                </Grid>
                <Collapse in={openMenu} sx={{ backgroundColor: 'white', width: '100%' }}>
                  <MenuItem sx={{ justifyContent: 'flex-end', marginRight: '6vw', paddingRight: '10px' }} autoFocus={false} onClick={(e) => handleLinkClick(e, 'projects')}><span className={styles.mobile_menu_pink}>Projekti</span></MenuItem>
                  <MenuItem sx={{ justifyContent: 'flex-end', marginRight: '6vw', paddingRight: '10px' }} onClick={(e) => handleLinkClick(e, 'about-us')}><span className={styles.mobile_menu_pink}>Par mums</span></MenuItem>
                  <MenuItem sx={{ justifyContent: 'flex-end', marginRight: '6vw', paddingRight: '10px' }} onClick={(e) => handleLinkClick(e, 'contacts')}><span className={styles.mobile_menu_pink}>Kontakti</span></MenuItem>
                </Collapse>
              </Grid>
            </Grid>
          </Grid>
          <Box id='top'/>
          <Box className={`${styles.parallax_wrapper} ${styles.fade_in_image}`} sx={{ display: { xs: 'none', md: 'inherit' } }}>
            <Parallax speed={-50}>
              <Grid container sx={{ flexGrow: 1, backgroundImage: `url(${mainImage})` }} className={styles.parallax}>
              </Grid>
            </Parallax>
          </Box>
          <Box className={styles.parallax_wrapper} sx={{ display: { xs: 'inherit', md: 'none' } }}>
            {/* <Parallax speed={-50}> */}
              <Image
              src="/mobile_main.jpg"
              alt="MUST BE architecture"
              width={375.8}
              height={694}
            />
              {/* <Box sx={{ flexGrow: 1, backgroundImage: `url(/mobile_main.jpg)` }} className={styles.parallax_mobile}/> */}
              {/* </Box> */}
            {/* </Parallax> */}
          </Box>
          <Box sx={{ overflow: 'hidden' }} className={styles.space_wrapper_wrapper}>
            <Grid
              container
              justifyContent="space-around"
              alignItems="flex-start"
              spacing={{ md: '6rem', sx: '2rem' }}
              className={styles.space_wrapper}
              sx={{ backgroundColor: 'white' }}
            >
              <Grid item xs={12} md={6} sx={{ marginBottom: '40px' }}>
                <Grid container>
                  <Paragraph
                    text={intro.first}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} sx={{ marginBottom: '40px' }}>
                <Grid container>
                  <Box>
                  <Paragraph
                    text={intro.second}
                  />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box className={styles.go_up_wrapper} id="projects">
            <Box className={styles.project_section_title_wrapper}>
              <h2>Projekti</h2>
            </Box>

            <AnimateIn>
              <Divider />
            </AnimateIn>

            <Grid container sx={{ flexGrow: 1 }} className={styles.space_wrapper_projects} >
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={{ md: '6rem', sx: '2rem' }}
                sx={{ flexGrow: 1, marginBottom: '40px' }}
              >
                <>
                  {thumbnailImages.map((images, index) =>
                    <Grid item xs={12} md={6} key={index} className={styles.thumbnail_content}>
                      <AnimateIn>
                        <Box sx={{ overflow: 'hidden' }}>
                          <button
                            // sx={{ overflow: 'hidden', position: 'relative' }}
                            className={styles.carousel_wrapper}
                            onClick={() => {
                              setOpenProject(true)
                              openedImagesIndex.current = index
                            }}
                          >
                            {/* <NextJsCarousel images={images} text={thumbnailText} descriptionTitles={allDescriptionTitles} index={index} /> */}
                            <Box className={styles.project_image} sx={{ backgroundImage: `url(${images[0]})` }} />
                          </button>
                        </Box>
                        <Box sx={{ height: '70px' }}>
                          <Box sx={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', marginBottom: '4px'
                          }}>
                            <h2>{projectTitles[index]}</h2>
                            <h2>{projectYears[index]}</h2>
                          </Box>
                          <Box sx={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          }}>
                            <span className={styles.contact_subtitle}>Mazā Nometņu iela 80, Rīga</span>
                            <span className={styles.contact_subtitle}>Koncepcija</span>
                            {/* {console.log(allDescriptionTitles, allDescriptionTitles[index])} */}
                          </Box>
                        </Box>
                      </AnimateIn>
                    </Grid>
                  )}
                  <AnimatePresence>
                    {openProject &&
                      <ModalContainer
                        initial={"initial"}
                        animate={"isOpen"}
                        exit={"exit"}
                        variants={containerVariant}
                      >
                        <Box className={styles.project_close} sx={{ textAlign: 'right' }}>
                          <Hamburger
                            toggled={true}
                            toggle={() => setOpenProject(false)}
                            hideOutline={true}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Grid container justifyContent='center' width={{ md: '70vw', sm: '90vw' }}>
                             { openedImagesIndex.current % 2 !== 0 || windowSize < 900 ?
                                <>
                                  <Grid item md={4} xs={12}>
                                    {thumbnailText[openedImagesIndex.current].map((item, index) =>
                                      <Box marginBottom={2} marginLeft={{ md: 0, xs: '6vw' }} key={index} >
                                        <>
                                          <Box sx={{ marginTop: '10px' }}>
                                            <h2 className={styles.title_space}>
                                              {allDescriptionTitles[openedImagesIndex.current][index] === undefined ? '' : allDescriptionTitles[openedImagesIndex.current][index]}
                                            </h2>
                                            <p className={styles.contact_subtitle}>
                                              {item === undefined ? '' : item}
                                            </p>
                                          </Box>
                                        </>
                                      </Box>
                                    )}
                                  </Grid>
                                  <Grid item md={8} xs={12} justifyContent='flex-start'>
                                    {thumbnailImages[openedImagesIndex.current].map((item, index) => {
                                      return (
                                        <Box className={styles.project_modal_image_wrapper} key={index}>
                                          <Box
                                            className={styles.project_modal_image}
                                            sx={{
                                              backgroundImage: `url(${item})`
                                            }} />
                                        </Box>
                                      )
                                    }
                                    )}
                                  </Grid>
                                </>
                                : <>
                                  <Grid item md={8} xs={12}>
                                    <Box className={styles.project_modal_image_wrapper}>
                                      <Box
                                        className={styles.project_modal_image}
                                        sx={{
                                          backgroundImage: `url(${thumbnailImages[openedImagesIndex.current][0]})`
                                        }} />

                                    </Box>
                                  </Grid>
                                  <Grid item md={4} xs={12}>
                                    {thumbnailText[openedImagesIndex.current].map((item, index) =>
                                      <Box marginBottom={2} marginLeft={{ md: '2rem', xs: 0 }} key={index} >
                                        <>
                                          <Box sx={{ marginTop: '10px' }}>
                                            <h2 className={styles.title_space}>
                                              {allDescriptionTitles[openedImagesIndex.current][index] === undefined ? '' : allDescriptionTitles[openedImagesIndex.current][index]}
                                            </h2>
                                            <p className={styles.contact_subtitle}>
                                              {item === undefined ? '' : item}
                                            </p>
                                          </Box>
                                        </>
                                      </Box>
                                    )}
                                  </Grid>
                                  <Grid item md={8} xs={12} justifyContent='flex-start'>
                                    {thumbnailImages[openedImagesIndex.current].map((item, index) => {
                                      if (index !== 0) {
                                        return (
                                          <Box className={styles.project_modal_image_wrapper} key={index}>
                                            <Box
                                              className={styles.project_modal_image}
                                              sx={{
                                                backgroundImage: `url(${item})`
                                              }} />
                                          </Box>
                                        )
                                      }
                                    }
                                    )}
                                  </Grid></>
                            }
                            <Grid item md={4} />
                          </Grid>
                        </Box>
                      </ModalContainer>
                    }
                  </AnimatePresence>
                </>
              </Grid>
            </Grid>

            <AnimateIn>
              <Divider />
            </AnimateIn>

            <Grid container sx={{ flexGrow: 1, marginBottom: '10px' }} className={styles.space_wrapper} id="about-us">
              <Grid
                container
                spacing={{ md: '6rem', sx: '2rem' }}
              >

                <Grid item xs={12} md={6} sx={{ marginBottom: '50px' }}>
                  <AnimateIn>
                    <Grid container>
                      <h2 className={styles.title_space}>Par mums</h2>
                      <Paragraph
                        text="A+B arhitekti ir Rīgā bāzēts uzņēmums, kura darbība ir aizsākusies 2019. gadā un kopš tā 
                        laika strādājam ar dažādu funkciju un mēroga projektiem. Mūsu filozofija ir bāzēta uz dažādu 
                        elementu, ideju un profesionāļu apvienošanu, palīdzot transformēt klienta vēlmes no idejas līdz objekta realizēšanai. Kopā ar 
                        ilggadējiem sadarbības partneriem nodrošinām visu sadaļu būvprojektu izstrādi, teritoriju labiekārtojuma izveidi un interjera dizaina risinājumus. Mūsu profesionālā pieeja ir vērsta uz funkcionālo un estētisko vienkāršību, domājot par ilgtspējīgu un videi piemērotu arhitektūru."
                      />
                    </Grid>
                  </AnimateIn>
                </Grid>
                <Grid item xs={12} md={6} sx={{ marginBottom: '50px' }}>
                  <AnimateIn>
                    <Grid container>
                      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '1rem' }}>
                        <h2 className={styles.title_space}>
                          Sadarbības partneri:
                        </h2>
                        <Paragraph
                          text="Arhitekti: Aigars Tereško, Mikus Druviņš / Interjere dizainere: Donna Victoria Design 
                          / Inženieri: Miķelis Siliņš, Pāvels Stepanovs, Māris Arnavs, Kārlis Mūrnieks, Dāvis Vecbaštiks, Indra Junde, 
                          Mārtiņš Pocis, Kristaps Jakimovs, Jānis Cimbulis, Nauris Gailišs, Raitis Beitāns, Jānis Bērziņš, Vilnis Puļķis, Jekaterina Apse, 
                          / Konsultants: Uldis Jaunsubrēns / Vizualizācijas: Reinis Jansons, Māŗtiņš Ziemanis 
                          / Uzņēmumi: Būvdizains, AZ Service, Aver Brokarage"
                        />
                      </Box>
                    </Grid>
                  </AnimateIn>
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                spacing={{ md: '6rem', sx: '2rem' }}
              // sx={{ marginBottom: '6rem' }}
              >
                <Grid item md={12 / 5} xs={12} sx={{ maxWidth: '270px', padding: { xs: 0, md: 0 } }}>
                  <AnimateIn>
                    <Grid container>
                      <Box
                        sx={{ backgroundImage: 'url("/01_profile.jpg")', }}
                        className={styles.profile_image}
                      />
                      <Box sx={{ marginTop: 1, height: '70px' }}>
                        <h2 className={styles.contact_title}>
                          {"Monvīds Bekmanis"}
                        </h2>
                        <span className={styles.contact_subtitle}>Arhitekts / valdes loceklis </span>
                      </Box>
                    </Grid>
                  </AnimateIn>
                </Grid>
                <Grid item md={12 / 5} xs={12} sx={{ maxWidth: '270px', padding: { xs: 0, md: 0 } }}>
                  <AnimateIn>
                    <Grid container>
                      <Box
                        sx={{ backgroundImage: 'url("/02_profile.jpg")' }}
                        className={styles.profile_image}
                      />
                      <Box sx={{ marginTop: 1, height: '70px' }}>
                        <h2 className={styles.contact_title}>
                          {"Kristiāns Beķeris"}
                        </h2>
                        <span className={styles.contact_subtitle}>Arhitekts / valdes loceklis </span>
                      </Box>
                    </Grid>
                  </AnimateIn>
                </Grid>
                <Grid item md={12 / 5} xs={12} sx={{ maxWidth: '270px', padding: { xs: 0, md: 0 } }}>
                  <AnimateIn>
                    <Grid container>
                      <Box
                        sx={{ backgroundImage: 'url("/03_profile.jpg")', }}
                        className={styles.profile_image}
                      />
                      <Box sx={{ marginTop: 1, height: '70px' }}>
                        <h2 className={styles.contact_title}>
                          {"Donna Viktorija Bordo"}
                        </h2>
                        <span className={styles.contact_subtitle}>Interjera dizainere</span>
                      </Box>
                    </Grid>
                  </AnimateIn>
                </Grid>
                <Grid item md={12 / 5} xs={12} sx={{ maxWidth: '270px', padding: { xs: 0, md: 0 } }}>
                  <AnimateIn>
                    <Grid container>
                      <Box
                        sx={{ backgroundImage: 'url("/04_profile.jpg")', }}
                        className={styles.profile_image}
                      />
                      <Box sx={{ marginTop: 1, height: '70px' }}>
                        <h2 className={styles.contact_title}>
                          {"Rinalds Petjukevičs"}
                        </h2>
                        <span className={styles.contact_subtitle}>3D speciālists</span>
                      </Box>
                    </Grid>
                  </AnimateIn>
                </Grid>
                <Grid item md={12 / 5} xs={12} sx={{ maxWidth: '270px', padding: { xs: 0, md: 0 } }}>
                  <AnimateIn>
                    <Grid container>
                      <Box
                        sx={{ backgroundImage: 'url("/05_profile.jpg")' }}
                        className={styles.profile_image}
                      />
                      <Box sx={{ marginTop: 1, height: '70px' }}>
                        <h2 className={styles.contact_title}>
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

            <Grid container sx={{ flexGrow: 1, padding: '20px 15vw 50px' }} id="contacts">
              <Grid
                container
                // sx={{ marginTop: "40px" }}
                spacing={{ md: '6rem', sx: '2rem' }}
              >
                <Grid item xs={12} md={12 / 5}>
                  <AnimateIn>
                    {/* <Box sx={{ display: 'flex' }}> */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '1rem' }}>
                      <h2 className={styles.title_space}>
                        Kontakti:
                      </h2>
                      <Box>
                        <Paragraph
                          text="Torņa iela 4-2c, Vecrīga"
                        />
                        <Paragraph
                          text="info@aplusb.lv"
                        />
                        <Paragraph
                          text="+371 29121613"
                        />
                      </Box>
                    </Box>
                  </AnimateIn>
                </Grid>
                <Grid item xs={12} md={3}>
                  <AnimateIn>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '1rem' }}>
                      <h2 className={styles.title_space}>
                        Rekvizīti
                      </h2>
                      <Box>
                        <Paragraph
                          text="MUST BE architecture SIA"
                        />
                        <Paragraph
                          text="LV40103354466"
                        />
                        <Paragraph text="Rubeņu iela 19, Jūrmala, LV-2008" />
                      </Box>
                    </Box>
                  </AnimateIn>
                </Grid>
              </Grid>
            </Grid>

            <Grid container sx={{ flexGrow: 1 }} className={styles.space_map_wrapper}>
              <Grid
                container
                sx={{ marginBottom: "70vh" }}
                // spacing={{ md: '6rem', sx: '2rem' }}
              >
                <Grid item xs={12} md={7.2} sx={{ minHeight: '230px', marginBottom: '60px', paddingRight: { md: '6rem' } }}>
                  <AnimateIn>
                    <ContactMap />
                  </AnimateIn>
                </Grid>
                <Grid item xs={12} md={4.8} sx={{ marginBottom: '60px' }}>
                  <AnimateIn>
                    <Box className={styles.contact_image} sx={{ backgroundImage: 'url("/contact.jpg")' }} />
                  </AnimateIn>
                </Grid>
              </Grid>
            </Grid>

            <Grid container sx={{ marginBottom: "10px" }}>
              <Grid item xs={12}>
                {/* <Box sx={{ height: '20px', textAlign: 'center', rotate: '180deg' }}>
                  <button
                    onClick={(e) => handleLinkClick(e, 'top')}
                    className={styles.go_up}
                  > */}
                    {/* <svg width="20" height="8" viewBox="0 0 521 216" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M260.5 216L0.259418 0.749951L520.741 0.749996L260.5 216Z" fill="black" />
                    </svg> */}
                  {/* </button>
                </Box> */}
                {/* <Divider /> */}
                <Box className={styles.footer_flex}>
                  <button
                    onClick={(e) => handleLinkClick(e, 'top')}
                    className={styles.go_up}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M469-212v-494L228-465l-16-15 268-268 268 268-16 15-241-241v494h-22Z"/></svg>
                  </button>
                  <p>© A+B arhitekti</p>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      </div >
    </>
  )
}
