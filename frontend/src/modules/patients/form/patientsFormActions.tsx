import PatientsService from 'src/modules/patients/patientsService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PATIENTS_FORM';

const patientsFormActions = {
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
        type: patientsFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await PatientsService.find(id);
      }

      dispatch({
        type: patientsFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: patientsFormActions.INIT_ERROR,
      });

      getHistory().push('/patients');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: patientsFormActions.CREATE_STARTED,
      });

      await PatientsService.create(values);

      dispatch({
        type: patientsFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.patients.create.success'),
      );

      getHistory().push('/patients');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: patientsFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: patientsFormActions.UPDATE_STARTED,
      });

      await PatientsService.update(id, values);

      dispatch({
        type: patientsFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.patients.update.success'),
      );

      getHistory().push('/patients');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: patientsFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default patientsFormActions;
