import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/treatment/view/treatmentViewActions';
import selectors from 'src/modules/treatment/view/treatmentViewSelectors';
import TreatmentView from 'src/view/treatment/view/TreatmentView';
import TreatmentViewToolbar from 'src/view/treatment/view/TreatmentViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const TreatmentPage = (props) => {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.treatment.menu'), '/treatment'],
          [i18n('entities.treatment.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.treatment.view.title')}
        </PageTitle>

        <TreatmentViewToolbar match={match} />

        <TreatmentView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default TreatmentPage;
