import React, { useState } from 'react';
import { UploadCloud, File, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function PrescriptionUploadZone() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className={`relative border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-colors duration-300 ${
              dragActive ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
            }`}
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
          >
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              onChange={handleChange}
              accept="image/*,.pdf"
            />
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${dragActive ? 'bg-orange-100 text-orange-600' : 'bg-white border border-slate-200 text-slate-400'}`}>
              <UploadCloud className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">Upload Prescription</h3>
            <p className="text-sm text-slate-500 max-w-sm">Drag and drop your document here, or click to browse. Supported formats: JPG, PNG, PDF.</p>
          </motion.div>
        ) : (
          <motion.div
            key="file"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="p-4 rounded-2xl border border-orange-200 bg-white shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <File className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="font-medium text-slate-900 truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3 h-3 text-orange-500" /> Ready for review
                </p>
              </div>
            </div>
            <button 
              onClick={() => setFile(null)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
