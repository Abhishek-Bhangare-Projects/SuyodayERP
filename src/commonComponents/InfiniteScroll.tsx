import React, { useEffect, useRef } from 'react';
import MuiBox from '../muiComponents/MuiBox';
import MuiLoader from '../muiComponents/MuiLoader';
import Typography from '@mui/material/Typography';

export interface InfiniteScrollProps {
  children: React.ReactNode;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  hasMore,
  isLoading,
  onLoadMore,
  loader,
  endMessage,
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, onLoadMore]);

  return (
    <MuiBox>
      {children}
      <div ref={observerTarget} style={{ height: 20, margin: '10px 0' }} />
      {isLoading && (
        <MuiBox sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
          {loader || <MuiLoader size={24} />}
        </MuiBox>
      )}
      {!hasMore && endMessage && (
        <MuiBox sx={{ py: 2, textAlign: 'center' }}>
          {endMessage || (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              No more records to load
            </Typography>
          )}
        </MuiBox>
      )}
    </MuiBox>
  );
};

export default InfiniteScroll;
