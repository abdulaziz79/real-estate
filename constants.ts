
import { Property, Agent, BlogPost, Review } from './types';

export const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", 
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", 
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", 
  "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", 
  "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", 
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", 
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", 
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", 
  "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", 
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", 
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", 
  "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", 
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", 
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export const MAJOR_CITIES: Record<string, string[]> = {
  'United States': ['New York', 'Los Angeles', 'Miami', 'San Francisco', 'Chicago', 'Austin', 'Seattle'],
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Liverpool'],
  'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah'],
  'France': ['Paris', 'Marseille', 'Lyon', 'Nice'],
  'Japan': ['Tokyo', 'Osaka', 'Kyoto'],
  'Canada': ['Toronto', 'Vancouver', 'Montreal'],
  'Australia': ['Sydney', 'Melbourne', 'Brisbane'],
};

export const GEOGRAPHY = COUNTRIES.map(country => ({
  country,
  cities: MAJOR_CITIES[country] || []
}));

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userId: 'u1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Sarah was incredible! She found us the perfect home in less than a month.',
    date: '2023-11-01'
  }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa in Beverly Hills',
    price: 4500000,
    location: 'Beverly Hills, Los Angeles, USA',
    country: 'United States',
    city: 'Los Angeles',
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 6500,
    yearBuilt: 2022,
    description: 'This stunning modern masterpiece offers breathtaking city views and the ultimate in luxury living.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200'
    ],
    features: ['Ocean View', 'Smart Home'],
    agentId: 'a1',
    status: 'For Sale',
    coordinates: { lat: 34.0736, lng: -118.4004 },
    amenities: ['Pool', 'Gym', 'Home Theater'],
    isBoosted: true,
  }
];

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'a1',
    userId: 'u_agent_1',
    name: 'Sarah Jenkins',
    role: 'Principal Broker',
    company: 'Elite Global Realty',
    location: 'Beverly Hills, CA',
    website: 'https://sarahjenkins.realty',
    bio: 'With over 15 years of experience in the luxury market, I specialize in connecting global investors with exclusive coastal properties.',
    experience: '15+ Years',
    specialties: ['Luxury Residential', 'Waterfront'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400',
    phone: '(555) 123-4567',
    email: 'sarah@eliterealty.com',
    socials: { linkedin: '#' },
    rating: 4.9,
    reviewCount: 1,
    reviews: [MOCK_REVIEWS[0]],
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Interior Design Trends',
    excerpt: 'Discover what\'s shaping homes this year.',
    category: 'Design',
    date: 'Oct 15, 2023',
    author: 'Elena Rossi',
    image: 'https://images.unsplash.com/photo-1616489953149-755e14a70295?auto=format&fit=crop&w=800',
  }
];
