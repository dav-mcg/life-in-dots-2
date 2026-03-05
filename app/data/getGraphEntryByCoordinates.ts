import type GraphEntry from './GraphEntry';

type Input = {
  graphEntries: GraphEntry[],
  numberOfDisplayedColumns: number,
  x: number,
  y: number,
};

const getGraphEntryByCoordinates = ({
  graphEntries,
  numberOfDisplayedColumns,
  x,
  y
}: Input) => {
  if (x < 0 || x >= numberOfDisplayedColumns) {
    return null;
  }

  if ( y < 0) {
    return null;
  }

  const index = (y * numberOfDisplayedColumns) + x;

  if (index >= graphEntries.length) {
    return null;
  }

  const result = graphEntries[index];

  return result;
};

export default getGraphEntryByCoordinates;
