import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/vitalSign/view/vitalSignViewActions';
import selectors from 'src/modules/vitalSign/view/vitalSignViewSelectors';
import VitalSignView from 'src/view/vitalSign/view/VitalSignView';
import VitalSignViewToolbar from 'src/view/vitalSign/view/VitalSignViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const VitalSignPage = (props) => {
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
          [i18n('entities.vitalSign.menu'), '/vital-sign'],
          [i18n('entities.vitalSign.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.vitalSign.view.title')}
        </PageTitle>

        <VitalSignViewToolbar match={match} />

        <VitalSignView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default VitalSignPage;
