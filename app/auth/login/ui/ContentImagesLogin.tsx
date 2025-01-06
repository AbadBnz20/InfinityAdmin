'use client';
import React, { useEffect, useState } from 'react'

export const ContentImagesLogin = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const images = [
      "/login/01.jpg",
      "/login/02.jfif",
      "/login/03.jpg",
      "/login/04.jpg",
      "/login/05.jpg",
      "/login/06.jpg"
    ]
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length)
      }, 5000)
      return () => clearInterval(interval)
    }, [])
  return (
    <div className="relative flex-1 hidden lg:block">
    {images.map((src, index) => (
      <div
        key={src}
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          index === currentImage ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${src})` }}
      />
    ))}
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <h1 className="text-4xl font-bold text-white">
        Hi, Welcome <span className="text-orange-500">Back</span>
      </h1>
    </div>
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {images.map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full ${
            index === currentImage ? 'bg-white' : 'bg-gray-400'
          }`}
        />
      ))}
    </div>
  </div>
  )
}
