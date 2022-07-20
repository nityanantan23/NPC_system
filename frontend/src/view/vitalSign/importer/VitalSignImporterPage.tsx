import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/vitalSign/importer/vitalSignImporterActions';
import fields from 'src/modules/vitalSign/importer/vitalSignImporterFields';
import selectors from 'src/modules/vitalSign/importer/vitalSignImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const VitalSignImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.vitalSign.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.vitalSign.menu'), '/vital-sign'],
          [i18n('entities.vitalSign.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.vitalSign.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default VitalSignImportPage;
