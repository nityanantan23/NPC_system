import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/vitalSign/importer/vitalSignImporterSelectors';
import VitalSignService from 'src/modules/vitalSign/vitalSignService';
import fields from 'src/modules/vitalSign/importer/vitalSignImporterFields';
import { i18n } from 'src/i18n';

const vitalSignImporterActions = importerActions(
  'VITALSIGN_IMPORTER',
  selectors,
  VitalSignService.import,
  fields,
  i18n('entities.vitalSign.importer.fileName'),
);

export default vitalSignImporterActions;