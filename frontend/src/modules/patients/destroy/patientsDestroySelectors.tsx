import { createSelector } from 'reselect';

const selectRaw = (state) => state.patients.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const patientsDestroySelectors = {
  selectLoading,
};

export default patientsDestroySelectors;
