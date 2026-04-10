"use client"

export function GlitchEffectSVG() {
  return (
    <svg className="hidden w-0 h-0 absolute pointer-events-none">
      <defs>
        <filter id="liquidHover">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.03"
            numOctaves="3"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="10s"
              values="0.015 0.03;0.025 0.05;0.015 0.03"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="B"
            colorInterpolationFilters="sRGB"
          />
        </filter>
        <filter id="liquidNormal">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.03"
            numOctaves="1"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
            colorInterpolationFilters="sRGB"
          />
        </filter>
      </defs>
    </svg>
  )
}
