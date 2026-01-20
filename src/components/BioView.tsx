import { useState, useRef, useEffect } from 'react';
import { Edit } from 'lucide-react';

interface BioData {
  username: string;
  name: string;
  description: string;
  avatar_url: string;
  video_background_url: string;
  links: Array<{ title: string; url: string }>;
  enable_parallax: boolean;
  enable_blur: boolean;
  blur_amount: number;
}

interface BioViewProps {
  bioData: BioData;
  onEdit: () => void;
}

export default function BioView({ bioData, onEdit }: BioViewProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bioData.enable_parallax || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });

      // Calculate parallax offset based on corner proximity
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const offsetX = (x - centerX) * 0.05;
      const offsetY = (y - centerY) * 0.05;

      setParallaxOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [bioData.enable_parallax]);

  const blurStyle = bioData.enable_blur
    ? `blur(${bioData.blur_amount}px)`
    : 'blur(0px)';

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-black overflow-hidden relative"
      style={{
        background: bioData.video_background_url
          ? 'black'
          : 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)',
      }}
    >
      {/* Background Video or Fallback */}
      {bioData.video_background_url ? (
        <div className="absolute inset-0">
          <video
            src={bioData.video_background_url}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            style={{
              filter: blurStyle,
              transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ) : (
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-blob"></div>
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-blob animation-delay-4000"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
        </div>
      )}

      {/* Edit Button */}
      <button
        onClick={onEdit}
        className="fixed top-6 right-6 z-50 backdrop-blur-xl bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/20 text-white flex items-center gap-2 transition-all"
      >
        <Edit size={18} />
        <span className="text-sm">Редактировать</span>
      </button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div
          className="w-full max-w-md"
          style={{
            transform: `translate(${parallaxOffset.x * 2}px, ${parallaxOffset.y * 2}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          {/* Card */}
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl shadow-2xl border border-white/20 p-8 text-center space-y-6">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
                <img
                  src={bioData.avatar_url}
                  alt={bioData.name}
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-2xl"
                  style={{
                    filter: bioData.enable_blur ? `blur(${Math.max(0, bioData.blur_amount - 5)}px)` : 'blur(0px)',
                  }}
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white">@{bioData.username}</h2>
              <p className="text-xl text-gray-200 font-semibold">{bioData.name}</p>
              <p className="text-gray-400 text-sm">{bioData.description}</p>
            </div>

            {/* Social Icons Placeholder */}
            {bioData.links.length > 0 && (
              <div className="flex justify-center gap-3">
                {bioData.links.slice(0, 3).map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 hover:border-cyan-500/50 flex items-center justify-center text-white/70 hover:text-cyan-400 transition-all hover:scale-110"
                    title={link.title}
                  >
                    <span className="text-xs font-bold">{link.title.charAt(0)}</span>
                  </a>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="space-y-2">
              {bioData.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-6 py-3 backdrop-blur-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/40 hover:to-blue-500/40 border border-cyan-500/30 hover:border-cyan-500/60 rounded-full text-white font-medium transition-all hover:scale-105 hover:shadow-lg"
                  style={{
                    filter: bioData.enable_blur ? `blur(${Math.max(0, bioData.blur_amount - 10)}px)` : 'blur(0px)',
                  }}
                >
                  {link.title}
                </a>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="pt-4 flex justify-center gap-1 opacity-40">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
