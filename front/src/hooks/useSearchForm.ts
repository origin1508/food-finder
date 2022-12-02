import { useForm } from 'react-hook-form';
import { SearchValue } from '../types/search/searchType';

const useSearchForm = () => {
  const { register, handleSubmit } = useForm<SearchValue>({
    mode: 'onChange',
    defaultValues: {
      keyword: '',
    },
  });

  return { register, handleSubmit };
};

export default useSearchForm;
