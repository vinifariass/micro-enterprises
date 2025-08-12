export const metadata = {
  title: 'Sparrow – Portfólio Fotógrafa',
  description: 'Portfolio de fotografia com galeria, retrato, sobre e animações sutis.',
};

import SparrowView from './view';
import BackToTemplates from '@/components/BackToTemplates';

export default function SparrowTemplate() {
  return (
    <>
      <BackToTemplates />
      <SparrowView />
    </>
  );
}
