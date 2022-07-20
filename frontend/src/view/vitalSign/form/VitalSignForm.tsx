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
import PatientsAutocompleteFormItem from 'src/view/patients/autocomplete/PatientsAutocompleteFormItem';

const schema = yup.object().shape({
  patientID: yupFormSchemas.relationToOne(
    i18n('entities.vitalSign.fields.patientID'),
    {
      "required": true
    },
  ),
  averageSPO2: yupFormSchemas.decimal(
    i18n('entities.vitalSign.fields.averageSPO2'),
    {},
  ),
  averageRestingHeartRate: yupFormSchemas.decimal(
    i18n('entities.vitalSign.fields.averageRestingHeartRate'),
    {},
  ),
  averageStepCount: yupFormSchemas.decimal(
    i18n('entities.vitalSign.fields.averageStepCount'),
    {},
  ),
  averageBPSystolic: yupFormSchemas.decimal(
    i18n('entities.vitalSign.fields.averageBPSystolic'),
    {},
  ),
});

const VitalSignForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      patientID: record.patientID,
      averageSPO2: record.averageSPO2,
      averageRestingHeartRate: record.averageRestingHeartRate,
      averageStepCount: record.averageStepCount,
      averageBPSystolic: record.averageBPSystolic,
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
            label={i18n('entities.vitalSign.fields.patientID')}
            required={true}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <InputFormItem
            name="averageSPO2"
            label={i18n('entities.vitalSign.fields.averageSPO2')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="averageRestingHeartRate"
            label={i18n('entities.vitalSign.fields.averageRestingHeartRate')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="averageStepCount"
            label={i18n('entities.vitalSign.fields.averageStepCount')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="averageBPSystolic"
            label={i18n('entities.vitalSign.fields.averageBPSystolic')}  
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

export default VitalSignForm;
