'use client'

/**
 * FloatingOrbs — fixed, pointer-events-none background blobs.
 * Inspired by Thala / Securify aesthetic: large radial-gradient spheres
 * that drift slowly using CSS keyframe animations.
 */
export default function FloatingOrbs() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Blue orb — top-left */}
      <div
        className="absolute rounded-full animate-float1"
        style={{
          width: '700px',
          height: '700px',
          top: '-280px',
          left: '-180px',
          background: 'radial-gradient(circle at 40% 40%, rgba(41,98,255,0.13) 0%, rgba(41,98,255,0.04) 45%, transparent 70%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Purple orb — bottom-right */}
      <div
        className="absolute rounded-full animate-float2"
        style={{
          width: '600px',
          height: '600px',
          bottom: '-200px',
          right: '-160px',
          background: 'radial-gradient(circle at 60% 60%, rgba(124,77,255,0.11) 0%, rgba(124,77,255,0.03) 45%, transparent 70%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Teal orb — mid screen */}
      <div
        className="absolute rounded-full animate-float3"
        style={{
          width: '480px',
          height: '480px',
          top: '45%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle at 50% 50%, rgba(38,166,154,0.07) 0%, rgba(38,166,154,0.02) 50%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />

      {/* Amber orb — upper-right */}
      <div
        className="absolute rounded-full animate-float2"
        style={{
          width: '300px',
          height: '300px',
          top: '15%',
          right: '5%',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,152,0,0.05) 0%, transparent 70%)',
          filter: 'blur(2px)',
          animationDelay: '-8s',
        }}
      />
    </div>
  )
}
