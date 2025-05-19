export interface Job {
  id: string
  businessId: string
  title: string
  description: string
  location: string
  payRate: number
  startTime: string
  endTime: string
  requirements: string[]
  status: 'open' | 'in_progress' | 'completed'
  createdAt: string
}

export interface Business {
  id: string
  name: string
  description: string
  location: string
  industry: string
  rating: number
  imageUrl: string
}

export interface UserProfile {
  id: string
  fullName: string
  email: string
  phone: string
  location: string
  bio: string
  skills: string[]
  isBusiness: boolean
  businessDetails?: {
    name: string
    industry: string
    description: string
  }
}

export const testBusinesses: Business[] = [
  {
    id: '1',
    name: 'TechHub Cafe',
    description: 'A modern cafe with high-speed WiFi, perfect for students and tech professionals in Koramangala.',
    location: 'Koramangala, Bangalore',
    industry: 'Food & Beverage',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
  },
  {
    id: '2',
    name: 'Organic Bazaar',
    description: 'Premium organic grocery store offering fresh produce and sustainable products.',
    location: 'Indiranagar, Bangalore',
    industry: 'Retail',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
  },
  {
    id: '3',
    name: 'Campus Bookstore',
    description: 'University bookstore offering textbooks, supplies, and university merchandise.',
    location: 'Jayanagar, Bangalore',
    industry: 'Education',
    rating: 4.2,
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  }
]

export const testJobs: Job[] = [
  {
    id: '1',
    businessId: '1',
    title: 'Weekend Barista',
    description: 'Looking for an energetic barista to join our weekend team. Experience with coffee preparation and customer service required.',
    location: 'Koramangala, Bangalore',
    payRate: 250,
    startTime: '2024-03-20T08:00:00+05:30',
    endTime: '2024-03-20T16:00:00+05:30',
    requirements: ['Coffee preparation', 'Customer service', 'Cash handling'],
    status: 'open',
    createdAt: '2024-03-15T10:00:00+05:30'
  },
  {
    id: '2',
    businessId: '1',
    title: 'Kitchen Assistant',
    description: 'Help with food preparation and kitchen maintenance. Perfect for culinary students.',
    location: 'Koramangala, Bangalore',
    payRate: 200,
    startTime: '2024-03-21T10:00:00+05:30',
    endTime: '2024-03-21T18:00:00+05:30',
    requirements: ['Food safety knowledge', 'Basic cooking skills', 'Team player'],
    status: 'open',
    createdAt: '2024-03-15T11:00:00+05:30'
  },
  {
    id: '3',
    businessId: '2',
    title: 'Stock Clerk',
    description: 'Help with inventory management and stocking shelves. Flexible hours available.',
    location: 'Indiranagar, Bangalore',
    payRate: 180,
    startTime: '2024-03-22T09:00:00+05:30',
    endTime: '2024-03-22T17:00:00+05:30',
    requirements: ['Inventory management', 'Physical stamina', 'Attention to detail'],
    status: 'open',
    createdAt: '2024-03-15T12:00:00+05:30'
  },
  {
    id: '4',
    businessId: '3',
    title: 'Textbook Assistant',
    description: 'Help students find textbooks and manage inventory during busy periods.',
    location: 'Jayanagar, Bangalore',
    payRate: 200,
    startTime: '2024-03-23T10:00:00+05:30',
    endTime: '2024-03-23T18:00:00+05:30',
    requirements: ['Organization skills', 'Customer service', 'Basic computer skills'],
    status: 'open',
    createdAt: '2024-03-15T13:00:00+05:30'
  }
]

export const testUserProfiles: UserProfile[] = [
  {
    id: '1',
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@university.edu',
    phone: '+91 98765 43210',
    location: 'Jayanagar, Bangalore',
    bio: 'Computer Science student at Bangalore University looking for part-time work to gain experience.',
    skills: ['Programming', 'Problem Solving', 'Team Collaboration'],
    isBusiness: false
  },
  {
    id: '2',
    fullName: 'Priya Patel',
    email: 'priya.p@university.edu',
    phone: '+91 98765 43211',
    location: 'Koramangala, Bangalore',
    bio: 'Business major with experience in customer service and retail.',
    skills: ['Customer Service', 'Sales', 'Inventory Management'],
    isBusiness: false
  },
  {
    id: '3',
    fullName: 'TechHub Cafe',
    email: 'manager@techhubcafe.com',
    phone: '+91 98765 43212',
    location: 'Koramangala, Bangalore',
    bio: 'Modern cafe looking for enthusiastic team members.',
    skills: ['Coffee Preparation', 'Customer Service', 'Team Management'],
    isBusiness: true,
    businessDetails: {
      name: 'TechHub Cafe',
      industry: 'Food & Beverage',
      description: 'A modern cafe with a tech-friendly environment.'
    }
  }
] 