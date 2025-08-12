export const metadata = {
  title: 'News & Tech Blog',
  description: 'Notícias estilo G1 + Tecnoblog, com adição de posts (localStorage).',
};

import NewsblogView from './view';
import BackToTemplates from '@/components/BackToTemplates';

export default function NewsBlogPage() {
  return (
    <>
      <BackToTemplates />
      <NewsblogView />
    </>
  );
}
