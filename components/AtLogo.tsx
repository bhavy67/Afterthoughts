interface AtLogoProps {
  size?: number
  color?: string
  className?: string
}

export default function AtLogo({ size = 32, color = 'currentColor', className }: AtLogoProps) {
  const height = Math.round(size * (56 / 62))
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 62 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <line x1="0" y1="5" x2="62" y2="5" stroke={color} strokeWidth="2.6" strokeLinecap="square" />
      <line x1="4" y1="54" x2="31" y2="5" stroke={color} strokeWidth="2.6" strokeLinecap="square" />
      <line x1="31" y1="5" x2="58" y2="54" stroke={color} strokeWidth="2.6" strokeLinecap="square" />
      <line x1="31" y1="5" x2="31" y2="54" stroke={color} strokeWidth="2.6" strokeLinecap="square" />
      <line x1="15" y1="36" x2="47" y2="36" stroke={color} strokeWidth="2.6" strokeLinecap="square" />
    </svg>
  )
}
