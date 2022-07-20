import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.treatment.fields.id'),
  },
  {
    name: 'patientID',
    label: i18n('entities.treatment.fields.patientID'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'rTTreatmentIntent',
    label: i18n('entities.treatment.fields.rTTreatmentIntent'),
  },
  {
    name: 'rTModality',
    label: i18n('entities.treatment.fields.rTModality'),
  },
  {
    name: 'rTDoseGY',
    label: i18n('entities.treatment.fields.rTDoseGY'),
  },
  {
    name: 'rTConcurrentChemo',
    label: i18n('entities.treatment.fields.rTConcurrentChemo'),
  },
  {
    name: 'rTFractions',
    label: i18n('entities.treatment.fields.rTFractions'),
  },
  {
    name: 'rTCompletedConcChemoSTD',
    label: i18n('entities.treatment.fields.rTCompletedConcChemoSTD'),
  },
  {
    name: 'rTCompletedSTD',
    label: i18n('entities.treatment.fields.rTCompletedSTD'),
  },
  {
    name: 'rTEndDate',
    label: i18n('entities.treatment.fields.rTEndDate'),
  },
  {
    name: 'rTDuration',
    label: i18n('entities.treatment.fields.rTDuration'),
  },
  {
    name: 'rTStartedAfter',
    label: i18n('entities.treatment.fields.rTStartedAfter'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'cTIntent',
    label: i18n('entities.treatment.fields.cTIntent'),
  },
  {
    name: 'cTDrug',
    label: i18n('entities.treatment.fields.cTDrug'),
  },
  {
    name: 'cTTotalCyclesGiven',
    label: i18n('entities.treatment.fields.cTTotalCyclesGiven'),
  },
  {
    name: 'cTCompletedSTD',
    label: i18n('entities.treatment.fields.cTCompletedSTD'),
  },
  {
    name: 'cTEndDate',
    label: i18n('entities.treatment.fields.cTEndDate'),
  },
  {
    name: 'cTDuration',
    label: i18n('entities.treatment.fields.cTDuration'),
  },
  {
    name: 'cTStartedAfter',
    label: i18n('entities.treatment.fields.cTStartedAfter'),
  },
  {
    name: 'deathDate',
    label: i18n('entities.treatment.fields.deathDate'),
  },
  {
    name: 'daysRTEndUntillDeath',
    label: i18n('entities.treatment.fields.daysRTEndUntillDeath'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.treatment.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.treatment.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
