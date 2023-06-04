import { Catamaran } from "@next/font/google";
import { FC } from "react";

export const catamaranNormal = Catamaran({ subsets: ['latin-ext'], weight: '300' })


type ParagraphProps = {
  text: string
}

const Paragraph: FC<ParagraphProps> = ({text}) => {
  return (
    <p style={{fontWeight: 300}}>{text}</p>
  )
}

export default Paragraph;
