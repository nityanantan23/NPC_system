import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/patients/importer/patientsImporterActions';
import fields from 'src/modules/patients/importer/patientsImporterFields';
import selectors from 'src/modules/patients/importer/patientsImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const PatientsImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.patients.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.patients.menu'), '/patients'],
          [i18n('entities.patients.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.patients.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default PatientsImportPage;
