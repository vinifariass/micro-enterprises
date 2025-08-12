import PowitView from './view';
import BackToTemplates from '@/components/BackToTemplates';

export const metadata = {
  title: 'Powit (inspirado)',
  description: 'Template com hero geométrico e serviços, reimplementado em Tailwind.',
};

export default function PowitTemplate() {
  return (
    <>
      <BackToTemplates />
      <PowitView />
    </>
  );
}
