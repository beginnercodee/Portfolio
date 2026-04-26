"use client"; // Error components must be Client Components

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error natively to the console for tracking
    console.error("SYS_ERR_LOGGED:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-6 relative overflow-hidden font-mono antialiased">
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-5 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] mix-blend-overlay" />
      
      {/* Dark Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(rgba(255,10,10,0.15)_1px,transparent_1px)] [background-size:32px_32px]" />
      
      <div className="max-w-2xl w-full z-20 border border-red-600/40 bg-[#0A0A0A] p-6 md:p-10 rounded-lg shadow-[0_0_80px_rgba(255,0,0,0.15)] relative mt-[-10vh]">
        {/* Top Warning Strip */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-t-lg animate-pulse" />
        
        <div className="space-y-6">
          <div className="text-red-500 font-bold text-xl md:text-2xl tracking-widest uppercase">
            [ SYSTEM CORE FAILURE: RUNTIME EXCEPTION ]
          </div>
          
          <div className="space-y-3 text-glow-silver/80 text-sm md:text-base leading-relaxed bg-[#111] border border-white/5 p-4 rounded-md">
            <p className="text-white font-semibold border-b border-white/10 pb-2 mb-2">ERROR_TRACE_LOG:</p>
            <p className="text-red-400 font-mono text-xs md:text-sm break-words">
              {error.message || "Uncaught TypeError: Thread execution halted aggressively."}
            </p>
            {error.digest && (
              <p className="text-secondary text-xs mt-2">
                Hash Digest: {error.digest}
              </p>
            )}
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 flex flex-col gap-4">
            <p className="text-[10px] md:text-xs text-secondary uppercase tracking-widest text-glow-silver/50">
              Emergency recovery protocols available:
            </p>
            
            <div className="flex gap-4 items-center">
              <button 
                onClick={() => reset()}
                className="group inline-flex items-center gap-3 bg-red-950/20 hover:bg-red-900/40 text-red-400 border border-red-500/30 hover:border-red-500/80 px-5 py-3 rounded-md transition-all text-sm hover:shadow-[0_0_20px_rgba(255,0,0,0.2)]"
              >
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">systemctl</span> 
                restart frontend
                <span className="w-2 h-4 bg-red-500 animate-pulse inline-block" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
