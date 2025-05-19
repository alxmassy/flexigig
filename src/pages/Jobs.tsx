import { useState } from 'react'
import { testJobs, testBusinesses } from '../data/testData'
import { MapPinIcon, CurrencyDollarIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline'

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const locations = Array.from(new Set(testJobs.map(job => job.location)))
  const businesses = testBusinesses.reduce((acc, business) => {
    acc[business.id] = business
    return acc
  }, {} as Record<string, typeof testBusinesses[0]>)

  const filteredJobs = testJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !selectedLocation || job.location === selectedLocation
    return matchesSearch && matchesLocation
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Search and Filter Section */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map(job => {
            const business = businesses[job.businessId]
            return (
              <div
                key={job.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={business.imageUrl}
                    alt={business.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                    <span className="text-primary-400 font-medium">{formatCurrency(job.payRate)}/hr</span>
                  </div>
                  <p className="text-gray-300 mb-4">{job.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-400">
                      <MapPinIcon className="h-5 w-5 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      <span>{new Date(job.startTime).toLocaleDateString('en-IN')}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      <span>
                        {formatTime(job.startTime)} - {formatTime(job.endTime)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded-full"
                      >
                        {req}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-400 transition-colors duration-200">
                    Apply Now
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 