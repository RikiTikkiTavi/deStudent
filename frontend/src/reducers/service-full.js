import Immutable from 'immutable';

const initialState = Immutable.Map({
  formData: {}
});

export default (state = initialState, action) => {
  if (action.type === 'FORM_SAVED') {
    return state.set('formData', {
      formId: action.formData.formId,
      values: action.formData.values
    });
  }

  return state;
};
