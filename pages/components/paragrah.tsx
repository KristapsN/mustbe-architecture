import { Catamaran } from "@next/font/google";
import { FC } from "react";
import styles from '@/styles/Home.module.css'

export const catamaranNormal = Catamaran({ subsets: ['latin-ext'], weight: '300' })

type ParagraphProps = {
  text: string
  bold?: boolean
  boldSlash?: boolean
}

const Paragraph: FC<ParagraphProps> = ({ text, bold = false, boldSlash = false }) => {
  if (bold) return (
    <p style={{ textAlign: 'justify' }}>
      <span style={{ fontWeight: 'bold', color: 'black' }}>A+B arhitekti</span>
      <span style={{ fontWeight: 300 }}>{text}</span>
    </p>
  )

  if (boldSlash && text.includes('/')) {
    const parts = text.split('/');

    return (
      <p style={{ fontWeight: 300, textAlign: 'justify' }}>
        {parts.map((part, idx) => (
          <span key={idx}>
            {part}
            {idx < parts.length - 1 && <span style={{ fontWeight: 'bold', color: 'black' }}> / </span>}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p style={{ fontWeight: 300, textAlign: 'justify' }}>{text}</p>
  )
}

export default Paragraph;
