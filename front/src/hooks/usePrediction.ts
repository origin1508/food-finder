import { useMutation } from 'react-query';
import useSetAlert from './useSetAlert';
import useSearchForm from './useSearchForm';
import { getPrediction } from '../api/predictionFetcher';
import imageResize from '../util/imageResize';
import { AxiosError } from 'axios';

const usePrediction = () => {
  const { setAlertError, setAlertSuccess } = useSetAlert();
  const { recipeSearch } = useSearchForm();
  const imagePrediction = async (data: { imageSearchFile: File[] }) => {
    const { imageSearchFile } = data;
    const image = imageSearchFile[0];
    const compressedImage = await imageResize(image);
    const formData = new FormData();
    formData.append('image', compressedImage);
    const res = await getPrediction(formData);
    return res;
  };

  const predictionMutation = useMutation(imagePrediction, {
    onSuccess: async (data) => {
      const { success, result } = data;
      if (success) {
        setAlertSuccess({ success: `음식추론 완료: ${result}` });
        await recipeSearch(result);
      } else {
        setAlertError({ error: '이미지 검색에 실패하였습니다.' });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setAlertError({ error: error.message });
      } else {
        console.log(error);
      }
    },
  });
  return predictionMutation;
};

export default usePrediction;
