import {ImageResponse} from 'next/og';
import {siteDescription, siteName} from '@/lib/site-metadata';

export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 40%, #0f172a 100%)',
          color: '#f1f5f9',
          padding: '80px',
          fontFamily: 'Inter, Arial, sans-serif'
        }}
      >
        <p style={{fontSize: 34, textTransform: 'uppercase', letterSpacing: 6, opacity: 0.8}}>
          {siteName}
        </p>
        <h1 style={{fontSize: 86, lineHeight: 1.1, margin: '20px 0'}}>
          คอร์ส React ภาษาไทยสำหรับมือใหม่สายเว็บ
        </h1>
        <p style={{fontSize: 36, maxWidth: '60%', color: '#e0f2fe'}}>{siteDescription}</p>
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 28
          }}
        >
          <span
            style={{
              padding: '12px 28px',
              borderRadius: 999,
              background: 'rgba(15, 23, 42, 0.6)',
              color: '#f8fafc'
            }}
          >
            Thai + English copy
          </span>
          <span
            style={{
              padding: '12px 28px',
              borderRadius: 999,
              border: '2px solid rgba(248, 250, 252, 0.4)'
            }}
          >
            Mini projects & Playground
          </span>
        </div>
      </div>
    ),
    size
  );
}
