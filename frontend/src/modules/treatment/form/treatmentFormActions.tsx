import TreatmentService from 'src/modules/treatment/treatmentService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'TREATMENT_FORM';

const treatmentFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: treatmentFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await TreatmentService.find(id);
      }

      dispatch({
        type: treatmentFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: treatmentFormActions.INIT_ERROR,
      });

      getHistory().push('/treatment');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: treatmentFormActions.CREATE_STARTED,
      });

      await TreatmentService.create(values);

      dispatch({
        type: treatmentFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.treatment.create.success'),
      );

      getHistory().push('/treatment');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: treatmentFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: treatmentFormActions.UPDATE_STARTED,
      });

      await TreatmentService.update(id, values);

      dispatch({
        type: treatmentFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.treatment.update.success'),
      );

      getHistory().push('/treatment');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: treatmentFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default treatmentFormActions;
