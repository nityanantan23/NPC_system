import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import PatientsViewItem from 'src/view/patients/view/PatientsViewItem';

const TreatmentView = (props) => {
  const { record, loading } = props;
  console.log(
    '🚀 ~ file: TreatmentView.tsx ~ line 12 ~ TreatmentView ~ record',
    record,
  );

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.patientID) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.patientID',
          )}
        >
          <PatientsViewItem value={record.patientID} />
        </Form.Item>
      )}

      {Boolean(record.rTTreatmentIntent) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.rTTreatmentIntent',
          )}
        >
          {record.rTTreatmentIntent}
        </Form.Item>
      )}

      {Boolean(record.rTModality) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.rTModality',
          )}
        >
          {record.rTModality}
        </Form.Item>
      )}

      {Boolean(record.rTDoseGY) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.treatment.fields.rTDoseGY')}
        >
          {record.rTDoseGY}
        </Form.Item>
      )}

      {Boolean(record.rTConcurrentChemo) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.rTConcurrentChemo',
          )}
        >
          {record.rTConcurrentChemo}
        </Form.Item>
      )}

      {Boolean(record.rTFractions) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.rTFractions',
          )}
        >
          {record.rTFractions}
        </Form.Item>
      )}

      {Boolean(record.rTCompletedConcChemoSTD) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.rTCompletedConcChemoSTD',
          )}
        >
          {record.rTCompletedConcChemoSTD}
        </Form.Item>
      )}

      {Boolean(record.rTCompletedSTD) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.rTCompletedSTD',
          )}
        >
          {record.rTCompletedSTD}
        </Form.Item>
      )}

      {Boolean(record.rTEndDate) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.rTEndDate',
          )}
        >
          {record.rTEndDate}
        </Form.Item>
      )}

      {Boolean(record.rTDuration) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.rTDuration',
          )}
        >
          {record.rTDuration}
        </Form.Item>
      )}

      {(Boolean(record.rTStartedAfter) ||
        record.rTStartedAfter === 0) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.rTStartedAfter',
          )}
        >
          {record.rTStartedAfter}
        </Form.Item>
      )}

      {Boolean(record.cTIntent) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.treatment.fields.cTIntent')}
        >
          {record.cTIntent}
        </Form.Item>
      )}

      {Boolean(record.cTDrug) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.treatment.fields.cTDrug')}
        >
          {record.cTDrug}
        </Form.Item>
      )}

      {Boolean(record.cTTotalCyclesGiven) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.cTTotalCyclesGiven',
          )}
        >
          {record.cTTotalCyclesGiven}
        </Form.Item>
      )}

      {Boolean(record.cTCompletedSTD) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.cTCompletedSTD',
          )}
        >
          {record.cTCompletedSTD}
        </Form.Item>
      )}

      {Boolean(record.cTEndDate) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.cTEndDate',
          )}
        >
          {record.cTEndDate}
        </Form.Item>
      )}

      {Boolean(record.cTDuration) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.cTDuration',
          )}
        >
          {record.cTDuration}
        </Form.Item>
      )}

      {Boolean(record.cTStartedAfter) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.cTStartedAfter',
          )}
        >
          {record.cTStartedAfter}
        </Form.Item>
      )}

      {Boolean(record.deathDate) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.deathDate',
          )}
        >
          {record.deathDate}
        </Form.Item>
      )}

      {Boolean(record.daysRTEndUntillDeath) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.treatment.fields.daysRTEndUntillDeath',
          )}
        >
          {record.daysRTEndUntillDeath}
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default TreatmentView;
