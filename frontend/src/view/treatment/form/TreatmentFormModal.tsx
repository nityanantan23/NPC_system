import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import TreatmentForm from 'src/view/treatment/form/TreatmentForm';
import TreatmentService from 'src/modules/treatment/treatmentService';
import Errors from 'src/modules/shared/error/errors';

const TreatmentFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await TreatmentService.create(data);
      const record = await TreatmentService.find(id);
      props.onSuccess(record);
    } catch (error) {
      Errors.handle(error);
    } finally {
      setSaveLoading(false);
    }
  };

  if (!props.visible) {
    return null;
  }

  return (
    <Modal
      style={{ top: 24 }}
      title={i18n('entities.treatment.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <TreatmentForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default TreatmentFormModal;
