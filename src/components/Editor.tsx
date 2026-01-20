import { useState } from 'react';
import { Plus, Image, Save, X } from 'lucide-react';

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

interface EditorProps {
  onSave: (data: BioData) => void;
}

export default function Editor({ onSave }: EditorProps) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState('https://picsum.photos/150?random=1');
  const [videoBg, setVideoBg] = useState('');
  const [links, setLinks] = useState([{ title: '', url: '' }]);
  const [enableParallax, setEnableParallax] = useState(true);
  const [enableBlur, setEnableBlur] = useState(true);
  const [blurAmount, setBlurAmount] = useState(10);

  const addLink = () => {
    setLinks([...links, { title: '', url: '' }]);
  };

  const removeLink = (index: number) => {
    if (links.length > 1) {
      setLinks(links.filter((_, i) => i !== index));
    }
  };

  const updateLink = (index: number, field: 'title' | 'url', value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const randomAvatar = () => {
    setAvatar(`https://picsum.photos/150?random=${Math.floor(Math.random() * 10000)}`);
  };

  const handleSave = () => {
    if (!username.trim() || !name.trim()) {
      alert('Заполните имя пользователя и ваше имя');
      return;
    }

    onSave({
      username,
      name,
      description,
      avatar_url: avatar,
      video_background_url: videoBg,
      links: links.filter(l => l.title && l.url),
      enable_parallax: enableParallax,
      enable_blur: enableBlur,
      blur_amount: blurAmount,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated background shader */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block backdrop-blur-xl bg-white/5 px-8 py-4 rounded-3xl border border-white/10 shadow-2xl mb-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                BioGenerator
              </h1>
            </div>
            <p className="text-gray-400 text-lg">Создайте свою уникальную био-страницу</p>
          </div>

          {/* Form */}
          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-8 space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">Имя пользователя</label>
              <div className="flex gap-2">
                <span className="flex items-center px-4 py-3 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 text-gray-400">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                  className="flex-1 px-4 py-3 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/20 transition-all"
                  placeholder="your_username"
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">Ваше имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/20 transition-all"
                placeholder="Иван Иванов"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">Описание</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/20 transition-all resize-none"
                placeholder="Расскажите о себе..."
              />
            </div>

            {/* Avatar */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">Аватар (URL)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="flex-1 px-4 py-3 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/20 transition-all"
                  placeholder="https://example.com/avatar.jpg"
                />
                <button
                  onClick={randomAvatar}
                  className="px-4 py-3 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                >
                  <Image size={20} />
                </button>
              </div>
            </div>

            {/* Video Background */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">Видео фон (URL)</label>
              <input
                type="text"
                value={videoBg}
                onChange={(e) => setVideoBg(e.target.value)}
                className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/20 transition-all"
                placeholder="https://example.com/video.mp4"
              />
            </div>

            {/* Effect Controls */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-4 space-y-4">
              <h3 className="text-sm font-semibold text-gray-300">Эффекты</h3>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableParallax}
                  onChange={(e) => setEnableParallax(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-gray-400">Эффект параллакса при наводке</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableBlur}
                  onChange={(e) => setEnableBlur(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-gray-400">Включить блюр эффект</span>
              </label>

              {enableBlur && (
                <div className="space-y-2">
                  <label className="text-xs text-gray-400">Размер блюра: {blurAmount}px</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={blurAmount}
                    onChange={(e) => setBlurAmount(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Ссылки</h3>
              <div className="space-y-3">
                {links.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => updateLink(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/20 transition-all text-sm"
                        placeholder="Название"
                      />
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => updateLink(index, 'url', e.target.value)}
                        className="w-full px-3 py-2 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/20 transition-all text-sm"
                        placeholder="https://example.com"
                      />
                    </div>
                    <button
                      onClick={() => removeLink(index)}
                      className="px-3 h-14 self-start backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/50 transition-all"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addLink}
                className="w-full py-3 mt-4 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                <span>Добавить ссылку</span>
              </button>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full py-4 backdrop-blur-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 font-semibold"
            >
              <Save size={20} />
              <span>Сохранить и просмотреть</span>
            </button>
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
