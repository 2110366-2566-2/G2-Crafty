import { useEffect } from 'react';
import searchStore from './stores/search';

const useEnableSearchOnNavbar = () => {
  const { setEnableSearch } = searchStore();

  useEffect(() => {
    setEnableSearch(true);
  }, [setEnableSearch]);
};

const useDisableSearchOnNavbar = () => {
  const { setEnableSearch } = searchStore();

  useEffect(() => {
    setEnableSearch(false);
  }, [setEnableSearch]);
};

export { useEnableSearchOnNavbar, useDisableSearchOnNavbar };
