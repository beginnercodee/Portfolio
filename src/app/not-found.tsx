import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Memory Address Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-6 relative overflow-hidden font-mono antialiased">
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-5 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] mix-blend-overlay" />
      
      {/* Grid Pattern Override */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:32px_32px]" />
      
      <div className="max-w-xl w-full z-20 border border-red-500/30 bg-[#0A0A0A] p-6 md:p-10 rounded-lg shadow-[0_0_50px_rgba(255,0,0,0.1)] relative mt-[-10vh]">
        {/* Top Warning Strip */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600 rounded-t-lg" />
        
        <div className="space-y-6">
          <div className="text-red-500 font-bold text-xl md:text-2xl tracking-widest uppercase">
            [ FATAL EXCEPTION: 404 ]
          </div>
          
          <div className="space-y-2 text-glow-silver/80 text-sm md:text-base leading-relaxed">
            <p className="text-white">OS_KERNEL_PANIC: The requested memory address could not be allocated in the primary stack.</p>
            <div className="pt-2 opacity-80">
              <p>{">"} Tracing system routing tables...</p>
              <p>{">"} Attempting to locate physical document...</p>
              <p className="text-red-400 font-bold drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">
                {">"} ERROR: Null Reference. Directory pointer severed.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 flex flex-col gap-4">
            <p className="text-[10px] md:text-xs text-secondary uppercase tracking-widest text-glow-silver/50">
              Available recovery operations:
            </p>
            <div className="flex">
              <Link 
                href="/"
                className="group inline-flex items-center gap-3 bg-[#111] hover:bg-[#1A1A1A] text-glow-green border border-glow-green/20 hover:border-glow-green/60 px-5 py-3 rounded-md transition-all text-sm hover:shadow-[0_0_20px_rgba(57,255,20,0.2)]"
              >
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">jamal@sys:~$</span> 
                cd /root
                <span className="w-2 h-4 bg-glow-green animate-pulse inline-block" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
