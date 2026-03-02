import { useMemo, type ReactNode } from 'react';
import posterContext, { type ContextValue } from './posterContext';
import type PosterData from '~/data/PosterData';
import type ZoomLevel from './ZoomLevel';

type Props = {
  children: ReactNode;
  isSelecting: boolean;
  onChange: (newValue: PosterData) => void;
  onChangeIsSelecting: (newIsSelecting: boolean) => void;
  value: PosterData;
  zoomLevel: ZoomLevel;
};

const PosterProvider = ({
  children,
  isSelecting,
  onChange,
  onChangeIsSelecting,
  value,
  zoomLevel
}: Props) => {

  const contextValue = useMemo(() => {
    const result: ContextValue = {
      isSelecting,
      value,
      setValue: onChange,
      setIsSelecting: onChangeIsSelecting,
      zoomLevel,
    };

    return result;
  }, [
    isSelecting,
    onChange,
    onChangeIsSelecting,
    value,
    zoomLevel,
  ]);

  return (
    <posterContext.Provider value={contextValue}>
      {children}
    </posterContext.Provider>
  );

};

export default PosterProvider;
