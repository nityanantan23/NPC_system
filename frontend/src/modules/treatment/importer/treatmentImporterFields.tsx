import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import moment from 'moment';

export default [
  {
    name: 'patientID',
    label: i18n('entities.treatment.fields.patientID'),
    schema: schemas.relationToOne(
      i18n('entities.treatment.fields.patientID'),
      {},
    ),
  },
  {
    name: 'rTTreatmentIntent',
    label: i18n('entities.treatment.fields.rTTreatmentIntent'),
    schema: schemas.string(
      i18n('entities.treatment.fields.rTTreatmentIntent'),
      {},
    ),
  },
  {
    name: 'rTModality',
    label: i18n('entities.treatment.fields.rTModality'),
    schema: schemas.string(
      i18n('entities.treatment.fields.rTModality'),
      {
        "max": 21845
      },
    ),
  },
  {
    name: 'rTDoseGY',
    label: i18n('entities.treatment.fields.rTDoseGY'),
    schema: schemas.string(
      i18n('entities.treatment.fields.rTDoseGY'),
      {},
    ),
  },
  {
    name: 'rTConcurrentChemo',
    label: i18n('entities.treatment.fields.rTConcurrentChemo'),
    schema: schemas.string(
      i18n('entities.treatment.fields.rTConcurrentChemo'),
      {},
    ),
  },
  {
    name: 'rTFractions',
    label: i18n('entities.treatment.fields.rTFractions'),
    schema: schemas.string(
      i18n('entities.treatment.fields.rTFractions'),
      {},
    ),
  },
  {
    name: 'rTCompletedConcChemoSTD',
    label: i18n('entities.treatment.fields.rTCompletedConcChemoSTD'),
    schema: schemas.string(
      i18n('entities.treatment.fields.rTCompletedConcChemoSTD'),
      {},
    ),
  },
  {
    name: 'rTCompletedSTD',
    label: i18n('entities.treatment.fields.rTCompletedSTD'),
    schema: schemas.string(
      i18n('entities.treatment.fields.rTCompletedSTD'),
      {},
    ),
  },
  {
    name: 'rTEndDate',
    label: i18n('entities.treatment.fields.rTEndDate'),
    schema: schemas.date(
      i18n('entities.treatment.fields.rTEndDate'),
      {},
    ),
   render: (value) => value && value instanceof Date ? moment(value).format('YYYY-MM-DD') : value,
  },
  {
    name: 'rTDuration',
    label: i18n('entities.treatment.fields.rTDuration'),
    schema: schemas.string(
      i18n('entities.treatment.fields.rTDuration'),
      {},
    ),
  },
  {
    name: 'rTStartedAfter',
    label: i18n('entities.treatment.fields.rTStartedAfter'),
    schema: schemas.decimal(
      i18n('entities.treatment.fields.rTStartedAfter'),
      {},
    ),
  },
  {
    name: 'cTIntent',
    label: i18n('entities.treatment.fields.cTIntent'),
    schema: schemas.string(
      i18n('entities.treatment.fields.cTIntent'),
      {},
    ),
  },
  {
    name: 'cTDrug',
    label: i18n('entities.treatment.fields.cTDrug'),
    schema: schemas.string(
      i18n('entities.treatment.fields.cTDrug'),
      {},
    ),
  },
  {
    name: 'cTTotalCyclesGiven',
    label: i18n('entities.treatment.fields.cTTotalCyclesGiven'),
    schema: schemas.string(
      i18n('entities.treatment.fields.cTTotalCyclesGiven'),
      {},
    ),
  },
  {
    name: 'cTCompletedSTD',
    label: i18n('entities.treatment.fields.cTCompletedSTD'),
    schema: schemas.string(
      i18n('entities.treatment.fields.cTCompletedSTD'),
      {},
    ),
  },
  {
    name: 'cTEndDate',
    label: i18n('entities.treatment.fields.cTEndDate'),
    schema: schemas.date(
      i18n('entities.treatment.fields.cTEndDate'),
      {},
    ),
   render: (value) => value && value instanceof Date ? moment(value).format('YYYY-MM-DD') : value,
  },
  {
    name: 'cTDuration',
    label: i18n('entities.treatment.fields.cTDuration'),
    schema: schemas.string(
      i18n('entities.treatment.fields.cTDuration'),
      {},
    ),
  },
  {
    name: 'cTStartedAfter',
    label: i18n('entities.treatment.fields.cTStartedAfter'),
    schema: schemas.string(
      i18n('entities.treatment.fields.cTStartedAfter'),
      {},
    ),
  },
  {
    name: 'deathDate',
    label: i18n('entities.treatment.fields.deathDate'),
    schema: schemas.date(
      i18n('entities.treatment.fields.deathDate'),
      {},
    ),
   render: (value) => value && value instanceof Date ? moment(value).format('YYYY-MM-DD') : value,
  },
  {
    name: 'daysRTEndUntillDeath',
    label: i18n('entities.treatment.fields.daysRTEndUntillDeath'),
    schema: schemas.string(
      i18n('entities.treatment.fields.daysRTEndUntillDeath'),
      {},
    ),
  },
];