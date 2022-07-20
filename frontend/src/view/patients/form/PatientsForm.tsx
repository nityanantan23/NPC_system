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
import moment from 'moment';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';

const schema = yup.object().shape({
  patientID: yupFormSchemas.string(
    i18n('entities.patients.fields.patientID'),
    {},
  ),
  name: yupFormSchemas.string(
    i18n('entities.patients.fields.name'),
    {
      "required": true,
      "min": 2,
      "max": 255
    },
  ),
  dob: yupFormSchemas.date(
    i18n('entities.patients.fields.dob'),
    {},
  ),
  sex: yupFormSchemas.string(
    i18n('entities.patients.fields.sex'),
    {},
  ),
  ageAtPositive: yupFormSchemas.string(
    i18n('entities.patients.fields.ageAtPositive'),
    {},
  ),
  ageAtLastStatusUpdate: yupFormSchemas.string(
    i18n('entities.patients.fields.ageAtLastStatusUpdate'),
    {},
  ),
  state: yupFormSchemas.string(
    i18n('entities.patients.fields.state'),
    {},
  ),
  occupation: yupFormSchemas.string(
    i18n('entities.patients.fields.occupation'),
    {},
  ),
  status: yupFormSchemas.string(
    i18n('entities.patients.fields.status'),
    {},
  ),
  statusDate: yupFormSchemas.date(
    i18n('entities.patients.fields.statusDate'),
    {},
  ),
  hospital: yupFormSchemas.string(
    i18n('entities.patients.fields.hospital'),
    {},
  ),
  smoking: yupFormSchemas.string(
    i18n('entities.patients.fields.smoking'),
    {},
  ),
  alcohol: yupFormSchemas.string(
    i18n('entities.patients.fields.alcohol'),
    {},
  ),
  diabetes: yupFormSchemas.string(
    i18n('entities.patients.fields.diabetes'),
    {},
  ),
  hypertension: yupFormSchemas.string(
    i18n('entities.patients.fields.hypertension'),
    {},
  ),
  otherCancer: yupFormSchemas.string(
    i18n('entities.patients.fields.otherCancer'),
    {},
  ),
  familyCancer: yupFormSchemas.string(
    i18n('entities.patients.fields.familyCancer'),
    {},
  ),
  eNT1stVisit: yupFormSchemas.date(
    i18n('entities.patients.fields.eNT1stVisit'),
    {},
  ),
  onco1stVisit: yupFormSchemas.date(
    i18n('entities.patients.fields.onco1stVisit'),
    {},
  ),
  stage: yupFormSchemas.string(
    i18n('entities.patients.fields.stage'),
    {},
  ),
  ethnicity: yupFormSchemas.string(
    i18n('entities.patients.fields.ethnicity'),
    {},
  ),
  npc: yupFormSchemas.string(
    i18n('entities.patients.fields.npc'),
    {},
  ),
  firstPositiveBiopsyInHPE: yupFormSchemas.string(
    i18n('entities.patients.fields.firstPositiveBiopsyInHPE'),
    {},
  ),
  firstPositiveBiopsyDate: yupFormSchemas.date(
    i18n('entities.patients.fields.firstPositiveBiopsyDate'),
    {},
  ),
  wHOGrade: yupFormSchemas.string(
    i18n('entities.patients.fields.wHOGrade'),
    {},
  ),
  surgeriesCount: yupFormSchemas.string(
    i18n('entities.patients.fields.surgeriesCount'),
    {},
  ),
  criticalLevel: yupFormSchemas.string(
    i18n('entities.patients.fields.criticalLevel'),
    {},
  ),
  recurrence: yupFormSchemas.string(
    i18n('entities.patients.fields.recurrence'),
    {},
  ),
});

const PatientsForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      patientID: record.patientID,
      name: record.name,
      dob: record.dob ? moment(record.dob, 'YYYY-MM-DD') : null,
      sex: record.sex,
      ageAtPositive: record.ageAtPositive,
      ageAtLastStatusUpdate: record.ageAtLastStatusUpdate,
      state: record.state,
      occupation: record.occupation,
      status: record.status,
      statusDate: record.statusDate ? moment(record.statusDate, 'YYYY-MM-DD') : null,
      hospital: record.hospital,
      smoking: record.smoking,
      alcohol: record.alcohol,
      diabetes: record.diabetes,
      hypertension: record.hypertension,
      otherCancer: record.otherCancer,
      familyCancer: record.familyCancer,
      eNT1stVisit: record.eNT1stVisit ? moment(record.eNT1stVisit, 'YYYY-MM-DD') : null,
      onco1stVisit: record.onco1stVisit ? moment(record.onco1stVisit, 'YYYY-MM-DD') : null,
      stage: record.stage,
      ethnicity: record.ethnicity,
      npc: record.npc,
      firstPositiveBiopsyInHPE: record.firstPositiveBiopsyInHPE,
      firstPositiveBiopsyDate: record.firstPositiveBiopsyDate ? moment(record.firstPositiveBiopsyDate, 'YYYY-MM-DD') : null,
      wHOGrade: record.wHOGrade,
      surgeriesCount: record.surgeriesCount,
      criticalLevel: record.criticalLevel,
      recurrence: record.recurrence,
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
          <InputFormItem
            name="patientID"
            label={i18n('entities.patients.fields.patientID')}  
            required={false}
            layout={formItemLayout}
            autoFocus
          />
          <InputFormItem
            name="name"
            label={i18n('entities.patients.fields.name')}  
            required={true}
            layout={formItemLayout}
          />
          <DatePickerFormItem
            name="dob"
            label={i18n('entities.patients.fields.dob')}
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="sex"
            label={i18n('entities.patients.fields.sex')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="ageAtPositive"
            label={i18n('entities.patients.fields.ageAtPositive')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="ageAtLastStatusUpdate"
            label={i18n('entities.patients.fields.ageAtLastStatusUpdate')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="state"
            label={i18n('entities.patients.fields.state')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="occupation"
            label={i18n('entities.patients.fields.occupation')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="status"
            label={i18n('entities.patients.fields.status')}  
            required={false}
            layout={formItemLayout}
          />
          <DatePickerFormItem
            name="statusDate"
            label={i18n('entities.patients.fields.statusDate')}
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="hospital"
            label={i18n('entities.patients.fields.hospital')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="smoking"
            label={i18n('entities.patients.fields.smoking')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="alcohol"
            label={i18n('entities.patients.fields.alcohol')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="diabetes"
            label={i18n('entities.patients.fields.diabetes')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="hypertension"
            label={i18n('entities.patients.fields.hypertension')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="otherCancer"
            label={i18n('entities.patients.fields.otherCancer')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="familyCancer"
            label={i18n('entities.patients.fields.familyCancer')}  
            required={false}
            layout={formItemLayout}
          />
          <DatePickerFormItem
            name="eNT1stVisit"
            label={i18n('entities.patients.fields.eNT1stVisit')}
            required={false}
            layout={formItemLayout}
          />
          <DatePickerFormItem
            name="onco1stVisit"
            label={i18n('entities.patients.fields.onco1stVisit')}
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="stage"
            label={i18n('entities.patients.fields.stage')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="ethnicity"
            label={i18n('entities.patients.fields.ethnicity')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="npc"
            label={i18n('entities.patients.fields.npc')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="firstPositiveBiopsyInHPE"
            label={i18n('entities.patients.fields.firstPositiveBiopsyInHPE')}  
            required={false}
            layout={formItemLayout}
          />
          <DatePickerFormItem
            name="firstPositiveBiopsyDate"
            label={i18n('entities.patients.fields.firstPositiveBiopsyDate')}
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="wHOGrade"
            label={i18n('entities.patients.fields.wHOGrade')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="surgeriesCount"
            label={i18n('entities.patients.fields.surgeriesCount')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="criticalLevel"
            label={i18n('entities.patients.fields.criticalLevel')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="recurrence"
            label={i18n('entities.patients.fields.recurrence')}  
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

export default PatientsForm;
