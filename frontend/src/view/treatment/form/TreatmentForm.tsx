import {
  CloseOutlined,
  SaveOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Form } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  formItemLayout,
  tailFormItemLayout,
} from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import moment from 'moment';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import PatientsAutocompleteFormItem from 'src/view/patients/autocomplete/PatientsAutocompleteFormItem';

const schema = yup.object().shape({
  patientID: yupFormSchemas.relationToOne(
    i18n('entities.treatment.fields.patientID'),
    {},
  ),
  rTTreatmentIntent: yupFormSchemas.string(
    i18n('entities.treatment.fields.rTTreatmentIntent'),
    {},
  ),
  rTModality: yupFormSchemas.string(
    i18n('entities.treatment.fields.rTModality'),
    {
      "max": 21845
    },
  ),
  rTDoseGY: yupFormSchemas.string(
    i18n('entities.treatment.fields.rTDoseGY'),
    {},
  ),
  rTConcurrentChemo: yupFormSchemas.string(
    i18n('entities.treatment.fields.rTConcurrentChemo'),
    {},
  ),
  rTFractions: yupFormSchemas.string(
    i18n('entities.treatment.fields.rTFractions'),
    {},
  ),
  rTCompletedConcChemoSTD: yupFormSchemas.string(
    i18n('entities.treatment.fields.rTCompletedConcChemoSTD'),
    {},
  ),
  rTCompletedSTD: yupFormSchemas.string(
    i18n('entities.treatment.fields.rTCompletedSTD'),
    {},
  ),
  rTEndDate: yupFormSchemas.date(
    i18n('entities.treatment.fields.rTEndDate'),
    {},
  ),
  rTDuration: yupFormSchemas.string(
    i18n('entities.treatment.fields.rTDuration'),
    {},
  ),
  rTStartedAfter: yupFormSchemas.decimal(
    i18n('entities.treatment.fields.rTStartedAfter'),
    {},
  ),
  cTIntent: yupFormSchemas.string(
    i18n('entities.treatment.fields.cTIntent'),
    {},
  ),
  cTDrug: yupFormSchemas.string(
    i18n('entities.treatment.fields.cTDrug'),
    {},
  ),
  cTTotalCyclesGiven: yupFormSchemas.string(
    i18n('entities.treatment.fields.cTTotalCyclesGiven'),
    {},
  ),
  cTCompletedSTD: yupFormSchemas.string(
    i18n('entities.treatment.fields.cTCompletedSTD'),
    {},
  ),
  cTEndDate: yupFormSchemas.date(
    i18n('entities.treatment.fields.cTEndDate'),
    {},
  ),
  cTDuration: yupFormSchemas.string(
    i18n('entities.treatment.fields.cTDuration'),
    {},
  ),
  cTStartedAfter: yupFormSchemas.string(
    i18n('entities.treatment.fields.cTStartedAfter'),
    {},
  ),
  deathDate: yupFormSchemas.date(
    i18n('entities.treatment.fields.deathDate'),
    {},
  ),
  daysRTEndUntillDeath: yupFormSchemas.string(
    i18n('entities.treatment.fields.daysRTEndUntillDeath'),
    {},
  ),
});

const TreatmentForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      patientID: record.patientID,
      rTTreatmentIntent: record.rTTreatmentIntent,
      rTModality: record.rTModality,
      rTDoseGY: record.rTDoseGY,
      rTConcurrentChemo: record.rTConcurrentChemo,
      rTFractions: record.rTFractions,
      rTCompletedConcChemoSTD: record.rTCompletedConcChemoSTD,
      rTCompletedSTD: record.rTCompletedSTD,
      rTEndDate: record.rTEndDate ? moment(record.rTEndDate, 'YYYY-MM-DD') : null,
      rTDuration: record.rTDuration,
      rTStartedAfter: record.rTStartedAfter,
      cTIntent: record.cTIntent,
      cTDrug: record.cTDrug,
      cTTotalCyclesGiven: record.cTTotalCyclesGiven,
      cTCompletedSTD: record.cTCompletedSTD,
      cTEndDate: record.cTEndDate ? moment(record.cTEndDate, 'YYYY-MM-DD') : null,
      cTDuration: record.cTDuration,
      cTStartedAfter: record.cTStartedAfter,
      deathDate: record.deathDate ? moment(record.deathDate, 'YYYY-MM-DD') : null,
      daysRTEndUntillDeath: record.daysRTEndUntillDeath,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues as any,
  });

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  const onSubmit = (values) => {
    props.onSubmit(props?.record?.id, values);
  };

  const { saveLoading } = props;
  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PatientsAutocompleteFormItem  
            name="patientID"
            label={i18n('entities.treatment.fields.patientID')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <InputFormItem
            name="rTTreatmentIntent"
            label={i18n('entities.treatment.fields.rTTreatmentIntent')}  
            required={false}
            layout={formItemLayout}
          />
          <TextAreaFormItem
            name="rTModality"
            label={i18n('entities.treatment.fields.rTModality')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="rTDoseGY"
            label={i18n('entities.treatment.fields.rTDoseGY')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="rTConcurrentChemo"
            label={i18n('entities.treatment.fields.rTConcurrentChemo')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="rTFractions"
            label={i18n('entities.treatment.fields.rTFractions')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="rTCompletedConcChemoSTD"
            label={i18n('entities.treatment.fields.rTCompletedConcChemoSTD')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="rTCompletedSTD"
            label={i18n('entities.treatment.fields.rTCompletedSTD')}  
            required={false}
            layout={formItemLayout}
          />
          <DatePickerFormItem
            name="rTEndDate"
            label={i18n('entities.treatment.fields.rTEndDate')}
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="rTDuration"
            label={i18n('entities.treatment.fields.rTDuration')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="rTStartedAfter"
            label={i18n('entities.treatment.fields.rTStartedAfter')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="cTIntent"
            label={i18n('entities.treatment.fields.cTIntent')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="cTDrug"
            label={i18n('entities.treatment.fields.cTDrug')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="cTTotalCyclesGiven"
            label={i18n('entities.treatment.fields.cTTotalCyclesGiven')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="cTCompletedSTD"
            label={i18n('entities.treatment.fields.cTCompletedSTD')}  
            required={false}
            layout={formItemLayout}
          />
          <DatePickerFormItem
            name="cTEndDate"
            label={i18n('entities.treatment.fields.cTEndDate')}
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="cTDuration"
            label={i18n('entities.treatment.fields.cTDuration')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="cTStartedAfter"
            label={i18n('entities.treatment.fields.cTStartedAfter')}  
            required={false}
            layout={formItemLayout}
          />
          <DatePickerFormItem
            name="deathDate"
            label={i18n('entities.treatment.fields.deathDate')}
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="daysRTEndUntillDeath"
            label={i18n('entities.treatment.fields.daysRTEndUntillDeath')}  
            required={false}
            layout={formItemLayout}
          />

          <Form.Item
            className="form-buttons"
            {...tailFormItemLayout}
          >
            <Button
              loading={saveLoading}
              type="primary"
              onClick={form.handleSubmit(onSubmit)}
              icon={<SaveOutlined />}
            >
              {i18n('common.save')}
            </Button>

            <Button
              disabled={saveLoading}
              onClick={onReset}
              icon={<UndoOutlined />}
            >
              {i18n('common.reset')}
            </Button>

            {props.onCancel && (
              <Button
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                icon={<CloseOutlined />}
              >
                {i18n('common.cancel')}
              </Button>
            )}
          </Form.Item>
        </form>
      </FormProvider>
    </FormWrapper>
  );
};

export default TreatmentForm;
