import { Catamaran } from "@next/font/google";
import { FC } from "react";
import styles from '@/styles/Home.module.css'

export const catamaranNormal = Catamaran({ subsets: ['latin-ext'], weight: '300' })

type ParagraphProps = {
  text: string
  bold?: boolean
}

const Paragraph: FC<ParagraphProps> = ({ text, bold = false }) => {

  if (bold) return (
    <p style={{ textAlign: 'justify' }}>
      <span style={{ fontWeight: 'bold', color: 'black' }}>A+B arhitekti</span>
      <span style={{ fontWeight: 300 }}>{text}</span>
    </p>
  )

  return (
    <p style={{ fontWeight: 300, textAlign: 'justify' }}>{text}</p>
  )
}

export default Paragraph;
