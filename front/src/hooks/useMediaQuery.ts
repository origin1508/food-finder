import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const getMatches = () => matchMedia(query).matches;
  const [matches, setMatches] = useState(getMatches());
  const handleChange = () => {
    setMatches(getMatches());
  };
  useEffect(() => {
    const mediaQuery = matchMedia(query);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  });
  return matches;
};

export default useMediaQuery;
