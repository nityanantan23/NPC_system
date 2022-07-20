import { createSelector } from 'reselect';

const selectRaw = (state) => state.treatment.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const treatmentViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default treatmentViewSelectors;
