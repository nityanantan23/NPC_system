import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/treatment/importer/treatmentImporterSelectors';
import TreatmentService from 'src/modules/treatment/treatmentService';
import fields from 'src/modules/treatment/importer/treatmentImporterFields';
import { i18n } from 'src/i18n';

const treatmentImporterActions = importerActions(
  'TREATMENT_IMPORTER',
  selectors,
  TreatmentService.import,
  fields,
  i18n('entities.treatment.importer.fileName'),
);

export default treatmentImporterActions;