import TreatmentService from 'src/modules/treatment/treatmentService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'TREATMENT_VIEW';

const treatmentViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: treatmentViewActions.FIND_STARTED,
      });

      const record = await TreatmentService.find(id);

      dispatch({
        type: treatmentViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: treatmentViewActions.FIND_ERROR,
      });

      getHistory().push('/treatment');
    }
  },
};

export default treatmentViewActions;
