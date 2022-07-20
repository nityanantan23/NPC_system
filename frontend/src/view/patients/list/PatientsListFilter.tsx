import {
  SearchOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/patients/list/patientsListActions';
import selectors from 'src/modules/patients/list/patientsListSelectors';
import FilterWrapper, {
  filterItemLayout,
} from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import { Collapse } from 'antd';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import DatePickerRangeFormItem from 'src/view/shared/form/items/DatePickerRangeFormItem';

const schema = yup.object().shape({
  patientID: yupFilterSchemas.string(
    i18n('entities.patients.fields.patientID'),
  ),
  name: yupFilterSchemas.string(
    i18n('entities.patients.fields.name'),
  ),
  dobRange: yupFilterSchemas.dateRange(
    i18n('entities.patients.fields.dobRange'),
  ),
  sex: yupFilterSchemas.string(
    i18n('entities.patients.fields.sex'),
  ),
  ageAtPositive: yupFilterSchemas.string(
    i18n('entities.patients.fields.ageAtPositive'),
  ),
  ageAtLastStatusUpdate: yupFilterSchemas.string(
    i18n('entities.patients.fields.ageAtLastStatusUpdate'),
  ),
  state: yupFilterSchemas.string(
    i18n('entities.patients.fields.state'),
  ),
  occupation: yupFilterSchemas.string(
    i18n('entities.patients.fields.occupation'),
  ),
  status: yupFilterSchemas.string(
    i18n('entities.patients.fields.status'),
  ),
  statusDateRange: yupFilterSchemas.dateRange(
    i18n('entities.patients.fields.statusDateRange'),
  ),
  hospital: yupFilterSchemas.string(
    i18n('entities.patients.fields.hospital'),
  ),
  smoking: yupFilterSchemas.string(
    i18n('entities.patients.fields.smoking'),
  ),
  alcohol: yupFilterSchemas.string(
    i18n('entities.patients.fields.alcohol'),
  ),
  diabetes: yupFilterSchemas.string(
    i18n('entities.patients.fields.diabetes'),
  ),
  hypertension: yupFilterSchemas.string(
    i18n('entities.patients.fields.hypertension'),
  ),
  otherCancer: yupFilterSchemas.string(
    i18n('entities.patients.fields.otherCancer'),
  ),
  familyCancer: yupFilterSchemas.string(
    i18n('entities.patients.fields.familyCancer'),
  ),
  eNT1stVisitRange: yupFilterSchemas.dateRange(
    i18n('entities.patients.fields.eNT1stVisitRange'),
  ),
  onco1stVisitRange: yupFilterSchemas.dateRange(
    i18n('entities.patients.fields.onco1stVisitRange'),
  ),
  stage: yupFilterSchemas.string(
    i18n('entities.patients.fields.stage'),
  ),
  ethnicity: yupFilterSchemas.string(
    i18n('entities.patients.fields.ethnicity'),
  ),
  npc: yupFilterSchemas.string(
    i18n('entities.patients.fields.npc'),
  ),
  firstPositiveBiopsyInHPE: yupFilterSchemas.string(
    i18n('entities.patients.fields.firstPositiveBiopsyInHPE'),
  ),
  firstPositiveBiopsyDateRange: yupFilterSchemas.dateRange(
    i18n('entities.patients.fields.firstPositiveBiopsyDateRange'),
  ),
  wHOGrade: yupFilterSchemas.string(
    i18n('entities.patients.fields.wHOGrade'),
  ),
  surgeriesCount: yupFilterSchemas.string(
    i18n('entities.patients.fields.surgeriesCount'),
  ),
  criticalLevel: yupFilterSchemas.string(
    i18n('entities.patients.fields.criticalLevel'),
  ),
  recurrence: yupFilterSchemas.string(
    i18n('entities.patients.fields.recurrence'),
  ),
});

const emptyValues = {
  patientID: null,
  name: null,
  dobRange: [],
  sex: null,
  ageAtPositive: null,
  ageAtLastStatusUpdate: null,
  state: null,
  occupation: null,
  status: null,
  statusDateRange: [],
  hospital: null,
  smoking: null,
  alcohol: null,
  diabetes: null,
  hypertension: null,
  otherCancer: null,
  familyCancer: null,
  eNT1stVisitRange: [],
  onco1stVisitRange: [],
  stage: null,
  ethnicity: null,
  npc: null,
  firstPositiveBiopsyInHPE: null,
  firstPositiveBiopsyDateRange: [],
  wHOGrade: null,
  surgeriesCount: null,
  criticalLevel: null,
  recurrence: null,
}

const previewRenders = {
  patientID: {
    label: i18n('entities.patients.fields.patientID'),
    render: filterRenders.generic(),
  },
  name: {
    label: i18n('entities.patients.fields.name'),
    render: filterRenders.generic(),
  },
  dobRange: {
    label: i18n('entities.patients.fields.dobRange'),
    render: filterRenders.dateRange(),
  },
  sex: {
    label: i18n('entities.patients.fields.sex'),
    render: filterRenders.generic(),
  },
  ageAtPositive: {
    label: i18n('entities.patients.fields.ageAtPositive'),
    render: filterRenders.generic(),
  },
  ageAtLastStatusUpdate: {
    label: i18n('entities.patients.fields.ageAtLastStatusUpdate'),
    render: filterRenders.generic(),
  },
  state: {
    label: i18n('entities.patients.fields.state'),
    render: filterRenders.generic(),
  },
  occupation: {
    label: i18n('entities.patients.fields.occupation'),
    render: filterRenders.generic(),
  },
  status: {
    label: i18n('entities.patients.fields.status'),
    render: filterRenders.generic(),
  },
  statusDateRange: {
    label: i18n('entities.patients.fields.statusDateRange'),
    render: filterRenders.dateRange(),
  },
  hospital: {
    label: i18n('entities.patients.fields.hospital'),
    render: filterRenders.generic(),
  },
  smoking: {
    label: i18n('entities.patients.fields.smoking'),
    render: filterRenders.generic(),
  },
  alcohol: {
    label: i18n('entities.patients.fields.alcohol'),
    render: filterRenders.generic(),
  },
  diabetes: {
    label: i18n('entities.patients.fields.diabetes'),
    render: filterRenders.generic(),
  },
  hypertension: {
    label: i18n('entities.patients.fields.hypertension'),
    render: filterRenders.generic(),
  },
  otherCancer: {
    label: i18n('entities.patients.fields.otherCancer'),
    render: filterRenders.generic(),
  },
  familyCancer: {
    label: i18n('entities.patients.fields.familyCancer'),
    render: filterRenders.generic(),
  },
  eNT1stVisitRange: {
    label: i18n('entities.patients.fields.eNT1stVisitRange'),
    render: filterRenders.dateRange(),
  },
  onco1stVisitRange: {
    label: i18n('entities.patients.fields.onco1stVisitRange'),
    render: filterRenders.dateRange(),
  },
  stage: {
    label: i18n('entities.patients.fields.stage'),
    render: filterRenders.generic(),
  },
  ethnicity: {
    label: i18n('entities.patients.fields.ethnicity'),
    render: filterRenders.generic(),
  },
  npc: {
    label: i18n('entities.patients.fields.npc'),
    render: filterRenders.generic(),
  },
  firstPositiveBiopsyInHPE: {
    label: i18n('entities.patients.fields.firstPositiveBiopsyInHPE'),
    render: filterRenders.generic(),
  },
  firstPositiveBiopsyDateRange: {
    label: i18n('entities.patients.fields.firstPositiveBiopsyDateRange'),
    render: filterRenders.dateRange(),
  },
  wHOGrade: {
    label: i18n('entities.patients.fields.wHOGrade'),
    render: filterRenders.generic(),
  },
  surgeriesCount: {
    label: i18n('entities.patients.fields.surgeriesCount'),
    render: filterRenders.generic(),
  },
  criticalLevel: {
    label: i18n('entities.patients.fields.criticalLevel'),
    render: filterRenders.generic(),
  },
  recurrence: {
    label: i18n('entities.patients.fields.recurrence'),
    render: filterRenders.generic(),
  },
}

const PatientsListFilter = (props) => {
  const dispatch = useDispatch();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  });

  useEffect(() => {
    dispatch(actions.doFetch(schema.cast(initialValues), rawFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues));
    setExpanded(false);
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    return form.handleSubmit(onSubmit)();
  };

  const { loading } = props;
  return (
    <FilterWrapper>
      <Collapse
        activeKey={expanded ? 'filter' : undefined}
        expandIconPosition="right"
        ghost
        onChange={(value) => {
          setExpanded(Boolean(value.length));
        }}
      >
        <Collapse.Panel
          header={
            <FilterPreview             
              renders={previewRenders}
              values={rawFilter}
              expanded={expanded}
              onRemove={onRemove}
            />
          }
          key="filter"
        >
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Row gutter={24}>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="patientID"
                    label={i18n('entities.patients.fields.patientID')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="name"
                    label={i18n('entities.patients.fields.name')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <DatePickerRangeFormItem
                    name="dobRange"
                    label={i18n('entities.patients.fields.dobRange')}    
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="sex"
                    label={i18n('entities.patients.fields.sex')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="ageAtPositive"
                    label={i18n('entities.patients.fields.ageAtPositive')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="ageAtLastStatusUpdate"
                    label={i18n('entities.patients.fields.ageAtLastStatusUpdate')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="state"
                    label={i18n('entities.patients.fields.state')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="occupation"
                    label={i18n('entities.patients.fields.occupation')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="status"
                    label={i18n('entities.patients.fields.status')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <DatePickerRangeFormItem
                    name="statusDateRange"
                    label={i18n('entities.patients.fields.statusDateRange')}    
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="hospital"
                    label={i18n('entities.patients.fields.hospital')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="smoking"
                    label={i18n('entities.patients.fields.smoking')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="alcohol"
                    label={i18n('entities.patients.fields.alcohol')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="diabetes"
                    label={i18n('entities.patients.fields.diabetes')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="hypertension"
                    label={i18n('entities.patients.fields.hypertension')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="otherCancer"
                    label={i18n('entities.patients.fields.otherCancer')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="familyCancer"
                    label={i18n('entities.patients.fields.familyCancer')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <DatePickerRangeFormItem
                    name="eNT1stVisitRange"
                    label={i18n('entities.patients.fields.eNT1stVisitRange')}    
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <DatePickerRangeFormItem
                    name="onco1stVisitRange"
                    label={i18n('entities.patients.fields.onco1stVisitRange')}    
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="stage"
                    label={i18n('entities.patients.fields.stage')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="ethnicity"
                    label={i18n('entities.patients.fields.ethnicity')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="npc"
                    label={i18n('entities.patients.fields.npc')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="firstPositiveBiopsyInHPE"
                    label={i18n('entities.patients.fields.firstPositiveBiopsyInHPE')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <DatePickerRangeFormItem
                    name="firstPositiveBiopsyDateRange"
                    label={i18n('entities.patients.fields.firstPositiveBiopsyDateRange')}    
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="wHOGrade"
                    label={i18n('entities.patients.fields.wHOGrade')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="surgeriesCount"
                    label={i18n('entities.patients.fields.surgeriesCount')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="criticalLevel"
                    label={i18n('entities.patients.fields.criticalLevel')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="recurrence"
                    label={i18n('entities.patients.fields.recurrence')}      
                    layout={filterItemLayout}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="filter-buttons" span={24}>
                  <Button
                    loading={loading}
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                  >
                    {i18n('common.search')}
                  </Button>
                  <Button
                    loading={loading}
                    onClick={onReset}
                    icon={<UndoOutlined />}
                  >
                    {i18n('common.reset')}
                  </Button>
                </Col>
              </Row>
            </form>
          </FormProvider>
        </Collapse.Panel>
      </Collapse>
    </FilterWrapper>
  );
};

export default PatientsListFilter;