import { Table, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/treatment/list/treatmentListActions';
import destroyActions from 'src/modules/treatment/destroy/treatmentDestroyActions';
import selectors from 'src/modules/treatment/list/treatmentListSelectors';
import destroySelectors from 'src/modules/treatment/destroy/treatmentDestroySelectors';
import treatmentSelectors from 'src/modules/treatment/treatmentSelectors';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import PatientsListItem from 'src/view/patients/list/PatientsListItem';

const TreatmentListTable = (props) => {
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasPermissionToEdit = useSelector(
    treatmentSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    treatmentSelectors.selectPermissionToDestroy,
  );

  const handleTableChange = (
    pagination,
    filters,
    sorter,
  ) => {
    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  const doDestroy = (id) => {
    dispatch(destroyActions.doDestroy(id));
  };

  const columns = [
      {
        title: i18n('entities.treatment.fields.patientID'),
        sorter: false,
        dataIndex: 'patientID',
        render: (value) => <PatientsListItem value={value} />,
      },
      {
        title: i18n('entities.treatment.fields.rTTreatmentIntent'),
        sorter: true,
        dataIndex: 'rTTreatmentIntent',
      },
      {
        title: i18n('entities.treatment.fields.rTDoseGY'),
        sorter: true,
        dataIndex: 'rTDoseGY',
      },
      {
        title: i18n('entities.treatment.fields.rTConcurrentChemo'),
        sorter: true,
        dataIndex: 'rTConcurrentChemo',
      },
      {
        title: i18n('entities.treatment.fields.rTFractions'),
        sorter: true,
        dataIndex: 'rTFractions',
      },
      {
        title: i18n('entities.treatment.fields.rTCompletedConcChemoSTD'),
        sorter: true,
        dataIndex: 'rTCompletedConcChemoSTD',
      },
      {
        title: i18n('entities.treatment.fields.rTCompletedSTD'),
        sorter: true,
        dataIndex: 'rTCompletedSTD',
      },
      {
        title: i18n('entities.treatment.fields.rTEndDate'),
        sorter: true,
        dataIndex: 'rTEndDate',
      },
      {
        title: i18n('entities.treatment.fields.rTDuration'),
        sorter: true,
        dataIndex: 'rTDuration',
      },
      {
        title: i18n('entities.treatment.fields.rTStartedAfter'),
        sorter: true,
        dataIndex: 'rTStartedAfter',
        align: 'right',
      },
      {
        title: i18n('entities.treatment.fields.cTIntent'),
        sorter: true,
        dataIndex: 'cTIntent',
      },
      {
        title: i18n('entities.treatment.fields.cTDrug'),
        sorter: true,
        dataIndex: 'cTDrug',
      },
      {
        title: i18n('entities.treatment.fields.cTTotalCyclesGiven'),
        sorter: true,
        dataIndex: 'cTTotalCyclesGiven',
      },
      {
        title: i18n('entities.treatment.fields.cTCompletedSTD'),
        sorter: true,
        dataIndex: 'cTCompletedSTD',
      },
      {
        title: i18n('entities.treatment.fields.cTEndDate'),
        sorter: true,
        dataIndex: 'cTEndDate',
      },
      {
        title: i18n('entities.treatment.fields.cTDuration'),
        sorter: true,
        dataIndex: 'cTDuration',
      },
      {
        title: i18n('entities.treatment.fields.cTStartedAfter'),
        sorter: true,
        dataIndex: 'cTStartedAfter',
      },
      {
        title: i18n('entities.treatment.fields.deathDate'),
        sorter: true,
        dataIndex: 'deathDate',
      },
      {
        title: i18n('entities.treatment.fields.daysRTEndUntillDeath'),
        sorter: true,
        dataIndex: 'daysRTEndUntillDeath',
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/treatment/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/treatment/${record.id}/edit`}>
              {i18n('common.edit')}
            </Link>
          )}
          {hasPermissionToDestroy && (
            <Popconfirm
              title={i18n('common.areYouSure')}
              onConfirm={() => doDestroy(record.id)}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
              <ButtonLink>
                {i18n('common.destroy')}
              </ButtonLink>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  const rowSelection = () => {
    return {
      selectedRowKeys: selectedKeys,
      onChange: (selectedRowKeys) => {
        dispatch(actions.doChangeSelected(selectedRowKeys));
      },
    };
  };

  return (
    <TableWrapper>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns as any}
        dataSource={rows}
        pagination={pagination}
        onChange={handleTableChange}
        rowSelection={rowSelection()}
        scroll={{
          x: true,
        }}
      />
    </TableWrapper>
  );
};

export default TreatmentListTable;
