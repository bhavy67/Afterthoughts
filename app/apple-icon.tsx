import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#FAFAF8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="110" height="99" viewBox="0 0 62 56" fill="none">
          <line x1="0" y1="5" x2="62" y2="5" stroke="#C0503A" strokeWidth="2.6" strokeLinecap="square" />
          <line x1="4" y1="54" x2="31" y2="5" stroke="#C0503A" strokeWidth="2.6" strokeLinecap="square" />
          <line x1="31" y1="5" x2="58" y2="54" stroke="#C0503A" strokeWidth="2.6" strokeLinecap="square" />
          <line x1="31" y1="5" x2="31" y2="54" stroke="#C0503A" strokeWidth="2.6" strokeLinecap="square" />
          <line x1="15" y1="36" x2="47" y2="36" stroke="#C0503A" strokeWidth="2.6" strokeLinecap="square" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
