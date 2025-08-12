export const metadata = {
  title: 'Streetwear Shop',
  description: 'E-commerce de roupas oversized e tênis (Air Force / Jordan) com carrinho.',
};

import { Inter } from 'next/font/google';
import StreetwearView from './view';
import BackToTemplates from '@/components/BackToTemplates';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function StreetwearPage() {
  return (
  <div className={inter.className}>
      <BackToTemplates />
      <StreetwearView />
  </div>
  );
}
