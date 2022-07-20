import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/patients/view/patientsViewActions';
import selectors from 'src/modules/patients/view/patientsViewSelectors';
import PatientsView from 'src/view/patients/view/PatientsView';
import PatientsViewToolbar from 'src/view/patients/view/PatientsViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const PatientsPage = (props) => {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);
  console.log("🚀 ~ file: PatientsViewPage.tsx ~ line 19 ~ PatientsPage ~ record", record)
  const recordTreatment = useSelector(selectors.selectRecordTreatment);
  console.log("🚀 ~ file: PatientsViewPage.tsx ~ line 20 ~ PatientsPage ~ recordTreatment", recordTreatment)
  const recordVitalSign = useSelector(selectors.selectRecordVitalSign);
  console.log("🚀 ~ file: PatientsViewPage.tsx ~ line 22 ~ PatientsPage ~ recordVitalSign", recordVitalSign)


  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.patients.menu'), '/patients'],
          [i18n('entities.patients.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.patients.view.title')}
        </PageTitle>

        <PatientsViewToolbar match={match} />

        <PatientsView loading={loading} record={record} recordTreatment={recordTreatment} recordVitalSign={recordVitalSign} />
      </ContentWrapper>
    </>
  );
};

export default PatientsPage;
