import getCoordinatesForGraphEntry from './getCoordinatesForGraphEntry';
import getGraphEntryByCoordinates from './getGraphEntryByCoordinates';
import type GraphEntry from './GraphEntry';

type Input = {
  graphEntries: GraphEntry[],
  graphEntry: GraphEntry,
  numberOfDisplayedColumns: number,
};

const getGraphEntryNeighbors = ({
  graphEntries,
  graphEntry,
  numberOfDisplayedColumns,
}: Input) => {
  const coorindates = getCoordinatesForGraphEntry({
    graphEntries,
    graphEntry,
    numberOfDisplayedColumns,
  });

  const result = {
    bottom: getGraphEntryByCoordinates({
      graphEntries,
      numberOfDisplayedColumns,
      x: coorindates.x,
      y: coorindates.y + 1,
    }),
    left: getGraphEntryByCoordinates({
      graphEntries,
      numberOfDisplayedColumns,
      x: coorindates.x - 1,
      y: coorindates.y,
    }),
    right: getGraphEntryByCoordinates({
      graphEntries,
      numberOfDisplayedColumns,
      x: coorindates.x + 1,
      y: coorindates.y,
    }),
    top: getGraphEntryByCoordinates({
      graphEntries,
      numberOfDisplayedColumns,
      x: coorindates.x,
      y: coorindates.y - 1,
    }),
  };

  return result;
};

export default getGraphEntryNeighbors;
