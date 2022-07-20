import {
  SearchOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/treatment/list/treatmentListActions';
import selectors from 'src/modules/treatment/list/treatmentListSelectors';
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
import InputRangeFormItem from 'src/view/shared/form/items/InputRangeFormItem';
import DatePickerRangeFormItem from 'src/view/shared/form/items/DatePickerRangeFormItem';
import PatientsAutocompleteFormItem from 'src/view/patients/autocomplete/PatientsAutocompleteFormItem';

const schema = yup.object().shape({
  patientID: yupFilterSchemas.relationToOne(
    i18n('entities.treatment.fields.patientID'),
  ),
  rTTreatmentIntent: yupFilterSchemas.string(
    i18n('entities.treatment.fields.rTTreatmentIntent'),
  ),
  rTDoseGY: yupFilterSchemas.string(
    i18n('entities.treatment.fields.rTDoseGY'),
  ),
  rTConcurrentChemo: yupFilterSchemas.string(
    i18n('entities.treatment.fields.rTConcurrentChemo'),
  ),
  rTFractions: yupFilterSchemas.string(
    i18n('entities.treatment.fields.rTFractions'),
  ),
  rTCompletedConcChemoSTD: yupFilterSchemas.string(
    i18n('entities.treatment.fields.rTCompletedConcChemoSTD'),
  ),
  rTCompletedSTD: yupFilterSchemas.string(
    i18n('entities.treatment.fields.rTCompletedSTD'),
  ),
  rTEndDateRange: yupFilterSchemas.dateRange(
    i18n('entities.treatment.fields.rTEndDateRange'),
  ),
  rTDuration: yupFilterSchemas.string(
    i18n('entities.treatment.fields.rTDuration'),
  ),
  rTStartedAfterRange: yupFilterSchemas.decimalRange(
    i18n('entities.treatment.fields.rTStartedAfterRange'),
  ),
  cTIntent: yupFilterSchemas.string(
    i18n('entities.treatment.fields.cTIntent'),
  ),
  cTDrug: yupFilterSchemas.string(
    i18n('entities.treatment.fields.cTDrug'),
  ),
  cTTotalCyclesGiven: yupFilterSchemas.string(
    i18n('entities.treatment.fields.cTTotalCyclesGiven'),
  ),
  cTCompletedSTD: yupFilterSchemas.string(
    i18n('entities.treatment.fields.cTCompletedSTD'),
  ),
  cTEndDateRange: yupFilterSchemas.dateRange(
    i18n('entities.treatment.fields.cTEndDateRange'),
  ),
  cTDuration: yupFilterSchemas.string(
    i18n('entities.treatment.fields.cTDuration'),
  ),
  cTStartedAfter: yupFilterSchemas.string(
    i18n('entities.treatment.fields.cTStartedAfter'),
  ),
  deathDateRange: yupFilterSchemas.dateRange(
    i18n('entities.treatment.fields.deathDateRange'),
  ),
  daysRTEndUntillDeath: yupFilterSchemas.string(
    i18n('entities.treatment.fields.daysRTEndUntillDeath'),
  ),
});

const emptyValues = {
  patientID: null,
  rTTreatmentIntent: null,
  rTDoseGY: null,
  rTConcurrentChemo: null,
  rTFractions: null,
  rTCompletedConcChemoSTD: null,
  rTCompletedSTD: null,
  rTEndDateRange: [],
  rTDuration: null,
  rTStartedAfterRange: [],
  cTIntent: null,
  cTDrug: null,
  cTTotalCyclesGiven: null,
  cTCompletedSTD: null,
  cTEndDateRange: [],
  cTDuration: null,
  cTStartedAfter: null,
  deathDateRange: [],
  daysRTEndUntillDeath: null,
}

const previewRenders = {
  patientID: {
      label: i18n('entities.treatment.fields.patientID'),
      render: filterRenders.relationToOne(),
    },
  rTTreatmentIntent: {
    label: i18n('entities.treatment.fields.rTTreatmentIntent'),
    render: filterRenders.generic(),
  },
  rTDoseGY: {
    label: i18n('entities.treatment.fields.rTDoseGY'),
    render: filterRenders.generic(),
  },
  rTConcurrentChemo: {
    label: i18n('entities.treatment.fields.rTConcurrentChemo'),
    render: filterRenders.generic(),
  },
  rTFractions: {
    label: i18n('entities.treatment.fields.rTFractions'),
    render: filterRenders.generic(),
  },
  rTCompletedConcChemoSTD: {
    label: i18n('entities.treatment.fields.rTCompletedConcChemoSTD'),
    render: filterRenders.generic(),
  },
  rTCompletedSTD: {
    label: i18n('entities.treatment.fields.rTCompletedSTD'),
    render: filterRenders.generic(),
  },
  rTEndDateRange: {
    label: i18n('entities.treatment.fields.rTEndDateRange'),
    render: filterRenders.dateRange(),
  },
  rTDuration: {
    label: i18n('entities.treatment.fields.rTDuration'),
    render: filterRenders.generic(),
  },
  rTStartedAfterRange: {
    label: i18n('entities.treatment.fields.rTStartedAfterRange'),
    render: filterRenders.decimalRange(),
  },
  cTIntent: {
    label: i18n('entities.treatment.fields.cTIntent'),
    render: filterRenders.generic(),
  },
  cTDrug: {
    label: i18n('entities.treatment.fields.cTDrug'),
    render: filterRenders.generic(),
  },
  cTTotalCyclesGiven: {
    label: i18n('entities.treatment.fields.cTTotalCyclesGiven'),
    render: filterRenders.generic(),
  },
  cTCompletedSTD: {
    label: i18n('entities.treatment.fields.cTCompletedSTD'),
    render: filterRenders.generic(),
  },
  cTEndDateRange: {
    label: i18n('entities.treatment.fields.cTEndDateRange'),
    render: filterRenders.dateRange(),
  },
  cTDuration: {
    label: i18n('entities.treatment.fields.cTDuration'),
    render: filterRenders.generic(),
  },
  cTStartedAfter: {
    label: i18n('entities.treatment.fields.cTStartedAfter'),
    render: filterRenders.generic(),
  },
  deathDateRange: {
    label: i18n('entities.treatment.fields.deathDateRange'),
    render: filterRenders.dateRange(),
  },
  daysRTEndUntillDeath: {
    label: i18n('entities.treatment.fields.daysRTEndUntillDeath'),
    render: filterRenders.generic(),
  },
}

const TreatmentListFilter = (props) => {
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
                    label={i18n('entities.treatment.fields.patientID')}        
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="rTTreatmentIntent"
                    label={i18n('entities.treatment.fields.rTTreatmentIntent')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="rTDoseGY"
                    label={i18n('entities.treatment.fields.rTDoseGY')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="rTConcurrentChemo"
                    label={i18n('entities.treatment.fields.rTConcurrentChemo')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="rTFractions"
                    label={i18n('entities.treatment.fields.rTFractions')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="rTCompletedConcChemoSTD"
                    label={i18n('entities.treatment.fields.rTCompletedConcChemoSTD')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="rTCompletedSTD"
                    label={i18n('entities.treatment.fields.rTCompletedSTD')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <DatePickerRangeFormItem
                    name="rTEndDateRange"
                    label={i18n('entities.treatment.fields.rTEndDateRange')}    
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="rTDuration"
                    label={i18n('entities.treatment.fields.rTDuration')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputRangeFormItem
                    name="rTStartedAfterRange"
                    label={i18n('entities.treatment.fields.rTStartedAfterRange')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="cTIntent"
                    label={i18n('entities.treatment.fields.cTIntent')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="cTDrug"
                    label={i18n('entities.treatment.fields.cTDrug')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="cTTotalCyclesGiven"
                    label={i18n('entities.treatment.fields.cTTotalCyclesGiven')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="cTCompletedSTD"
                    label={i18n('entities.treatment.fields.cTCompletedSTD')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <DatePickerRangeFormItem
                    name="cTEndDateRange"
                    label={i18n('entities.treatment.fields.cTEndDateRange')}    
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="cTDuration"
                    label={i18n('entities.treatment.fields.cTDuration')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="cTStartedAfter"
                    label={i18n('entities.treatment.fields.cTStartedAfter')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <DatePickerRangeFormItem
                    name="deathDateRange"
                    label={i18n('entities.treatment.fields.deathDateRange')}    
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="daysRTEndUntillDeath"
                    label={i18n('entities.treatment.fields.daysRTEndUntillDeath')}      
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

export default TreatmentListFilter;