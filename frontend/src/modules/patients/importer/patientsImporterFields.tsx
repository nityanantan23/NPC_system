import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import moment from 'moment';

export default [
  {
    name: 'patientID',
    label: i18n('entities.patients.fields.patientID'),
    schema: schemas.string(
      i18n('entities.patients.fields.patientID'),
      {},
    ),
  },
  {
    name: 'name',
    label: i18n('entities.patients.fields.name'),
    schema: schemas.string(
      i18n('entities.patients.fields.name'),
      {
        "required": true,
        "min": 2,
        "max": 255
      },
    ),
  },
  {
    name: 'dob',
    label: i18n('entities.patients.fields.dob'),
    schema: schemas.date(
      i18n('entities.patients.fields.dob'),
      {},
    ),
   render: (value) => value && value instanceof Date ? moment(value).format('YYYY-MM-DD') : value,
  },
  {
    name: 'sex',
    label: i18n('entities.patients.fields.sex'),
    schema: schemas.string(
      i18n('entities.patients.fields.sex'),
      {},
    ),
  },
  {
    name: 'ageAtPositive',
    label: i18n('entities.patients.fields.ageAtPositive'),
    schema: schemas.string(
      i18n('entities.patients.fields.ageAtPositive'),
      {},
    ),
  },
  {
    name: 'ageAtLastStatusUpdate',
    label: i18n('entities.patients.fields.ageAtLastStatusUpdate'),
    schema: schemas.string(
      i18n('entities.patients.fields.ageAtLastStatusUpdate'),
      {},
    ),
  },
  {
    name: 'state',
    label: i18n('entities.patients.fields.state'),
    schema: schemas.string(
      i18n('entities.patients.fields.state'),
      {},
    ),
  },
  {
    name: 'occupation',
    label: i18n('entities.patients.fields.occupation'),
    schema: schemas.string(
      i18n('entities.patients.fields.occupation'),
      {},
    ),
  },
  {
    name: 'status',
    label: i18n('entities.patients.fields.status'),
    schema: schemas.string(
      i18n('entities.patients.fields.status'),
      {},
    ),
  },
  {
    name: 'statusDate',
    label: i18n('entities.patients.fields.statusDate'),
    schema: schemas.date(
      i18n('entities.patients.fields.statusDate'),
      {},
    ),
   render: (value) => value && value instanceof Date ? moment(value).format('YYYY-MM-DD') : value,
  },
  {
    name: 'hospital',
    label: i18n('entities.patients.fields.hospital'),
    schema: schemas.string(
      i18n('entities.patients.fields.hospital'),
      {},
    ),
  },
  {
    name: 'smoking',
    label: i18n('entities.patients.fields.smoking'),
    schema: schemas.string(
      i18n('entities.patients.fields.smoking'),
      {},
    ),
  },
  {
    name: 'alcohol',
    label: i18n('entities.patients.fields.alcohol'),
    schema: schemas.string(
      i18n('entities.patients.fields.alcohol'),
      {},
    ),
  },
  {
    name: 'diabetes',
    label: i18n('entities.patients.fields.diabetes'),
    schema: schemas.string(
      i18n('entities.patients.fields.diabetes'),
      {},
    ),
  },
  {
    name: 'hypertension',
    label: i18n('entities.patients.fields.hypertension'),
    schema: schemas.string(
      i18n('entities.patients.fields.hypertension'),
      {},
    ),
  },
  {
    name: 'otherCancer',
    label: i18n('entities.patients.fields.otherCancer'),
    schema: schemas.string(
      i18n('entities.patients.fields.otherCancer'),
      {},
    ),
  },
  {
    name: 'familyCancer',
    label: i18n('entities.patients.fields.familyCancer'),
    schema: schemas.string(
      i18n('entities.patients.fields.familyCancer'),
      {},
    ),
  },
  {
    name: 'eNT1stVisit',
    label: i18n('entities.patients.fields.eNT1stVisit'),
    schema: schemas.date(
      i18n('entities.patients.fields.eNT1stVisit'),
      {},
    ),
   render: (value) => value && value instanceof Date ? moment(value).format('YYYY-MM-DD') : value,
  },
  {
    name: 'onco1stVisit',
    label: i18n('entities.patients.fields.onco1stVisit'),
    schema: schemas.date(
      i18n('entities.patients.fields.onco1stVisit'),
      {},
    ),
   render: (value) => value && value instanceof Date ? moment(value).format('YYYY-MM-DD') : value,
  },
  {
    name: 'stage',
    label: i18n('entities.patients.fields.stage'),
    schema: schemas.string(
      i18n('entities.patients.fields.stage'),
      {},
    ),
  },
  {
    name: 'ethnicity',
    label: i18n('entities.patients.fields.ethnicity'),
    schema: schemas.string(
      i18n('entities.patients.fields.ethnicity'),
      {},
    ),
  },
  {
    name: 'npc',
    label: i18n('entities.patients.fields.npc'),
    schema: schemas.string(
      i18n('entities.patients.fields.npc'),
      {},
    ),
  },
  {
    name: 'firstPositiveBiopsyInHPE',
    label: i18n('entities.patients.fields.firstPositiveBiopsyInHPE'),
    schema: schemas.string(
      i18n('entities.patients.fields.firstPositiveBiopsyInHPE'),
      {},
    ),
  },
  {
    name: 'firstPositiveBiopsyDate',
    label: i18n('entities.patients.fields.firstPositiveBiopsyDate'),
    schema: schemas.date(
      i18n('entities.patients.fields.firstPositiveBiopsyDate'),
      {},
    ),
   render: (value) => value && value instanceof Date ? moment(value).format('YYYY-MM-DD') : value,
  },
  {
    name: 'wHOGrade',
    label: i18n('entities.patients.fields.wHOGrade'),
    schema: schemas.string(
      i18n('entities.patients.fields.wHOGrade'),
      {},
    ),
  },
  {
    name: 'surgeriesCount',
    label: i18n('entities.patients.fields.surgeriesCount'),
    schema: schemas.string(
      i18n('entities.patients.fields.surgeriesCount'),
      {},
    ),
  },
  {
    name: 'criticalLevel',
    label: i18n('entities.patients.fields.criticalLevel'),
    schema: schemas.string(
      i18n('entities.patients.fields.criticalLevel'),
      {},
    ),
  },
  {
    name: 'recurrence',
    label: i18n('entities.patients.fields.recurrence'),
    schema: schemas.string(
      i18n('entities.patients.fields.recurrence'),
      {},
    ),
  },
];