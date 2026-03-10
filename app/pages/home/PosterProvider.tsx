import { useMemo, type ReactNode } from 'react';
import posterContext, { type ContextValue } from './posterContext';
import type PosterData from '~/data/PosterData';
import type ZoomLevel from './ZoomLevel';

type Props = {
  children: ReactNode;
  isSelecting: boolean;
  numberOfDisplayedColumns: number | null;
  onChange: (newValue: PosterData) => void;
  onChangeIsSelecting: (newIsSelecting: boolean) => void;
  onChangeNumberOfDisplayedColumns: (newNumberOfDisplayedColumns: number | null) => void;
  value: PosterData;
  zoomLevel: ZoomLevel;
};

const PosterProvider = ({
  children,
  isSelecting,
  numberOfDisplayedColumns,
  onChange,
  onChangeIsSelecting,
  onChangeNumberOfDisplayedColumns,
  value,
  zoomLevel
}: Props) => {

  const contextValue = useMemo(() => {
    const result: ContextValue = {
      isSelecting,
      numberOfDisplayedColumns,
      value,
      setValue: onChange,
      setIsSelecting: onChangeIsSelecting,
      setNumberOfDisplayedColumns: onChangeNumberOfDisplayedColumns,
      zoomLevel,
    };

    return result;
  }, [
    isSelecting,
    numberOfDisplayedColumns,
    onChange,
    onChangeIsSelecting,
    onChangeNumberOfDisplayedColumns,
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
