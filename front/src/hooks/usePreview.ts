import { ChangeEvent, useState } from 'react';
import useSetAlert from './useSetAlert';
import imageResize from '../util/imageResize';
import { IMAGE_FORMAT } from '../constants/recipeForm';

const usePreview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAlertError } = useSetAlert();

  const createPreview = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (e.target.files && e.target.files instanceof FileList) {
      const uploadImage = e.target.files[0];
      if (!uploadImage) {
        setIsLoading(false);
        return;
      } else if (IMAGE_FORMAT.includes(uploadImage.type)) {
        const compressedImage = await imageResize(uploadImage);
        const previewUrl = URL.createObjectURL(compressedImage);
        setIsLoading(false);
        return previewUrl;
      } else {
        setAlertError({ error: 'JPEG, PNG 형식의 이미지를 등록해주세요.' });
      }
    }
    setIsLoading(false);
  };

  return { isLoading, createPreview };
};

export default usePreview;
