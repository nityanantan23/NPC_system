import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import VitalSignForm from 'src/view/vitalSign/form/VitalSignForm';
import VitalSignService from 'src/modules/vitalSign/vitalSignService';
import Errors from 'src/modules/shared/error/errors';

const VitalSignFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await VitalSignService.create(data);
      const record = await VitalSignService.find(id);
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
      title={i18n('entities.vitalSign.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <VitalSignForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default VitalSignFormModal;
