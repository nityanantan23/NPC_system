import Permissions from 'src/security/permissions';
import { i18n } from 'src/i18n';
import React from 'react';
import config from 'src/config';

import {
  DashboardOutlined,
  UserAddOutlined,
  FileSearchOutlined,
  SettingOutlined,
  RightOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';

const permissions = Permissions.values;

export default [
  {
    path: '/',
    exact: true,
    icon: <DashboardOutlined />,
    label: i18n('dashboard.menu'),
    permissionRequired: null,
  },

  config.isPlanEnabled && {
    path: '/plan',
    permissionRequired: permissions.planRead,
    icon: <CreditCardOutlined />,
    label: i18n('plan.menu'),
  },

  {
    path: '/user',
    label: i18n('user.menu'),
    permissionRequired: permissions.userRead,
    icon: <UserAddOutlined />,
  },

  {
    path: '/audit-logs',
    icon: <FileSearchOutlined />,
    label: i18n('auditLog.menu'),
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/settings',
    icon: <SettingOutlined />,
    label: i18n('settings.menu'),
    permissionRequired: permissions.settingsEdit,
  },

  {
    path: '/patients',
    permissionRequired: permissions.patientsRead,
    icon: <RightOutlined />,
    label: i18n('entities.patients.menu'),
  },

  {
    path: '/predict',
    permissionRequired: permissions.patientsRead,
    icon: <RightOutlined />,
    label: 'predict',
  },

  {
    path: '/treatment',
    permissionRequired: permissions.treatmentRead,
    icon: <RightOutlined />,
    label: i18n('entities.treatment.menu'),
  },

  {
    path: '/vital-sign',
    permissionRequired: permissions.vitalSignRead,
    icon: <RightOutlined />,
    label: i18n('entities.vitalSign.menu'),
  },
].filter(Boolean);
