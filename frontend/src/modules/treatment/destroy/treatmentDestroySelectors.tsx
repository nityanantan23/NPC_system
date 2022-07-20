import { createSelector } from 'reselect';

const selectRaw = (state) => state.treatment.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const treatmentDestroySelectors = {
  selectLoading,
};

export default treatmentDestroySelectors;
