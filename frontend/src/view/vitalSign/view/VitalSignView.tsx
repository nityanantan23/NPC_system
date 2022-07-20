import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import PatientsViewItem from 'src/view/patients/view/PatientsViewItem';

const VitalSignView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.patientID) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.vitalSign.fields.patientID')}
          >
            <PatientsViewItem value={record.patientID} />
          </Form.Item>
        )}

      {(Boolean(record.averageSPO2) ||
        record.averageSPO2 === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.vitalSign.fields.averageSPO2')}
          >
            {record.averageSPO2}
          </Form.Item>
        )}

      {(Boolean(record.averageRestingHeartRate) ||
        record.averageRestingHeartRate === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.vitalSign.fields.averageRestingHeartRate')}
          >
            {record.averageRestingHeartRate}
          </Form.Item>
        )}

      {(Boolean(record.averageStepCount) ||
        record.averageStepCount === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.vitalSign.fields.averageStepCount')}
          >
            {record.averageStepCount}
          </Form.Item>
        )}

      {(Boolean(record.averageBPSystolic) ||
        record.averageBPSystolic === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.vitalSign.fields.averageBPSystolic')}
          >
            {record.averageBPSystolic}
          </Form.Item>
        )}
    </ViewWrapper>
  );
};

export default VitalSignView;
