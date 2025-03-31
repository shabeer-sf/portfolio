'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * This is a higher-order component (HOC) that safely passes search parameters
 * to server components, avoiding the Next.js dynamic API warnings
 */
export function withSearchParams(Component) {
  return function SearchParamsWrapper(props) {
    // Get search params client-side
    const searchParams = useSearchParams();
    
    // Convert to regular object (searchParams is a URLSearchParams instance)
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    // Render the wrapped component with search params as regular props
    return <Component {...props} searchParamsObj={params} />;
  };
}

/**
 * Alternative implementation as a component rather than HOC
 */
export function SearchParamsProvider({ children }) {
  const searchParams = useSearchParams();
  
  // Convert to regular object
  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  // Clone children with searchParamsObj prop
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { searchParamsObj: params });
    }
    return child;
  });
}