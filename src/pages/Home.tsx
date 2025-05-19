import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      alt: 'Students working together'
    },
    {
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      alt: 'Part-time work environment'
    },
    {
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      alt: 'Team collaboration'
    },
    {
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80',
      alt: 'Professional work setting'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-screen bg-gray-900">
      {/* Hero section with image carousel */}
      <div className="relative w-screen h-[400px] sm:h-[500px] md:h-[600px]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Find Your Perfect Part-Time Job
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-white max-w-3xl mx-auto">
              Connect with local businesses and find flexible work opportunities that fit your schedule.
            </p>
            <div className="mt-6 sm:mt-10">
              <Link
                to="/register"
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="w-screen bg-gray-900">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              Why Choose FlexiGig?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-300">
              The easiest way to find and manage part-time work
            </p>
          </div>

          <div className="mt-12 sm:mt-16">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="text-primary-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">
                  Flexible Hours
                </h3>
                <p className="mt-2 text-base text-gray-300">
                  Choose shifts that work with your schedule
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="text-primary-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">
                  Competitive Pay
                </h3>
                <p className="mt-2 text-base text-gray-300">
                  Earn what you deserve with transparent rates
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="text-primary-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">
                  Trusted Businesses
                </h3>
                <p className="mt-2 text-base text-gray-300">
                  Work with verified local businesses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="w-screen bg-gray-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                <span className="block">Ready to get started?</span>
                <span className="block text-primary-400">
                  Create your account today.
                </span>
              </h2>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 lg:mt-0 lg:flex-shrink-0">
              <Link
                to="/register"
                className="inline-flex justify-center items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-400"
              >
                Get started
              </Link>
              <Link
                to="/jobs"
                className="inline-flex justify-center items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-500 bg-white hover:bg-gray-50"
              >
                Browse jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 