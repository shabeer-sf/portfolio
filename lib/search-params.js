'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Inner component that safely handles useSearchParams and passes them to the wrapped component
 */
function SearchParamsComponent({ Component, setParams, ...props }) {
  const searchParams = useSearchParams();
  
  // Convert to regular object (searchParams is a URLSearchParams instance)
  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  // When using as a HOC wrapper, we'll set params via callback if provided
  if (setParams) {
    setParams(params);
    return null;
  }
  
  // When used directly, render the component with params
  return <Component {...props} searchParamsObj={params} />;
}

/**
 * This is a higher-order component (HOC) that safely passes search parameters
 * to server components, avoiding the Next.js dynamic API warnings
 */
export function withSearchParams(Component) {
  return function SearchParamsWrapper(props) {
    // State to hold the params after they're read from the suspense boundary
    const [params, setParams] = React.useState({});
    
    return (
      <>
        {/* Suspense boundary to handle useSearchParams */}
        <Suspense fallback={null}>
          <SearchParamsComponent setParams={setParams} />
        </Suspense>
        
        {/* Render the wrapped component with search params as regular props */}
        <Component {...props} searchParamsObj={params} />
      </>
    );
  };
}

/**
 * Alternative implementation as a component rather than HOC
 */
export function SearchParamsProvider({ children }) {
  // State to hold the params after they're read from the suspense boundary
  const [params, setParams] = React.useState({});
  
  return (
    <>
      {/* Suspense boundary to handle useSearchParams */}
      <Suspense fallback={null}>
        <SearchParamsComponent setParams={setParams} />
      </Suspense>
      
      {/* Clone children with searchParamsObj prop */}
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { searchParamsObj: params });
        }
        return child;
      })}
    </>
  );
}

/**
 * A hook-based solution that provides search params safely
 */
export function useSearchParamsSafe() {
  // State to hold the params
  const [params, setParams] = React.useState({});
  
  // Component that reads search params and updates the state
  const SearchParamsReader = React.useCallback(() => {
    const searchParams = useSearchParams();
    
    // Convert to regular object
    const paramsObj = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });
    
    // Update state
    React.useEffect(() => {
      setParams(paramsObj);
    }, [searchParams]);
    
    return null;
  }, []);
  
  // Return both params and a component to wrap in Suspense
  return {
    params,
    SearchParamsReader
  };
}

/**
 * Example usage of useSearchParamsSafe:
 * 
 * function MyComponent() {
 *   const { params, SearchParamsReader } = useSearchParamsSafe();
 *   
 *   return (
 *     <>
 *       <Suspense fallback={null}>
 *         <SearchParamsReader />
 *       </Suspense>
 *       
 *       <div>
 *         Param value: {params.myParam}
 *       </div>
 *     </>
 *   );
 * }
 */