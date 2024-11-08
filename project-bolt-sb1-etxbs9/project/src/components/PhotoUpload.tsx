import React, { useRef } from 'react';
import { Camera, Image as ImageIcon, Upload } from 'lucide-react';

interface PhotoUploadProps {
  photo: string | null;
  setPhoto: (photo: string | null) => void;
}

export default function PhotoUpload({ photo, setPhoto }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      
      video.srcObject = stream;
      await video.play();
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);
      
      const photoData = canvas.toDataURL('image/jpeg');
      setPhoto(photoData);
      
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Upload className="w-5 h-5" />
          <span>Upload Photo</span>
        </button>
        <button
          onClick={handleCameraCapture}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Camera className="w-5 h-5" />
          <span>Take Photo</span>
        </button>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {photo ? (
        <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={photo}
            alt="Complaint evidence"
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setPhoto(null)}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
          <ImageIcon className="w-12 h-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">No photo uploaded yet</p>
        </div>
      )}
    </div>
  );
}