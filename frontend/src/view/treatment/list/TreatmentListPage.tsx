import React from 'react';
import { i18n } from 'src/i18n';
import TreatmentListFilter from 'src/view/treatment/list/TreatmentListFilter';
import TreatmentListTable from 'src/view/treatment/list/TreatmentListTable';
import TreatmentListToolbar from 'src/view/treatment/list/TreatmentListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const TreatmentListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.treatment.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.treatment.list.title')}
        </PageTitle>

        <TreatmentListToolbar />
        <TreatmentListFilter />
        <TreatmentListTable />
      </ContentWrapper>
    </>
  );
};

export default TreatmentListPage;
