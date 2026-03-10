import moment from 'moment';
import { createContext } from 'react';
import type PosterData from '~/data/PosterData';
import type ZoomLevel from './ZoomLevel';

export type ContextValue = {
  isSelecting: boolean;
  numberOfDisplayedColumns: number | null;
  value: PosterData;
  setValue: (newValue: PosterData) => void;
  setIsSelecting: (newIsSelecting: boolean) => void;
  setNumberOfDisplayedColumns: (newNumberOfDisplayedColumns: number | null) => void;
  zoomLevel: ZoomLevel;
};

const defaultValue: ContextValue = {
  isSelecting: false,
  numberOfDisplayedColumns: null,
  value: {
    birthday: moment(),
    graphData: [],
    name: '',
    selection: null
  },
  setNumberOfDisplayedColumns:  () => {
    throw new Error('not implemented.');
  },
  setValue: () => {
    throw new Error('not implemented.');
  },
  setIsSelecting: () => {
    throw new Error('not implemented.');
  },
  zoomLevel: 'extra-small',
};

const posterContext = createContext<ContextValue>(defaultValue);

export default posterContext;
