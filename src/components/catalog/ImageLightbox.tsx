'use client'

import { useCallback, useEffect, useState } from 'react'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'

type Props = {
  images: string[]
  startIndex: number
  title: string
  onClose: () => void
}

export function ImageLightbox({ images, startIndex, title, onClose }: Props) {
  const [index, setIndex] = useState(startIndex)
  const [zoomed, setZoomed] = useState(false)

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length)
    setZoomed(false)
  }, [images.length])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length)
    setZoomed(false)
  }, [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, next, prev])

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2 cursor-pointer z-10"
        aria-label="Закрыть"
      >
        <X size={28} weight="bold" />
      </button>

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 cursor-pointer z-10"
          aria-label="Предыдущее фото"
        >
          <CaretLeft size={24} weight="bold" />
        </button>
      )}

      <div
        className="max-w-[92vw] max-h-[85vh] flex items-center justify-center overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[index]}
          alt={title}
          onClick={() => setZoomed((z) => !z)}
          className={`transition-transform duration-300 rounded-xl select-none ${
            zoomed
              ? 'scale-150 cursor-zoom-out max-w-none'
              : 'cursor-zoom-in max-h-[85vh] max-w-[92vw] object-contain'
          }`}
          draggable={false}
        />
      </div>

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 cursor-pointer z-10"
          aria-label="Следующее фото"
        >
          <CaretRight size={24} weight="bold" />
        </button>
      )}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/50 rounded-full px-4 py-1.5 pointer-events-none">
        {title}{images.length > 1 ? ` — ${index + 1}/${images.length}` : ''}
      </div>
    </div>
  )
}
