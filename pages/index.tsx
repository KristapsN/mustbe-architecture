import Head from 'next/head'
import Image from 'next/image'
import { Catamaran } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Paragraph from './components/paragrah';
import { display } from '@mui/system';
import NextJsCarousel from './components/carusel';

const catamaran = Catamaran({ subsets: ['latin'], weight: '500' })
export const catamaranLight = Catamaran({ subsets: ['latin'], weight: '300' })

const thumbnailImages = [
  { number: 0, image: "/thumbnail_1.jpg" },
  { number: 1, image: "/thumbnail_1.jpg" },
  { number: 2, image: "/thumbnail_1.jpg" },
  { number: 3, image: "/thumbnail_1.jpg" },
  { number: 4, image: "/thumbnail_1.jpg" },
  { number: 5, image: "/thumbnail_1.jpg" },
  { number: 6, image: "/thumbnail_1.jpg" },
  { number: 7, image: "/thumbnail_1.jpg" },
  { number: 8, image: "/thumbnail_1.jpg" },]


export default function Home() {
  const [activeThumbnail, setActiveThumbnail] = useState<number>()
  const [activeImage, setActiveImage] = useState<string>()
  // const [anchorTarget, setAnchorTarget] = useState(null);

  // useEffect(() => {
  //   setAnchorTarget(document.getElementById(itemName));
  // }, [itemName]);


  const handleThumbnailClick = (index: number, image: string) => {
    setActiveThumbnail(index)
    setActiveImage(image)
  }

  // const handleLinkClick = (event: { preventDefault: () => void; }) => {
  //   event.preventDefault();
  //   // @ts-ignore
  //   anchorTarget && anchorTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // };

  return (
    <>
      <Head>
        <title>MUST BE architecture</title>
        <meta name="MUST BE architecture" content="architecture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ overflow: 'hidden' }}>
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
                <div className={styles.menu_wrapper}>
                  {/* <span className={`${catamaranLight.className} ${styles.contact}`}>Contact</span> */}
                  <Link
                    className={`${styles.nav_link}`}
                    href="#projects"
                  // onClick={handleLinkClick}
                  >
                    Projekti
                  </Link>
                  <Link
                    className={`${styles.nav_link}`}
                    href="#about-us"
                  // onClick={handleLinkClick}
                  >
                    Par mums
                  </Link>
                  <Link
                    className={`${styles.nav_link}`}
                    href="#contacts"
                  // onClick={handleLinkClick}
                  >
                    Kontakti
                  </Link>
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
            </Grid>
          </Grid>

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
      <Grid container sx={{ flexGrow: 1, padding: "20px 100px" }} >
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          spacing={1}
        // sx={{ margin: "20px" }}
        >

          <Grid item xs={4}>
            <Grid container>
              <Paragraph
                text="Telpa tiek uztverta ne tikai fiziski, bet arī emocionāli. Telpa, vide kurā dzīvojam, arhitektūra ietekmē
                cilvēka labsajūtu, tādēļ tās veidosanai ir liela nozīme ar ilgstosu iedarbību uz sabiedrību. (ūdens
                turpināsies / koriģēsies). Plānotais garums – 4-5 teikumi"
              />
            </Grid>
          </Grid>
          <Grid item xs={4} >
            <Grid container>

            </Grid>
          </Grid>
          <Grid item xs={4} >
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
        <Grid item xs={12}><h1 className={catamaranLight.className} id="projects">PROJEKT</h1></Grid>
        <Grid
          container
          // justifyContent="space-around"
          // alignItems="center"
          spacing={1}
          sx={{ flexGrow: 1 }}
        >
          <>

            {activeThumbnail !== undefined && activeThumbnail < 3 &&
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <NextJsCarousel />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box>
                      <Paragraph
                        text={`Some thext about project ${activeThumbnail}. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum`
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            }
            {thumbnailImages.filter(({ number }) => number < 3).map(({ number, image }) =>
              <Grid item xs={12} md={4} key={number}>
                <Box sx={{ overflow: 'hidden' }}>
                  <Box
                    className={styles.project_thumbnail}
                    sx={{ backgroundImage: `url(${image})` }}
                    onClick={() => handleThumbnailClick(number, image)}
                  >
                    <span className={`${styles.thumbnail_title} ${catamaran.className}`}>{"Name of project"}</span>
                    <span className={`${styles.thumbnail_subtitle} ${catamaranLight.className}`}>{"2021"}</span>
                  </Box>
                </Box>
              </Grid>
            )}
            {activeThumbnail !== undefined && activeThumbnail >= 3 && activeThumbnail < 6 &&
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <NextJsCarousel />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box>
                      <Paragraph
                        text={`Some thext about project ${activeThumbnail}. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum`
                        }
                      />                  </Box>
                  </Grid>
                </Grid>
              </Grid>
            }
            {thumbnailImages.filter(({ number }) => number >= 3 && number < 6).map(({ number, image }) =>
              <Grid item xs={12} md={4} key={number}>
                <Box sx={{ overflow: 'hidden' }}>
                  <Box
                    className={styles.project_thumbnail}
                    sx={{ backgroundImage: `url(${image})` }}
                    onClick={() => handleThumbnailClick(number, image)}
                  >
                    <span className={`${styles.thumbnail_title} ${catamaran.className}`}>{"Name of project"}</span>
                    <span className={`${styles.thumbnail_subtitle} ${catamaranLight.className}`}>{"2021"}</span>
                  </Box>
                </Box>
              </Grid>
            )}
            {activeThumbnail !== undefined && activeThumbnail >= 6 &&
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <NextJsCarousel />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box>
                      <Paragraph
                        text={`Some thext about project ${activeThumbnail}. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum`
                        }
                      />                  </Box>
                  </Grid>
                </Grid>
              </Grid>
            }
            {thumbnailImages.filter(({ number }) => number >= 6).map(({ number, image }) =>
              <Grid item xs={12} md={4} key={number}>
                <Box sx={{ overflow: 'hidden' }}>
                  <Box
                    className={styles.project_thumbnail}
                    sx={{ backgroundImage: `url(${image})` }}
                    onClick={() => handleThumbnailClick(number, image)}
                  >
                    <span className={`${styles.thumbnail_title} ${catamaran.className}`}>{"Name of project"}</span>
                    <span className={`${styles.thumbnail_subtitle} ${catamaranLight.className}`}>{"2021"}</span>
                  </Box>
                </Box>
              </Grid>
            )}

            <Grid item xs={12}><h1 className={catamaranLight.className} id="about-us">PAR MUMS</h1></Grid>
          </>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        // spacing={1}
        // sx={{ margin: "20px" }}
        >

          <Grid item xs={5}>
            <Grid container>
              <Paragraph
                text="Arhitekta profesionālā pieredze uzkrāta Latvijā vadošos arhitektu birojos. MUST BE architecture darbība
                aizsākusies 2019. gadā un kopš tā laika ir izstrādāti dažāda mēroga objekti un izveidoti veiksmīgi
                sadarbības partneri."
              />
            </Grid>
          </Grid>
          <Grid item xs={5} >
            <Grid container>
              <Paragraph
                text="Sadarbības partneri:
                Donna Victoria Design - interjera dizains un teritorijas labiekārtojums
                Rinalds Petjukevičs - 3D modelēšanas un BIM speciālists
                Uldis Jaunsubrēns - tehnisko risinājumu konsultants
                Reinis Jansons - 3D vizualizācijas
                Aigars Tereško - arhitekts
                Mikus Druviņš - arhitekts
                Jānis Atelbauers - arhitekts
                Būvdizains SIA - arhitektu birojs
                Aver brokerage - nekustamo īpašumu aģentūra"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}><h1 className={catamaranLight.className} id="contacts">KONTAKTI</h1></Grid>

        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
        // sx={{ margin: "20px" }}
        >

          <Grid item xs={6}>
            <Grid container>
              <Box
                className={styles.address_image}
                sx={{ backgroundImage: 'url("/address_image.jpg")' }}
              />
            </Grid>
          </Grid>
          <Grid item xs={6} >
            <Grid container >
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '1rem' }}>
                <Paragraph
                  text="Saziņa:
                "
                />
                <Paragraph
                  text="
                A: Torņa iela 4-2c, Vecrīga
                "
                />
                <Paragraph
                  text="
                M: info@mustbe-architecture.lv
                "
                />
                <Paragraph
                  text="
                T: +371 29121613
                "
                />
                <Paragraph
                  text="
                (starpā ikonas - fb, insta, linkdin)
                "
                />
              </Box>
              <br />
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '1rem' }}>
                <Paragraph
                  text="Rekvizīti:"
                />
                <Paragraph
                  text="
                N: MUST BE architecture SIA"
                />
                <Paragraph
                  text="
                R: 40103354466"
                />
                <Paragraph
                  text="
                PVN: LV40103354466"
                />
                <Paragraph text="A: Rubeņu iela 19, Jūrmala, LV-2008"/>
              </Box>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4628.72510816559!2d24.101442221661383!3d56.95051397128047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eecfd0eb9c6729%3A0xe79c8c86f527aa2c!2sTor%C5%86a%20iela%204-2c%2C%20Centra%20rajons%2C%20R%C4%ABga%2C%20LV-1050!5e0!3m2!1sen!2slv!4v1677524894449!5m2!1sen!2slv"
                width="100%" height="300px"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
