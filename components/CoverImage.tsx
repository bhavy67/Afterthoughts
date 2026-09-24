'use client'

import Image from 'next/image'
import { useState } from 'react'

interface CoverImageProps {
  src?: string
  alt: string
  sizes?: string
  fallback: React.ReactNode
}

export default function CoverImage({ src, alt, sizes, fallback }: CoverImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) return <>{fallback}</>

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? '200px'}
      style={{ objectFit: 'cover' }}
      onError={() => setFailed(true)}
    />
  )
}
