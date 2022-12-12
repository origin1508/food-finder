import { ChangeEvent, useState } from 'react';
import imageResize from '../util/imageResize';

const usePreview = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createPreview = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (e.target.files && e.target.files instanceof FileList) {
      const uploadImage = e.target.files[0];
      if (!uploadImage) {
        setIsLoading(false);
        return;
      } else if (['image/jpeg', 'image/png'].includes(uploadImage.type)) {
        const compressedImage = await imageResize(uploadImage);
        const previewUrl = URL.createObjectURL(compressedImage);
        setIsLoading(false);
        return previewUrl;
      }
    }
    setIsLoading(false);
  };

  return { isLoading, createPreview };
};

export default usePreview;
