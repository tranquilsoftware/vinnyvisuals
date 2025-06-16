import { useState, useEffect, useCallback } from 'react';

export const useInfiniteScroll = (
  loadMore: () => Promise<any>,
  hasMore: boolean,
  isLoading: boolean
) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (isLoading || isFetching || !hasMore) return;

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.offsetHeight;
    const scrollThreshold = 26; // Pixels from bottom to trigger load more

    if (scrollTop + windowHeight + scrollThreshold > docHeight) {
      setIsFetching(true);
      loadMore().finally(() => {
        setIsFetching(false);
      });
    }
  }, [isLoading, isFetching, hasMore, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { isFetching };
};