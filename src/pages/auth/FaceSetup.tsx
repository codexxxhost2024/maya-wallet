import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import AuthLayout from '../../components/auth/AuthLayout';
import SubmitButton from '../../components/auth/SubmitButton';

export default function FaceSetup() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [capturing, setCapturing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ]);
        
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to access camera');
        setLoading(false);
      }
    };

    loadModels();
  }, []);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setCapturing(true);
    try {
      const detections = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (!detections) {
        throw new Error('No face detected');
      }

      // Store face descriptor
      const descriptor = detections.descriptor;
      localStorage.setItem('faceDescriptor', JSON.stringify(Array.from(descriptor)));
      
      // Proceed to PIN setup
      navigate('/auth/pin-setup');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCapturing(false);
    }
  };

  return (
    <AuthLayout title="Face Recognition Setup">
      <div className="space-y-6">
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full rounded-lg"
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <SubmitButton
          loading={loading || capturing}
          loadingText={loading ? "Loading camera..." : "Capturing..."}
          text="Capture Face"
          onClick={handleCapture}
          disabled={loading}
        />
      </div>
    </AuthLayout>
  );
}