import listActions from 'src/modules/patients/list/patientsListActions';
import PatientsService from 'src/modules/patients/patientsService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PATIENTS_DESTROY';

const patientsDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: patientsDestroyActions.DESTROY_STARTED,
      });

      await PatientsService.destroyAll([id]);

      dispatch({
        type: patientsDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.patients.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/patients');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: patientsDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: patientsDestroyActions.DESTROY_ALL_STARTED,
      });

      await PatientsService.destroyAll(ids);

      dispatch({
        type: patientsDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.patients.destroyAll.success'),
      );

      getHistory().push('/patients');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: patientsDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default patientsDestroyActions;
