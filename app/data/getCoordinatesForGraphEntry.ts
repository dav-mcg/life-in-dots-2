import type GraphEntry from './GraphEntry';

type Input = {
  graphEntries: GraphEntry[],
  graphEntry: GraphEntry,
  numberOfDisplayedColumns: number ,
};

const getCoordinatesForGraphEntry = ({
  graphEntries,
  graphEntry,
  numberOfDisplayedColumns,
}: Input) => {
  const index = graphEntries.indexOf(graphEntry);

  if (index < 0) {
    throw new Error('could not find index of graph entry');
  }

  const x = index % numberOfDisplayedColumns;
  const y = Math.floor(index / numberOfDisplayedColumns);
  const result = {
    x,
    y,
  };

  return result;
};

export default getCoordinatesForGraphEntry;
