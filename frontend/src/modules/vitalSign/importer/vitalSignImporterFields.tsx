import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'patientID',
    label: i18n('entities.vitalSign.fields.patientID'),
    schema: schemas.relationToOne(
      i18n('entities.vitalSign.fields.patientID'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'averageSPO2',
    label: i18n('entities.vitalSign.fields.averageSPO2'),
    schema: schemas.decimal(
      i18n('entities.vitalSign.fields.averageSPO2'),
      {},
    ),
  },
  {
    name: 'averageRestingHeartRate',
    label: i18n('entities.vitalSign.fields.averageRestingHeartRate'),
    schema: schemas.decimal(
      i18n('entities.vitalSign.fields.averageRestingHeartRate'),
      {},
    ),
  },
  {
    name: 'averageStepCount',
    label: i18n('entities.vitalSign.fields.averageStepCount'),
    schema: schemas.decimal(
      i18n('entities.vitalSign.fields.averageStepCount'),
      {},
    ),
  },
  {
    name: 'averageBPSystolic',
    label: i18n('entities.vitalSign.fields.averageBPSystolic'),
    schema: schemas.decimal(
      i18n('entities.vitalSign.fields.averageBPSystolic'),
      {},
    ),
  },
];