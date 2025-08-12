export const metadata = {
  title: 'l.aragao — Leonardo Aragao',
  description: 'Portfólio de direção e edição — videoclipes, publicidade e documentários.',
};

import VideomakerView from './view';
import BackToTemplates from '@/components/BackToTemplates';

export default function VideomakerPage() {
  return (
    <>
      <BackToTemplates />
      <VideomakerView />
    </>
  );
}
