import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useSetAlert from './useSetAlert';
import { searchKeywordRequest } from '../api/recipeFetcher';
import { SearchValue } from '../types/search/searchType';

const useSearchForm = () => {
  const navigate = useNavigate();
  const { setAlertError } = useSetAlert();
  const { register, reset, handleSubmit } = useForm<SearchValue>({
    mode: 'onChange',
    defaultValues: {
      keyword: '',
    },
  });
  const handleRecipeSearch = handleSubmit(async (data) => {
    const { keyword } = data;
    const res = await searchKeywordRequest(keyword);
    console.log(res);
    if (!res.success || res.result.length === 0) {
      setAlertError({ error: '검색 결과가 존재하지 않습니다.' });
    } else {
      navigate(`/search/${keyword}`);
    }
  });

  return { register, reset, handleSubmit, handleRecipeSearch };
};

export default useSearchForm;
