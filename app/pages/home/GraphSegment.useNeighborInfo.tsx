import getGraphEntryNeighbors from '~/data/getGraphEntryNeighbors';
import type GraphEntry from '~/data/GraphEntry';
import useFeatureFlag from '~/utils/featureFlags/useFeatureFlag';
import usePosterContext from './usePosterContext';
import getIsGraphEntrySelected from '~/data/getIsGraphEntrySelected';

const useNeighborInfo = (graphEntry: GraphEntry) => {
  const isHighlightingOutline = useFeatureFlag('Outline Highlight');
  const {
    numberOfDisplayedColumns,
    value: posterValue,
  } = usePosterContext();

  if (!isHighlightingOutline) {
    return null;
  }

  if (!numberOfDisplayedColumns) {
    return null;
  }

  const neighbors = getGraphEntryNeighbors({
    graphEntries: posterValue.graphData,
    graphEntry,
    numberOfDisplayedColumns,
  });
  const result = {
    bottomIsSelected: neighbors.bottom
      ? getIsGraphEntrySelected({
        selection: posterValue.selection,
        graphEntry: neighbors.bottom,
      })
      : false,
    leftIsSelected: neighbors.left
      ? getIsGraphEntrySelected({
        selection: posterValue.selection,
        graphEntry: neighbors.left,
      })
      : false,
    rightIsSelected: neighbors.right
      ? getIsGraphEntrySelected({
        selection: posterValue.selection,
        graphEntry: neighbors.right,
      })
      : false,
    topIsSelected: neighbors.top
      ? getIsGraphEntrySelected({
        selection: posterValue.selection,
        graphEntry: neighbors.top,
      })
      : false,
  };

  return result;
};

export default useNeighborInfo;
