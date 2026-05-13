// Aimeega logo component — recreated from brand assets
// Purple #7b2fff → Blue #00b4ff gradient (matches uploaded logo)

interface LogoProps {
  size?: number
  showText?: boolean
  showTagline?: boolean
  variant?: 'full' | 'icon' | 'wordmark'
  className?: string
}

export default function AimeegaLogo({
  size = 40,
  showText = true,
  showTagline = false,
  variant = 'full',
  className = '',
}: LogoProps) {
  const iconSize = size
  const id = `aimeega-grad-${Math.random().toString(36).slice(2, 7)}`

  const Icon = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 100 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`${id}-main`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7b2fff" />
          <stop offset="100%" stopColor="#00b4ff" />
        </linearGradient>
        <linearGradient id={`${id}-play`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b52ff" />
          <stop offset="100%" stopColor="#40c8ff" />
        </linearGradient>
      </defs>

      {/* A shape as film strip — left leg */}
      <path
        d="M10 85 L42 8 C44 4 48 2 50 2 C52 2 53 3 54 5 L58 14"
        stroke={`url(#${id}-main)`}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />

      {/* Film strip perforations on left leg */}
      {[18, 28, 38, 50, 62].map((y, i) => (
        <rect
          key={i}
          x="18"
          y={y - 3}
          width="6"
          height="5"
          rx="1.5"
          fill="white"
          opacity="0.9"
          transform={`rotate(-28, ${21}, ${y})`}
        />
      ))}

      {/* A shape — right leg */}
      <path
        d="M58 14 L90 85"
        stroke={`url(#${id}-main)`}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />

      {/* Crossbar with slight curve */}
      <path
        d="M30 58 L70 58"
        stroke={`url(#${id}-main)`}
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      {/* Play button in center */}
      <polygon
        points="44,46 44,66 62,56"
        fill={`url(#${id}-play)`}
        opacity="0.95"
      />
    </svg>
  )

  if (variant === 'icon') return Icon

  if (variant === 'wordmark') {
    return (
      <span
        style={{
          fontFamily: 'var(--font-bebas)',
          background: 'linear-gradient(135deg, #7b2fff 0%, #00b4ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: size * 0.6,
          letterSpacing: 1,
        }}
      >
        Aimeega
      </span>
    )
  }

  // Full: icon + wordmark
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {Icon}
      {showText && (
        <div>
          <div
            style={{
              fontFamily: 'var(--font-bebas)',
              background: 'linear-gradient(135deg, #7b2fff 0%, #00b4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: size * 0.55,
              letterSpacing: 1,
              lineHeight: 1,
            }}
          >
            Aimeega
          </div>
          {showTagline && (
            <div
              style={{
                fontSize: size * 0.18,
                color: '#70708a',
                letterSpacing: 1.5,
                fontFamily: 'var(--font-instrument)',
                fontWeight: 600,
                marginTop: 2,
              }}
            >
              AI FILMS BY CREATORS. FOR EVERYONE.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
