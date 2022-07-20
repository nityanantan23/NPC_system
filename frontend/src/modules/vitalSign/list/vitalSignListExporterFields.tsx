import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.vitalSign.fields.id'),
  },
  {
    name: 'patientID',
    label: i18n('entities.vitalSign.fields.patientID'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'averageSPO2',
    label: i18n('entities.vitalSign.fields.averageSPO2'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'averageRestingHeartRate',
    label: i18n('entities.vitalSign.fields.averageRestingHeartRate'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'averageStepCount',
    label: i18n('entities.vitalSign.fields.averageStepCount'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'averageBPSystolic',
    label: i18n('entities.vitalSign.fields.averageBPSystolic'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.vitalSign.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.vitalSign.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
