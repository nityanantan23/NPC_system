import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.patients.fields.id'),
  },
  {
    name: 'patientID',
    label: i18n('entities.patients.fields.patientID'),
  },
  {
    name: 'name',
    label: i18n('entities.patients.fields.name'),
  },
  {
    name: 'dob',
    label: i18n('entities.patients.fields.dob'),
  },
  {
    name: 'sex',
    label: i18n('entities.patients.fields.sex'),
  },
  {
    name: 'ageAtPositive',
    label: i18n('entities.patients.fields.ageAtPositive'),
  },
  {
    name: 'ageAtLastStatusUpdate',
    label: i18n('entities.patients.fields.ageAtLastStatusUpdate'),
  },
  {
    name: 'state',
    label: i18n('entities.patients.fields.state'),
  },
  {
    name: 'occupation',
    label: i18n('entities.patients.fields.occupation'),
  },
  {
    name: 'status',
    label: i18n('entities.patients.fields.status'),
  },
  {
    name: 'statusDate',
    label: i18n('entities.patients.fields.statusDate'),
  },
  {
    name: 'hospital',
    label: i18n('entities.patients.fields.hospital'),
  },
  {
    name: 'smoking',
    label: i18n('entities.patients.fields.smoking'),
  },
  {
    name: 'alcohol',
    label: i18n('entities.patients.fields.alcohol'),
  },
  {
    name: 'diabetes',
    label: i18n('entities.patients.fields.diabetes'),
  },
  {
    name: 'hypertension',
    label: i18n('entities.patients.fields.hypertension'),
  },
  {
    name: 'otherCancer',
    label: i18n('entities.patients.fields.otherCancer'),
  },
  {
    name: 'familyCancer',
    label: i18n('entities.patients.fields.familyCancer'),
  },
  {
    name: 'eNT1stVisit',
    label: i18n('entities.patients.fields.eNT1stVisit'),
  },
  {
    name: 'onco1stVisit',
    label: i18n('entities.patients.fields.onco1stVisit'),
  },
  {
    name: 'stage',
    label: i18n('entities.patients.fields.stage'),
  },
  {
    name: 'ethnicity',
    label: i18n('entities.patients.fields.ethnicity'),
  },
  {
    name: 'npc',
    label: i18n('entities.patients.fields.npc'),
  },
  {
    name: 'firstPositiveBiopsyInHPE',
    label: i18n('entities.patients.fields.firstPositiveBiopsyInHPE'),
  },
  {
    name: 'firstPositiveBiopsyDate',
    label: i18n('entities.patients.fields.firstPositiveBiopsyDate'),
  },
  {
    name: 'wHOGrade',
    label: i18n('entities.patients.fields.wHOGrade'),
  },
  {
    name: 'surgeriesCount',
    label: i18n('entities.patients.fields.surgeriesCount'),
  },
  {
    name: 'criticalLevel',
    label: i18n('entities.patients.fields.criticalLevel'),
  },
  {
    name: 'recurrence',
    label: i18n('entities.patients.fields.recurrence'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.patients.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.patients.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
