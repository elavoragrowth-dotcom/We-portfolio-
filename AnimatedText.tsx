import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const characters = text.split('')

  return (
    <p ref={ref} className={className} style={{ position: 'relative', ...style }}>
      {characters.map((char, i) => {
        const start = i / characters.length
        const end = (i + 1) / characters.length
        return (
          <Character
            key={i}
            char={char}
            start={start}
            end={end}
            scrollYProgress={scrollYProgress}
          />
        )
      })}
    </p>
  )
}

function Character({
  char,
  start,
  end,
  scrollYProgress,
}: {
  char: string
  start: number
  end: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])
  const displayChar = char === ' ' ? '\u00A0' : char

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0 }}>{displayChar}</span>
      <motion.span style={{ position: 'absolute', top: 0, left: 0, opacity }}>
        {displayChar}
      </motion.span>
    </span>
  )
}
