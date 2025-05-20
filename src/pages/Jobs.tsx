import { useState } from 'react'
import { testJobs, testBusinesses } from '../data/testData'
import { MapPinIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline'

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedPayRate, setSelectedPayRate] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const locations = Array.from(new Set(testJobs.map(job => job.location)))
  const businesses = testBusinesses.reduce((acc, business) => {
    acc[business.id] = business
    return acc
  }, {} as Record<string, typeof testBusinesses[0]>)

  const payRateRanges = [
    { label: 'Any', value: '' },
    { label: 'Under ₹200/hr', value: '0-200' },
    { label: '₹200-400/hr', value: '200-400' },
    { label: '₹400-600/hr', value: '400-600' },
    { label: 'Over ₹600/hr', value: '600+' }
  ]

  const dateRanges = [
    { label: 'Any', value: '' },
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' }
  ]

  const filteredJobs = testJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !selectedLocation || job.location === selectedLocation
    const matchesPayRate = !selectedPayRate || (() => {
      const [min, max] = selectedPayRate.split('-')
      if (max === '+') return job.payRate >= parseInt(min)
      return job.payRate >= parseInt(min) && job.payRate <= parseInt(max)
    })()
    const matchesDate = !selectedDate || (() => {
      const now = new Date()
      const jobDate = new Date(job.startTime)
      switch (selectedDate) {
        case 'today':
          return jobDate.toDateString() === now.toDateString()
        case 'week':
          const weekAgo = new Date(now.setDate(now.getDate() - 7))
          return jobDate >= weekAgo
        case 'month':
          const monthAgo = new Date(now.setMonth(now.getMonth() - 1))
          return jobDate >= monthAgo
        default:
          return true
      }
    })()
    return matchesSearch && matchesLocation && matchesPayRate && matchesDate
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

  const FilterSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Location
        </label>
        <select
          className="w-full px-3 py-2 rounded-md bg-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Pay Rate
        </label>
        <select
          className="w-full px-3 py-2 rounded-md bg-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={selectedPayRate}
          onChange={(e) => setSelectedPayRate(e.target.value)}
        >
          {payRateRanges.map(range => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Date Range
        </label>
        <select
          className="w-full px-3 py-2 rounded-md bg-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {dateRanges.map(range => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>
      </div>

      <button
        onClick={() => {
          setSearchTerm('')
          setSelectedLocation('')
          setSelectedPayRate('')
          setSelectedDate('')
        }}
        className="w-full mt-4 px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200"
      >
        Clear Filters
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Jobs List */}
          <div className="lg:w-2/3">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200"
              >
                <FunnelIcon className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {filteredJobs.map(job => {
                const business = businesses[job.businessId]
                return (
                  <div
                    key={job.id}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={business.imageUrl}
                        alt={business.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                        <span className="text-primary-400 font-medium">{formatCurrency(job.payRate)}/hr</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{job.description}</p>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          <span>{new Date(job.startTime).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          <span>
                            {formatTime(job.startTime)} - {formatTime(job.endTime)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.requirements.slice(0, 2).map((req, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                          >
                            {req}
                          </span>
                        ))}
                        {job.requirements.length > 2 && (
                          <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                            +{job.requirements.length - 2} more
                          </span>
                        )}
                      </div>

                      <button className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-400 transition-colors duration-200 text-sm">
                        Apply Now
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Filters Section - Desktop */}
          <div className="hidden lg:block lg:w-1/3">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-4">Filters</h2>
              <FilterSection />
            </div>
          </div>

          {/* Filters Section - Mobile Popup */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
              <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-gray-800 shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white">Filters</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
                  <FilterSection />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 