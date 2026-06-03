
export function RibbenGradient() { 
  return (
    <>
    
{/* Ribbon Gradient Background Sweep */ }
        <svg
          className="absolute right-0 top-0 w-full max-w-[800px] h-[600px] pointer-events-none z-0 opacity-80"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ribbon-gradient-1" x1="0" y1="600" x2="800" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
              <stop offset="40%" stopColor="#818cf8" stopOpacity="0.15" />
              <stop offset="70%" stopColor="#c084fc" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="ribbon-gradient-2" x1="0" y1="600" x2="800" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Broad glowing path sweeps */}
          <path d="M 0 500 C 250 480, 450 150, 800 120" stroke="url(#ribbon-gradient-1)" strokeWidth="60" strokeLinecap="round" opacity="0.6" />
          <path d="M 30 530 C 280 500, 480 180, 800 150" stroke="url(#ribbon-gradient-2)" strokeWidth="40" strokeLinecap="round" opacity="0.5" />
          
          {/* Fine structural ribbon lines replicating the distinct vector strands from the image */}
          <path d="M 50 490 C 270 470, 470 170, 800 110" stroke="#818cf8" strokeWidth="1.5" opacity="0.4" />
          <path d="M 60 500 C 280 480, 480 180, 800 120" stroke="#c084fc" strokeWidth="2.5" opacity="0.5" />
          <path d="M 70 510 C 290 490, 490 190, 800 130" stroke="#60a5fa" strokeWidth="1.2" opacity="0.3" />
          <path d="M 80 520 C 300 500, 500 200, 800 140" stroke="#a78bfa" strokeWidth="3" opacity="0.6" />
          <path d="M 90 530 C 310 510, 510 210, 800 150" stroke="#818cf8" strokeWidth="1.8" opacity="0.4" />
        </svg>
  


    </>
  )
}


