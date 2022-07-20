import VitalSignService from 'src/modules/vitalSign/vitalSignService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'VITALSIGN_FORM';

const vitalSignFormActions = {
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
        type: vitalSignFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await VitalSignService.find(id);
      }

      dispatch({
        type: vitalSignFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vitalSignFormActions.INIT_ERROR,
      });

      getHistory().push('/vital-sign');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: vitalSignFormActions.CREATE_STARTED,
      });

      await VitalSignService.create(values);

      dispatch({
        type: vitalSignFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.vitalSign.create.success'),
      );

      getHistory().push('/vital-sign');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vitalSignFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: vitalSignFormActions.UPDATE_STARTED,
      });

      await VitalSignService.update(id, values);

      dispatch({
        type: vitalSignFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.vitalSign.update.success'),
      );

      getHistory().push('/vital-sign');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vitalSignFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default vitalSignFormActions;
