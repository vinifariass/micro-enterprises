export const metadata = {
  title: 'Streetwear Shop',
  description: 'E-commerce de roupas oversized e tênis (Air Force / Jordan) com carrinho.',
};

import StreetwearView from './view';
import BackToTemplates from '@/components/BackToTemplates';

export default function StreetwearPage() {
  return (
    <>
      <BackToTemplates />
      <StreetwearView />
    </>
  );
}
