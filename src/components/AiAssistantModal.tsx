import React, { useState } from 'react';
import { Sparkles, X, Loader2, Bot, Send } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  defaultPrompt: string;
  onApply: (generatedText: string) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  title,
  defaultPrompt,
  onApply,
}) => {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal memanggil AI');
      setResult(data.text);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan pada AI Copilot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-emerald-100 flex flex-col max-h-[90vh]">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            <h3 className="font-bold text-lg">AI Copilot AKURAT-OBE: {title}</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instruksi / Prompt untuk AI (Sesuaikan dengan kebutuhan Prodi Unpatti):
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-sm"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition shadow-md disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Menyusun Dokumen OBE Berdasarkan Standar Unpatti...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Generate dengan AI Copilot</span>
              </>
            )}
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">Hasil Generate AI:</label>
              <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl text-gray-800 text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                {result}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 text-sm font-medium"
          >
            Batal
          </button>
          {result && (
            <button
              onClick={() => {
                onApply(result);
                onClose();
              }}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium shadow-md"
            >
              Gunakan / Simpan ke Kurikulum
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
