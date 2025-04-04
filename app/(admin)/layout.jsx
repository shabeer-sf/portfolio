// app/admin/layout.jsx
import { Suspense } from 'react';
import AdminWrapper from '@/components/AdminWrapper';
import '../globals.css';
// import { dynamic, fetchCache, revalidate } from './config'; // Make sure config.js is in the /admin folder
// import { SearchParamsProvider } from "@/lib/search-params";
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
export default function AdminLayout({ children }) {
  return (
    <AdminWrapper>
      {/* Ensure SearchParamsProvider is used correctly with Suspense */}
      <Suspense fallback={null}>
        {/* <SearchParamsProvider> */}
          {children}
        {/* </SearchParamsProvider> */}
      </Suspense>
    </AdminWrapper>
  );
}