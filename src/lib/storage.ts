import { supabase } from './supabaseClient';

export async function uploadFaceImage(userId: string, file: File) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/face.${fileExt}`;
    const { error } = await supabase.storage
      .from('faces')
      .upload(fileName, file, {
        upsert: true,
        contentType: file.type
      });

    if (error) throw error;
    
    const { data } = supabase.storage
      .from('faces')
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading face image:', error);
    throw error;
  }
}

export async function getFaceImage(userId: string) {
  try {
    const { data, error } = await supabase.storage
      .from('faces')
      .list(`${userId}`);

    if (error) throw error;
    
    if (data && data.length > 0) {
      const { data: urlData } = supabase.storage
        .from('faces')
        .getPublicUrl(`${userId}/${data[0].name}`);
      return urlData.publicUrl;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting face image:', error);
    throw error;
  }
}