'use client';

import { useState } from 'react';
import { Upload, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminMediaPage() {
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'product-1.jpg', url: '/img/placeholder.jpg', type: 'image' },
    { id: 2, name: 'event-banner.png', url: '/img/placeholder.jpg', type: 'image' },
  ]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    // Simulate upload
    const newFiles = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'file'
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    toast.success(`${files.length} file(s) uploaded successfully`);
  };

  const handleDelete = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
    toast.success('File deleted successfully');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white font-outfit">Media Library</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your product images and assets</p>
        </div>
        <label className="flex items-center gap-3 px-6 py-3 bg-brand-blue text-white rounded-xl cursor-pointer hover:bg-brand-blue/90 transition-colors">
          <Upload size={18} />
          <span className="font-bold">Upload Files</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {uploadedFiles.map((file) => (
          <div key={file.id} className="bg-white/5 border border-white/10 rounded-xl p-4 group hover:border-brand-blue/30 transition-all duration-300">
            <div className="aspect-square bg-white/5 rounded-lg mb-3 overflow-hidden relative">
              {file.type === 'image' ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={48} className="text-gray-500" />
                </div>
              )}
              <button
                onClick={() => handleDelete(file.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} className="text-white" />
              </button>
            </div>
            <p className="text-sm text-white font-medium truncate">{file.name}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{file.type}</p>
          </div>
        ))}
      </div>

      {uploadedFiles.length === 0 && (
        <div className="text-center py-16">
          <ImageIcon size={64} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No media files yet</h3>
          <p className="text-gray-500">Upload your first images to get started</p>
        </div>
      )}
    </div>
  );
}