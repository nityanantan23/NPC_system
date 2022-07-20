import { Table, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/vitalSign/list/vitalSignListActions';
import destroyActions from 'src/modules/vitalSign/destroy/vitalSignDestroyActions';
import selectors from 'src/modules/vitalSign/list/vitalSignListSelectors';
import destroySelectors from 'src/modules/vitalSign/destroy/vitalSignDestroySelectors';
import vitalSignSelectors from 'src/modules/vitalSign/vitalSignSelectors';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import PatientsListItem from 'src/view/patients/list/PatientsListItem';

const VitalSignListTable = (props) => {
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
    vitalSignSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    vitalSignSelectors.selectPermissionToDestroy,
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
        title: i18n('entities.vitalSign.fields.patientID'),
        sorter: false,
        dataIndex: 'patientID',
        render: (value) => <PatientsListItem value={value} />,
      },
      {
        title: i18n('entities.vitalSign.fields.averageSPO2'),
        sorter: true,
        dataIndex: 'averageSPO2',
        align: 'right',
      },
      {
        title: i18n('entities.vitalSign.fields.averageRestingHeartRate'),
        sorter: true,
        dataIndex: 'averageRestingHeartRate',
        align: 'right',
      },
      {
        title: i18n('entities.vitalSign.fields.averageStepCount'),
        sorter: true,
        dataIndex: 'averageStepCount',
        align: 'right',
      },
      {
        title: i18n('entities.vitalSign.fields.averageBPSystolic'),
        sorter: true,
        dataIndex: 'averageBPSystolic',
        align: 'right',
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/vital-sign/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/vital-sign/${record.id}/edit`}>
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

export default VitalSignListTable;
