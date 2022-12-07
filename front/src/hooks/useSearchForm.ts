import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import useSetAlert from './useSetAlert';
import { searchResultState } from '../atom/searchResult';
import { searchKeywordRequest } from '../api/recipeFetcher';
import { SearchValue } from '../types/search/searchType';

const useSearchForm = () => {
  const navigate = useNavigate();
  const [, setSearchResult] = useRecoilState(searchResultState);
  const { setAlertError, setAlertSuccess } = useSetAlert();
  const { register, reset, handleSubmit } = useForm<SearchValue>({
    mode: 'onChange',
    defaultValues: {
      keyword: '',
    },
  });

  const handleRecipeSearch = handleSubmit(async (data) => {
    const { keyword } = data;
    const res = await searchKeywordRequest(keyword);
    if (!res.success || res.result.length === 0) {
      setAlertError({ error: '검색 결과가 존재하지 않습니다.' });
    } else {
      const { result, message } = res;
      setAlertSuccess({ success: message });
      setSearchResult(result);
      navigate({ pathname: '/search', search: `keyword=${keyword}` });
    }
  });

  const recipeSearch = async (keyword: string) => {
    const res = await searchKeywordRequest(keyword);
    if (!res.success || res.result.length === 0) {
      setAlertError({ error: '검색 결과가 존재하지 않습니다.' });
    } else {
      const { result, message } = res;
      setAlertSuccess({ success: message });
      setSearchResult(result);
    }
  };
  return {
    register,
    reset,
    handleSubmit,
    handleRecipeSearch,
    recipeSearch,
  };
};

export default useSearchForm;
