import React from 'react';
import { i18n } from 'src/i18n';
import VitalSignListFilter from 'src/view/vitalSign/list/VitalSignListFilter';
import VitalSignListTable from 'src/view/vitalSign/list/VitalSignListTable';
import VitalSignListToolbar from 'src/view/vitalSign/list/VitalSignListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const VitalSignListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.vitalSign.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.vitalSign.list.title')}
        </PageTitle>

        <VitalSignListToolbar />
        <VitalSignListFilter />
        <VitalSignListTable />
      </ContentWrapper>
    </>
  );
};

export default VitalSignListPage;
