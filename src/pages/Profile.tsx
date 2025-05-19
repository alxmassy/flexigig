import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

interface ProfileFormData {
  full_name: string
  phone: string
  location: string
  bio: string
  skills: string[]
}

export default function Profile() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const userRole = user?.user_metadata?.role || 'student'

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (error) throw error
      if (data) {
        reset(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true)
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...data,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Profile
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-300">
            {userRole === 'student'
              ? 'Manage your student profile and preferences'
              : 'Manage your business profile and settings'}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {userRole === 'student' ? (
              <>
                <div>
                  <label
                    htmlFor="full_name"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register('full_name', {
                        required: 'Full name is required',
                      })}
                      className="block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    />
                    {errors.full_name && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.full_name.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Please enter a valid 10-digit phone number',
                        },
                      })}
                      placeholder="+91 XXXXXXXXXX"
                      className="block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Location
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register('location', {
                        required: 'Location is required',
                      })}
                      placeholder="e.g., Koramangala, Bangalore"
                      className="block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    />
                    {errors.location && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Bio
                  </label>
                  <div className="mt-1">
                    <textarea
                      {...register('bio')}
                      rows={4}
                      className="block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="skills"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Skills
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register('skills')}
                      placeholder="e.g., Customer Service, Sales, Inventory Management"
                      className="block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    />
                    <p className="mt-2 text-sm text-gray-400">
                      Enter skills separated by commas
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label
                    htmlFor="business_name"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Business Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register('business_name', {
                        required: 'Business name is required',
                      })}
                      className="block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="business_description"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Business Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      {...register('business_description')}
                      rows={4}
                      className="block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end gap-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 