import { useRef, useCallback } from 'react';
import * as faceapi from 'face-api.js';

interface FaceCaptureProps {
  onCapture: (imageBlob: Blob) => void;
  error?: string;
}

export default function FaceCapture({ onCapture, error }: FaceCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startVideo = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Failed to access camera:', err);
    }
  }, []);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    try {
      const detections = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (!detections) {
        throw new Error('No face detected');
      }

      // Draw face on canvas
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          onCapture(blob);
        }
      }, 'image/jpeg', 0.95);
    } catch (err) {
      console.error('Face capture error:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          autoPlay
          muted
          onPlay={startVideo}
          className="w-full rounded-lg"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 hidden"
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
      <button
        onClick={handleCapture}
        className="w-full py-2 px-4 bg-[#6CBF41] text-white rounded-lg hover:bg-[#5ba936] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6CBF41]"
      >
        Capture Face
      </button>
    </div>
  );
}