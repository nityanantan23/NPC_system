import { createSelector } from 'reselect';

const selectRaw = (state) => state.patients.view;
const selectRawTreatment = (state) => state.treatment.view;
const selectRawVitalSigns = (state) => state.vitalSign.view;


const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectRecordTreatment = createSelector(
  [selectRawTreatment],
  (raw) => raw.record,
);

const selectRecordVitalSign = createSelector(
  [selectRawVitalSigns],
  (raw) => raw.record,
);


const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const patientsViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
  selectRawTreatment,
  selectRawVitalSigns,
  selectRecordTreatment,
  selectRecordVitalSign
};

export default patientsViewSelectors;
