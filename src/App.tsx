import { useState } from 'react';
import { Plus, Link2, Save, Image, ArrowRight, Eye, EyeOff, Zap } from 'lucide-react';
import Editor from './components/Editor';
import BioView from './components/BioView';

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

function App() {
  const [mode, setMode] = useState<'editor' | 'view'>('editor');
  const [bioData, setBioData] = useState<BioData | null>(null);

  const handleSaveBio = (data: BioData) => {
    setBioData(data);
    setMode('view');
  };

  const handleEditBio = () => {
    setMode('editor');
  };

  return (
    <>
      {mode === 'editor' ? (
        <Editor onSave={handleSaveBio} />
      ) : (
        <BioView bioData={bioData!} onEdit={handleEditBio} />
      )}
    </>
  );
}

export default App;
