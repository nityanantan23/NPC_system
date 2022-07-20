import list from 'src/modules/patients/list/patientsListReducers';
import form from 'src/modules/patients/form/patientsFormReducers';
import view from 'src/modules/patients/view/patientsViewReducers';
import destroy from 'src/modules/patients/destroy/patientsDestroyReducers';
import importerReducer from 'src/modules/patients/importer/patientsImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
