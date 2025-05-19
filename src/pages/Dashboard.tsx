import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

interface Job {
  id: string
  title: string
  business_name: string
  location: string
  pay_rate: number
  start_time: string
  end_time: string
  status: 'open' | 'booked' | 'completed'
  application_status: 'pending' | 'accepted' | 'rejected'
  applied_at: string
}

export default function Dashboard() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const userRole = user?.user_metadata?.role || 'student'

  useEffect(() => {
    fetchAppliedJobs()
  }, [])

  const fetchAppliedJobs = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          jobs (
            id,
            title,
            business_name,
            location,
            pay_rate,
            start_time,
            end_time,
            status
          )
        `)
        .eq('user_id', user?.id)
        .order('applied_at', { ascending: false })

      if (error) throw error

      // Transform the data to match our Job interface
      const transformedJobs = data?.map(application => ({
        id: application.jobs.id,
        title: application.jobs.title,
        business_name: application.jobs.business_name,
        location: application.jobs.location,
        pay_rate: application.jobs.pay_rate,
        start_time: application.jobs.start_time,
        end_time: application.jobs.end_time,
        status: application.jobs.status,
        application_status: application.status,
        applied_at: application.applied_at
      })) || []

      setJobs(transformedJobs)
    } catch (error) {
      console.error('Error fetching applied jobs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          {userRole === 'business' && (
            <button
              type="button"
              className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              Post new job
            </button>
          )}
        </div>

        {/* Welcome section */}
        <div className="mb-8">
          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-5">
              <h3 className="text-lg font-medium text-white">
                Welcome back, {user?.email}
              </h3>
              <div className="mt-2 text-sm text-gray-300">
                <p>
                  {userRole === 'student'
                    ? 'View your job applications and their status.'
                    : 'Manage your job listings and review applications.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs section */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              {userRole === 'student' ? 'Your Applications' : 'Your Job Listings'}
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              {userRole === 'student'
                ? 'Track the status of your job applications.'
                : 'Manage your job listings and review applications.'}
            </p>
          </div>

          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Job Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Business
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Pay Rate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Applied On
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative px-6 py-3"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {job.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {job.business_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {job.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatCurrency(job.pay_rate)}/hr
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatDate(job.applied_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            job.application_status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : job.application_status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {job.application_status.charAt(0).toUpperCase() + job.application_status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-primary-400 hover:text-primary-300"
                          onClick={() => {
                            // Handle view details action
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 