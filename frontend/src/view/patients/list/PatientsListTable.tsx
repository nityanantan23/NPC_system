import { Table, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/patients/list/patientsListActions';
import destroyActions from 'src/modules/patients/destroy/patientsDestroyActions';
import selectors from 'src/modules/patients/list/patientsListSelectors';
import destroySelectors from 'src/modules/patients/destroy/patientsDestroySelectors';
import patientsSelectors from 'src/modules/patients/patientsSelectors';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';


const PatientsListTable = (props) => {
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
    patientsSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    patientsSelectors.selectPermissionToDestroy,
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
        title: i18n('entities.patients.fields.patientID'),
        sorter: true,
        dataIndex: 'patientID',
      },
      {
        title: i18n('entities.patients.fields.name'),
        sorter: true,
        dataIndex: 'name',
      },
      {
        title: i18n('entities.patients.fields.dob'),
        sorter: true,
        dataIndex: 'dob',
      },
      {
        title: i18n('entities.patients.fields.sex'),
        sorter: true,
        dataIndex: 'sex',
      },
      {
        title: i18n('entities.patients.fields.ageAtPositive'),
        sorter: true,
        dataIndex: 'ageAtPositive',
      },
      {
        title: i18n('entities.patients.fields.ageAtLastStatusUpdate'),
        sorter: true,
        dataIndex: 'ageAtLastStatusUpdate',
      },
      {
        title: i18n('entities.patients.fields.state'),
        sorter: true,
        dataIndex: 'state',
      },
      {
        title: i18n('entities.patients.fields.occupation'),
        sorter: true,
        dataIndex: 'occupation',
      },
      {
        title: i18n('entities.patients.fields.status'),
        sorter: true,
        dataIndex: 'status',
      },
      {
        title: i18n('entities.patients.fields.statusDate'),
        sorter: true,
        dataIndex: 'statusDate',
      },
      {
        title: i18n('entities.patients.fields.hospital'),
        sorter: true,
        dataIndex: 'hospital',
      },
      {
        title: i18n('entities.patients.fields.smoking'),
        sorter: true,
        dataIndex: 'smoking',
      },
      {
        title: i18n('entities.patients.fields.alcohol'),
        sorter: true,
        dataIndex: 'alcohol',
      },
      {
        title: i18n('entities.patients.fields.diabetes'),
        sorter: true,
        dataIndex: 'diabetes',
      },
      {
        title: i18n('entities.patients.fields.hypertension'),
        sorter: true,
        dataIndex: 'hypertension',
      },
      {
        title: i18n('entities.patients.fields.otherCancer'),
        sorter: true,
        dataIndex: 'otherCancer',
      },
      {
        title: i18n('entities.patients.fields.familyCancer'),
        sorter: true,
        dataIndex: 'familyCancer',
      },
      {
        title: i18n('entities.patients.fields.eNT1stVisit'),
        sorter: true,
        dataIndex: 'eNT1stVisit',
      },
      {
        title: i18n('entities.patients.fields.onco1stVisit'),
        sorter: true,
        dataIndex: 'onco1stVisit',
      },
      {
        title: i18n('entities.patients.fields.stage'),
        sorter: true,
        dataIndex: 'stage',
      },
      {
        title: i18n('entities.patients.fields.ethnicity'),
        sorter: true,
        dataIndex: 'ethnicity',
      },
      {
        title: i18n('entities.patients.fields.npc'),
        sorter: true,
        dataIndex: 'npc',
      },
      {
        title: i18n('entities.patients.fields.firstPositiveBiopsyInHPE'),
        sorter: true,
        dataIndex: 'firstPositiveBiopsyInHPE',
      },
      {
        title: i18n('entities.patients.fields.firstPositiveBiopsyDate'),
        sorter: true,
        dataIndex: 'firstPositiveBiopsyDate',
      },
      {
        title: i18n('entities.patients.fields.wHOGrade'),
        sorter: true,
        dataIndex: 'wHOGrade',
      },
      {
        title: i18n('entities.patients.fields.surgeriesCount'),
        sorter: true,
        dataIndex: 'surgeriesCount',
      },
      {
        title: i18n('entities.patients.fields.criticalLevel'),
        sorter: true,
        dataIndex: 'criticalLevel',
      },
      {
        title: i18n('entities.patients.fields.recurrence'),
        sorter: true,
        dataIndex: 'recurrence',
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/patients/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/patients/${record.id}/edit`}>
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

export default PatientsListTable;
