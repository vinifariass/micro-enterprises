import { ImageResponse } from 'next/og';
import { defaultBusinessConfig } from '@/config/business';

export const runtime = 'edge';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  const { name, slogan } = defaultBusinessConfig;
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: '#0b1220',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ fontWeight: 800 }}>{name}</div>
        <div style={{ fontSize: 32, color: '#93c5fd', marginTop: 16 }}>{slogan}</div>
      </div>
    ),
    { ...size }
  );
}
