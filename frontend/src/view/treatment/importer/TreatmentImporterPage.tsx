import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/treatment/importer/treatmentImporterActions';
import fields from 'src/modules/treatment/importer/treatmentImporterFields';
import selectors from 'src/modules/treatment/importer/treatmentImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const TreatmentImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.treatment.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.treatment.menu'), '/treatment'],
          [i18n('entities.treatment.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.treatment.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default TreatmentImportPage;
