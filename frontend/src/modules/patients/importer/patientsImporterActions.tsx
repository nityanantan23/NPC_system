import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/patients/importer/patientsImporterSelectors';
import PatientsService from 'src/modules/patients/patientsService';
import fields from 'src/modules/patients/importer/patientsImporterFields';
import { i18n } from 'src/i18n';

const patientsImporterActions = importerActions(
  'PATIENTS_IMPORTER',
  selectors,
  PatientsService.import,
  fields,
  i18n('entities.patients.importer.fileName'),
);

export default patientsImporterActions;