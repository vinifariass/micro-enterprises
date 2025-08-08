'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { gaPageview } from '@/lib/analytics';

export default function ClientAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    gaPageview(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return null;
}
