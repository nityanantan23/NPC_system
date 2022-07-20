import React from 'react';
import { i18n } from 'src/i18n';
import PatientsListFilter from 'src/view/patients/list/PatientsListFilter';
import PatientsListTable from 'src/view/patients/list/PatientsListTable';
import PatientsListToolbar from 'src/view/patients/list/PatientsListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const PatientsListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.patients.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.patients.list.title')}
        </PageTitle>

        <PatientsListToolbar />
        <PatientsListFilter />
        <PatientsListTable />
      </ContentWrapper>
    </>
  );
};

export default PatientsListPage;
