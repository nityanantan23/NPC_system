import { createSelector } from 'reselect';

const selectRaw = (state) => state.vitalSign.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const vitalSignDestroySelectors = {
  selectLoading,
};

export default vitalSignDestroySelectors;
