import listActions from 'src/modules/vitalSign/list/vitalSignListActions';
import VitalSignService from 'src/modules/vitalSign/vitalSignService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'VITALSIGN_DESTROY';

const vitalSignDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: vitalSignDestroyActions.DESTROY_STARTED,
      });

      await VitalSignService.destroyAll([id]);

      dispatch({
        type: vitalSignDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.vitalSign.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/vital-sign');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: vitalSignDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: vitalSignDestroyActions.DESTROY_ALL_STARTED,
      });

      await VitalSignService.destroyAll(ids);

      dispatch({
        type: vitalSignDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.vitalSign.destroyAll.success'),
      );

      getHistory().push('/vital-sign');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: vitalSignDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default vitalSignDestroyActions;
