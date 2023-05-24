import React, { useEffect, useState } from 'react'
import { cn } from 'src/lib/utils'

const RATE = 10
const DEFAULT_PALETTE = ['#4A4A4A', '#3A3A3A', 'gray']

export type FolderolType = 'wave'

export interface FolderolProps
  extends React.HTMLAttributes<HTMLDivElement> {
  type?: FolderolType
  palette?: string[]
  seed?: number | number[]
}

const Folderol: React.FC<FolderolProps> = ({
  className,
  children,
  palette = DEFAULT_PALETTE,
  type = 'wave',
  seed = 0,
}) => {
  const [t, setT] = useState<number>(0)

  useEffect(() => {
    setTimeout(() => {
      setT((t) => {
        if (t === Number.MAX_SAFE_INTEGER) {
          return 0
        }
        return t + 0.25
      })
    }, RATE)
  }, [t])

  const f = (x: number): number => {
    return Math.cos((x * Math.PI) / 180) * 50
  }

  return (
    <div
      className={cn(
        className,
        ` h-full w-full overflow-hidden opacity-[0.15]`,
      )}
    >
      {palette?.map((color, index) => {
        const dt = index * 180 + 1 * index * t

        const origin = -40 - index * 10 - f(t)
        const mid = 50 + 30 * index
        const end = 150 + index * 10 + f(t)

        return (
          <div
            className={
              'absolute bottom-0 left-0 h-full w-full'
            }
            key={color}
          >
            <svg
              className="h-full w-full"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                className="drop-shadow-md"
                fill={color}
                d={`
                M ${origin}, ${end}
                Q ${mid / 2}, ${f(t + dt)} ${mid}, ${mid}
                T ${end}, ${mid}
                L ${end}, ${end}
                L ${origin}, ${end}
              `}
              ></path>
            </svg>
          </div>
        )
      })}
    </div>
  )
}

export default Folderol
