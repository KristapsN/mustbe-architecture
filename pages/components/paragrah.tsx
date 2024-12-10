import { Catamaran } from "@next/font/google";
import { FC } from "react";
import styles from '@/styles/Home.module.css'

export const catamaranNormal = Catamaran({ subsets: ['latin-ext'], weight: '300' })

type ParagraphProps = {
  text: string
  bold?: boolean
}

const Paragraph: FC<ParagraphProps> = ({text, bold = false}) => {
  if (bold) return (
    <>
  <span style={{fontWeight: 500, color: 'black'}}>A+B arhitekti</span>
  <span style={{fontWeight: 300 }}>{text}</span>
  </>
)

  return (
      <p style={{fontWeight: 300}}>{text}</p>
  )
}

export default Paragraph;
