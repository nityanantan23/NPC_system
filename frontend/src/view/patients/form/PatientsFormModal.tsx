import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import PatientsForm from 'src/view/patients/form/PatientsForm';
import PatientsService from 'src/modules/patients/patientsService';
import Errors from 'src/modules/shared/error/errors';

const PatientsFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await PatientsService.create(data);
      const record = await PatientsService.find(id);
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
      title={i18n('entities.patients.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <PatientsForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default PatientsFormModal;
