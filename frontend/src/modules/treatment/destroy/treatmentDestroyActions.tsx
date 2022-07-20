import listActions from 'src/modules/treatment/list/treatmentListActions';
import TreatmentService from 'src/modules/treatment/treatmentService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'TREATMENT_DESTROY';

const treatmentDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: treatmentDestroyActions.DESTROY_STARTED,
      });

      await TreatmentService.destroyAll([id]);

      dispatch({
        type: treatmentDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.treatment.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/treatment');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: treatmentDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: treatmentDestroyActions.DESTROY_ALL_STARTED,
      });

      await TreatmentService.destroyAll(ids);

      dispatch({
        type: treatmentDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.treatment.destroyAll.success'),
      );

      getHistory().push('/treatment');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: treatmentDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default treatmentDestroyActions;
