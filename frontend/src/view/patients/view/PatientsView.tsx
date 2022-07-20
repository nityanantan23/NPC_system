import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { FileExcelOutlined } from '@ant-design/icons';
import { Button, Alert, Form, notification } from 'antd';

const PatientsView = (props) => {
  const {
    record,
    loading,
    recordTreatment,
    recordVitalSign,
  } = props;

  const openNotification = (val) => {
    notification.open({
      message:
        val == 0
          ? 'NO cancer recurrence'
          : 'Potential cancer recurrency',
      description:
        'this predicts cancer recurrency with the given data.\n\n',
      className: 'notification-type-info',
    });
  };

  const doPredict = async () => {
    const axios = require('axios');

    const response = await axios.post(
      'http://localhost:8081/predict',
      '',
      {
        params: {
          AGE_AT_POSITIVE: record.ageAtPositive,
          Sex: record.sex,
          State: record.state,
          Smoking: record.smoking,
          Alcohol: record.alcohol,
          Diabetes: record.diabetes,
          Hypertension: record.hypertension,
          OtherCancer: record.otherCancer,
          FamilyCancer: record.familyCancer,
          Stage: record.stage,
          NPC: record.npc,
          FirstPositiveBiopsyInHPE:
            record.firstPositiveBiopsyInHPE,
          WHO_Grade: record.stage,
          RT_TreatmentIntent:
            recordTreatment.rTTreatmentIntent,
          RT_Modality: recordTreatment.rTModality,
          RT_Dose_GY: recordTreatment.rTDoseGY,
          RT_Fractions: recordTreatment.rTFractions,
          RT_ConcurrentChemo:
            recordTreatment.rTConcurrentChemo,
          RT_CompletedConcChemo_STD:
            recordTreatment.rTCompletedConcChemoSTD,
          RT_Completed_STD: recordTreatment.rTCompletedSTD,
          RT_Duration: recordTreatment.rTDuration,
          RT_Started_After: recordTreatment.rTStartedAfter,
          CT_Intent: recordTreatment.cTIntent,
          CT_Drug: recordTreatment.cTDrug,
          CT_TotalCyclesGiven:
            recordTreatment.cTTotalCyclesGiven,
          CT_Completed_STD: recordTreatment.cTCompletedSTD,
          CT_Duration: recordTreatment.cTDuration,
          Average_SPO2: recordVitalSign.averageSPO2,
          Average_Resting_Heart_Rate:
            recordVitalSign.averageRestingHeartRate,
          Average_step_count:
            recordVitalSign.averageStepCount,
          Average_BP_Systolic:
            recordVitalSign.averageBPSystolic,
        },
        headers: {
          accept: 'application/json',
          'content-type':
            'application/x-www-form-urlencoded',
        },
      },
    );
    openNotification(response.data);
    console.log(
      '🚀 ~ file: PatientsView.tsx ~ line 83 ~ doPredict ~ openNotification',
      response.data,
    );
  };

  const renderPredictButton = () => {
    const disabled = loading;
    const button = (
      <Button
        disabled={disabled}
        icon={<FileExcelOutlined />}
        onClick={doPredict}
      >
        Predict Recurrence of NPC cancer
      </Button>
    );
    return button;
  };

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.patientID) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.patients.fields.patientID')}
        >
          {record.patientID}
        </Form.Item>
      )}

      {Boolean(record.name) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.patients.fields.name')}
        >
          {record.name}
        </Form.Item>
      )}

      {Boolean(record.dob) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.patients.fields.dob')}
        >
          {record.dob}
        </Form.Item>
      )}

      {Boolean(record.sex) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.patients.fields.sex')}
        >
          {record.sex}
        </Form.Item>
      )}

      {Boolean(record.ageAtPositive) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.patients.fields.ageAtPositive',
          )}
        >
          {record.ageAtPositive}
        </Form.Item>
      )}

      {Boolean(record.ageAtLastStatusUpdate) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.patients.fields.ageAtLastStatusUpdate',
          )}
        >
          {record.ageAtLastStatusUpdate}
        </Form.Item>
      )}

      {Boolean(record.state) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.patients.fields.state')}
        >
          {record.state}
        </Form.Item>
      )}

      {Boolean(record.occupation) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.patients.fields.occupation',
          )}
        >
          {record.occupation}
        </Form.Item>
      )}

      {Boolean(record.status) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.patients.fields.status')}
        >
          {record.status}
        </Form.Item>
      )}

      {Boolean(record.statusDate) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.patients.fields.statusDate',
          )}
        >
          {record.statusDate}
        </Form.Item>
      )}

      {Boolean(record.hospital) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.patients.fields.hospital')}
        >
          {record.hospital}
        </Form.Item>
      )}

      {Boolean(record.smoking) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.patients.fields.smoking')}
        >
          {record.smoking}
        </Form.Item>
      )}

      {Boolean(record.alcohol) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.patients.fields.alcohol')}
        >
          {record.alcohol}
        </Form.Item>
      )}

      {Boolean(record.diabetes) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.patients.fields.diabetes')}
        >
          {record.diabetes}
        </Form.Item>
      )}

      {Boolean(record.hypertension) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.patients.fields.hypertension',
          )}
        >
          {record.hypertension}
        </Form.Item>
      )}

      {Boolean(record.otherCancer) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.patients.fields.otherCancer',
          )}
        >
          {record.otherCancer}
        </Form.Item>
      )}

      {Boolean(record.familyCancer) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.patients.fields.familyCancer',
          )}
        >
          {record.familyCancer}
        </Form.Item>
      )}

      {Boolean(record.eNT1stVisit) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.patients.fields.eNT1stVisit',
          )}
        >
          {record.eNT1stVisit}
        </Form.Item>
      )}

      {Boolean(record.onco1stVisit) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.patients.fields.onco1stVisit',
          )}
        >
          {record.onco1stVisit}
        </Form.Item>
      )}

      {Boolean(record.stage) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.patients.fields.stage')}
        >
          {record.stage}
        </Form.Item>
      )}

      {Boolean(record.ethnicity) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.patients.fields.ethnicity')}
        >
          {record.ethnicity}
        </Form.Item>
      )}

      {Boolean(record.npc) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.patients.fields.npc')}
        >
          {record.npc}
        </Form.Item>
      )}

      {Boolean(record.firstPositiveBiopsyInHPE) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.patients.fields.firstPositiveBiopsyInHPE',
          )}
        >
          {record.firstPositiveBiopsyInHPE}
        </Form.Item>
      )}

      {Boolean(record.firstPositiveBiopsyDate) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.patients.fields.firstPositiveBiopsyDate',
          )}
        >
          {record.firstPositiveBiopsyDate}
        </Form.Item>
      )}

      {Boolean(record.wHOGrade) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.patients.fields.wHOGrade')}
        >
          {record.wHOGrade}
        </Form.Item>
      )}

      {Boolean(record.surgeriesCount) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.patients.fields.surgeriesCount',
          )}
        >
          {record.surgeriesCount}
        </Form.Item>
      )}

      {Boolean(record.criticalLevel) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.patients.fields.criticalLevel',
          )}
        >
          {record.criticalLevel}
        </Form.Item>
      )}

      {Boolean(record.recurrence) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.patients.fields.recurrence',
          )}
        >
          {record.recurrence}
        </Form.Item>
      )}
      {renderPredictButton()}
    </ViewWrapper>
  );
};

export default PatientsView;
