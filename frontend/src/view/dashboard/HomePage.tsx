import { Card, Col, Row } from 'antd';
import React from 'react';
import { i18n } from 'src/i18n';
import TableauReport from 'tableau-react';

import DashboardBarChart from 'src/view/dashboard/DashboardBarChart';
import DashboardDoughnutChart from 'src/view/dashboard/DashboardDoughnutChart';
import DashboardHorizontalBarChart from 'src/view/dashboard/DashboardHorizontalBarChart';
import DashboardLineChart from 'src/view/dashboard/DashboardLineChart';
import DashboardMixChartOne from 'src/view/dashboard/DashboardMixChartOne';
import DashboardMixChartTwo from 'src/view/dashboard/DashboardMixChartTwo';
import DashboardPolarChart from 'src/view/dashboard/DashboardPolarChart';
import DashboardRadarChart from 'src/view/dashboard/DashboardRadarChart';

const DashboardPage = (props) => {
  const twoColumnsResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    style: {
      marginBottom: 24,
    },
  };
  const threeColumnsResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    style: {
      marginBottom: 24,
    },
  };

  return (
    <TableauReport url="http://reports.my-site.com/my-workbook/my-report" />
  );
};

export default DashboardPage;
