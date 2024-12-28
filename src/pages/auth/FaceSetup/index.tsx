import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import { uploadFaceImage } from '../../../lib/storage';
import AuthLayout from '../../../components/auth/AuthLayout';
import FaceCapture from './FaceCapture';

export default function FaceSetup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCapture = async (imageBlob: Blob) => {
    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const file = new File([imageBlob], 'face.jpg', { type: 'image/jpeg' });
      const imageUrl = await uploadFaceImage(user.id, file);

      // Update user profile with face image URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ face_image_url: imageUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      navigate('/auth/pin-setup');
    } catch (err: any) {
      console.error('Face setup error:', err);
      setError('Failed to save face image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Face Recognition Setup">
      <div className="space-y-6">
        <p className="text-sm text-gray-600 text-center mb-4">
          Position your face in the frame and ensure good lighting
        </p>
        <FaceCapture
          onCapture={handleCapture}
          error={error}
        />
      </div>
    </AuthLayout>
  );
}