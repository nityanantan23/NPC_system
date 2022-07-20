import list from 'src/modules/vitalSign/list/vitalSignListReducers';
import form from 'src/modules/vitalSign/form/vitalSignFormReducers';
import view from 'src/modules/vitalSign/view/vitalSignViewReducers';
import destroy from 'src/modules/vitalSign/destroy/vitalSignDestroyReducers';
import importerReducer from 'src/modules/vitalSign/importer/vitalSignImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
