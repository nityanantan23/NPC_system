import { Card, Col, Row } from 'antd';
import React from 'react';
import { i18n } from 'src/i18n';
import DashboardBarChart from 'src/view/dashboard/DashboardBarChart';
import DashboardDoughnutChart from 'src/view/dashboard/DashboardDoughnutChart';
import DashboardHorizontalBarChart from 'src/view/dashboard/DashboardHorizontalBarChart';
import DashboardLineChart from 'src/view/dashboard/DashboardLineChart';
import DashboardMixChartOne from 'src/view/dashboard/DashboardMixChartOne';
import DashboardMixChartTwo from 'src/view/dashboard/DashboardMixChartTwo';
import DashboardPolarChart from 'src/view/dashboard/DashboardPolarChart';
import DashboardRadarChart from 'src/view/dashboard/DashboardRadarChart';
import TableauReport from 'tableau-react';

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
  const options = {
    height: 795,
    width: 1466,
  };
  return (
    <div>
      <TableauReport url="https://public.tableau.com/views/NPC_16570085248790/Dashboard1" options={options} />
      <TableauReport url="https://public.tableau.com/views/NPC2/Dashboard2" options={options} />

    </div>
  );
};

export default DashboardPage;
