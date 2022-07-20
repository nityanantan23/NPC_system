import list from 'src/modules/treatment/list/treatmentListReducers';
import form from 'src/modules/treatment/form/treatmentFormReducers';
import view from 'src/modules/treatment/view/treatmentViewReducers';
import destroy from 'src/modules/treatment/destroy/treatmentDestroyReducers';
import importerReducer from 'src/modules/treatment/importer/treatmentImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
