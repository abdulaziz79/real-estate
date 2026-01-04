
import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  view?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, view = 'grid' }) => {
  const isList = view === 'list';
  // Conversion from sqft to sqm
  const sqm = Math.round(property.sqft * 0.092903);

  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all group duration-300 ${isList ? 'flex flex-col md:flex-row' : ''}`}>
      <div className={`relative ${isList ? 'md:w-1/3' : 'h-64'}`}>
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {property.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
              property.type === 'Under Construction' 
                ? 'bg-orange-500 text-white' 
                : 'bg-white/90 backdrop-blur text-slate-800'
            }`}>
              {property.type}
            </span>
          </div>
          {property.type === 'Under Construction' && property.apartments && (
            <span className="bg-white/90 backdrop-blur text-slate-800 px-3 py-1 rounded-full text-[10px] font-bold shadow-lg w-fit">
              {property.apartments} Apartments
            </span>
          )}
          {property.isBoosted && (
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-[10px] uppercase font-black shadow-lg animate-pulse flex items-center gap-1 w-fit">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Boosted Listing
            </span>
          )}
        </div>
        <button className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-600 hover:text-red-500 transition-all shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className={`p-6 flex flex-col justify-between ${isList ? 'md:w-2/3' : ''}`}>
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
            <Link to={`/property/${property.id}`}>{property.title}</Link>
          </h3>
          <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.city}, {property.country}
          </p>

          <div className="flex items-center gap-4 text-slate-600 text-sm mb-6 border-y border-slate-100 py-3">
            <div className="flex items-center gap-1">
              <span className="font-bold text-slate-900">{property.bedrooms}</span> Bed
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-slate-900">{property.bathrooms}</span> Bath
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-slate-900">{sqm}</span> m²
            </div>
            {property.type === 'Under Construction' && property.apartments && (
              <div className="flex items-center gap-1">
                <span className="font-bold text-slate-900">{property.apartments}</span> Units
              </div>
            )}
          </div>
          {property.type === 'Under Construction' && property.monthlyInstallment && (
            <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-2xl">
              <p className="text-xs font-black text-orange-600 uppercase tracking-widest mb-2">Payment Plan</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-600">Down Payment</p>
                  <p className="text-lg font-bold text-slate-900">${property.downPayment?.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-600">Monthly</p>
                  <p className="text-lg font-bold text-blue-600">${property.monthlyInstallment.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-600">Duration</p>
                  <p className="text-lg font-bold text-slate-900">{property.paymentDuration} Years</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              ${property.price.toLocaleString()}
            </p>
            {property.type === 'Under Construction' && (
              <p className="text-xs text-slate-500 mt-1">Total Price</p>
            )}
          </div>
          <Link to={`/property/${property.id}`} className="bg-slate-900 text-white px-5 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-all">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
