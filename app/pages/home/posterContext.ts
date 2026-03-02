import moment from 'moment';
import { createContext } from 'react';
import type PosterData from '~/data/PosterData';
import type ZoomLevel from './ZoomLevel';

export type ContextValue = {
  isSelecting: boolean;
  value: PosterData;
  setValue: (newValue: PosterData) => void;
  setIsSelecting: (newIsSelecting: boolean) => void;
  zoomLevel: ZoomLevel;
};

const defaultValue: ContextValue = {
  isSelecting: false,
  value: {
    birthday: moment(),
    graphData: [],
    name: '',
    selection: null
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
