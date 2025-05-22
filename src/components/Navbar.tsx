import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Jobs', href: '/jobs' },
  { name: 'Dashboard', href: '/dashboard' },
]

export default function Navbar() {
  const { user, signOut } = useAuth()
  const location = useLocation()

  return (
    <Disclosure as="nav" className="bg-gray-900/80 backdrop-blur-md shadow-lg fixed w-full z-[100]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-4 lg:px-6">
            <div className="flex h-16 justify-between">
              <div className="flex -ml-2 sm:-ml-4">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="flex items-center space-x-2">
                    <img
                      src="/logo-nobg.png"
                      alt="FlexiGig Logo"
                      className="h-8 w-14"
                    />
                    <span className="hidden sm:block text-2xl font-bold text-primary-400">
                      FlexiGig
                    </span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        location.pathname === item.href
                          ? 'border-b-2 border-primary-400 text-white'
                          : 'border-b-2 border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {user ? (
                  <div className="flex items-center space-x-2 ml-4">
                    <Menu as="div" className="relative">
                      <Menu.Button className="flex rounded-full bg-gray-900/80 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src="/Alex_pfp.jpeg"
                          alt="Student profile"
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-gray-800 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-4 py-3 border-b border-gray-700">
                            <p className="text-sm text-gray-300">Signed in as</p>
                            <p className="text-sm font-medium text-white truncate">{user.email}</p>
                          </div>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={`flex items-center px-4 py-2 text-sm ${
                                  active ? 'bg-gray-700 text-white' : 'text-gray-300'
                                }`}
                              >
                                <UserCircleIcon className="h-5 w-5 mr-3" />
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    <span
                      onClick={() => signOut()}
                      className="text-primary-400 hover:text-primary-300 text-sm font-medium cursor-pointer transition-all duration-200 bg-gray-800 px-3 py-1.5 rounded-full"
                    >
                      Sign out
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/login"
                      className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      className="bg-primary-500 text-white hover:bg-primary-400 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-primary-400 hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 bg-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={`block rounded-lg px-3 py-2 text-base font-medium ${
                    location.pathname === item.href
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {user ? (
                <>
                  <Disclosure.Button
                    as={Link}
                    to="/profile"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    onClick={() => signOut()}
                    className="block mx-auto w-fit text-center rounded-lg px-2 py-1.5 text-sm font-medium text-primary-400 hover:text-primary-300 bg-white hover:bg-gray-50"
                  >
                    Sign out
                  </Disclosure.Button>
                </>
              ) : (
                <>
                  <Disclosure.Button
                    as={Link}
                    to="/login"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Log in
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/register"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Sign up
                  </Disclosure.Button>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
} 