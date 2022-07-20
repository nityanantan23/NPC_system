import VitalSignService from 'src/modules/vitalSign/vitalSignService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'VITALSIGN_VIEW';

const vitalSignViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: vitalSignViewActions.FIND_STARTED,
      });

      const record = await VitalSignService.find(id);

      dispatch({
        type: vitalSignViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vitalSignViewActions.FIND_ERROR,
      });

      getHistory().push('/vital-sign');
    }
  },
};

export default vitalSignViewActions;
