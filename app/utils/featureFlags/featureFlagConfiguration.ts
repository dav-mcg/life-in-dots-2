import type FeatureFlagName from './FeatureFlagName';
import type FeatureFlagValues from './FeatureFlagValues';

export const featureFlagNames = [
  'Outline Highlight',
  'Sparkles',
  'Show Birthday Day Of Week',
] as const;

export const featureFlagDefaultValues: FeatureFlagValues = {
  'Outline Highlight': false,
  'Sparkles': false,
  'Show Birthday Day Of Week': true,
};

type FeatureFlagConfiguration = {
    defaultValue: boolean;
    name: FeatureFlagName;
    overriddenValue: boolean | null;
    value: boolean;
  };

export {
  type FeatureFlagConfiguration as default
};
