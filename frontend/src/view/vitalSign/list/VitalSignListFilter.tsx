import {
  SearchOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/vitalSign/list/vitalSignListActions';
import selectors from 'src/modules/vitalSign/list/vitalSignListSelectors';
import FilterWrapper, {
  filterItemLayout,
} from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import { Collapse } from 'antd';
import InputRangeFormItem from 'src/view/shared/form/items/InputRangeFormItem';
import PatientsAutocompleteFormItem from 'src/view/patients/autocomplete/PatientsAutocompleteFormItem';

const schema = yup.object().shape({
  patientID: yupFilterSchemas.relationToOne(
    i18n('entities.vitalSign.fields.patientID'),
  ),
  averageSPO2Range: yupFilterSchemas.decimalRange(
    i18n('entities.vitalSign.fields.averageSPO2Range'),
  ),
  averageRestingHeartRateRange: yupFilterSchemas.decimalRange(
    i18n('entities.vitalSign.fields.averageRestingHeartRateRange'),
  ),
  averageStepCountRange: yupFilterSchemas.decimalRange(
    i18n('entities.vitalSign.fields.averageStepCountRange'),
  ),
  averageBPSystolicRange: yupFilterSchemas.decimalRange(
    i18n('entities.vitalSign.fields.averageBPSystolicRange'),
  ),
});

const emptyValues = {
  patientID: null,
  averageSPO2Range: [],
  averageRestingHeartRateRange: [],
  averageStepCountRange: [],
  averageBPSystolicRange: [],
}

const previewRenders = {
  patientID: {
      label: i18n('entities.vitalSign.fields.patientID'),
      render: filterRenders.relationToOne(),
    },
  averageSPO2Range: {
    label: i18n('entities.vitalSign.fields.averageSPO2Range'),
    render: filterRenders.decimalRange(),
  },
  averageRestingHeartRateRange: {
    label: i18n('entities.vitalSign.fields.averageRestingHeartRateRange'),
    render: filterRenders.decimalRange(),
  },
  averageStepCountRange: {
    label: i18n('entities.vitalSign.fields.averageStepCountRange'),
    render: filterRenders.decimalRange(),
  },
  averageBPSystolicRange: {
    label: i18n('entities.vitalSign.fields.averageBPSystolicRange'),
    render: filterRenders.decimalRange(),
  },
}

const VitalSignListFilter = (props) => {
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
                  <PatientsAutocompleteFormItem  
                    name="patientID"
                    label={i18n('entities.vitalSign.fields.patientID')}        
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputRangeFormItem
                    name="averageSPO2Range"
                    label={i18n('entities.vitalSign.fields.averageSPO2Range')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputRangeFormItem
                    name="averageRestingHeartRateRange"
                    label={i18n('entities.vitalSign.fields.averageRestingHeartRateRange')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputRangeFormItem
                    name="averageStepCountRange"
                    label={i18n('entities.vitalSign.fields.averageStepCountRange')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputRangeFormItem
                    name="averageBPSystolicRange"
                    label={i18n('entities.vitalSign.fields.averageBPSystolicRange')}      
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

export default VitalSignListFilter;