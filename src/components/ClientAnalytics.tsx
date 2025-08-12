'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { gaPageview } from '@/lib/analytics';

export default function ClientAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sp = searchParams?.toString() ?? '';
    const url = pathname + (sp ? `?${sp}` : '');
    gaPageview(url);
  }, [pathname, searchParams]);

  return null;
}
