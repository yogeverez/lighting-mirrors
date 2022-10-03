import React from "react";
import { Form, Button, Modal } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import FloatingFormActionsWrapper from "./FloatingFormActions.style";
import ButtonAnimationWrapper from "./ButtonAnimationWrapper";
const FloatingFormActions = (props) => {
  const { saveLoading, disabled, hidePrimary, show, saveText, onSubmit } =
    props;

  return (
    <FloatingFormActionsWrapper direction={"rtl"}>
      <Form.Item wrapperCol={{ span: 24 }} style={{ margin: 0 }}>
        <div style={{ display: "flex" }}>
          {hidePrimary ? null : (
            <ButtonAnimationWrapper show={show}>
              <Button
                className="floatingBtn"
                loading={saveLoading}
                disabled={disabled}
                onClick={onSubmit}
                htmlType="submit"
                type="primary"
                icon={<CheckOutlined />}
                size={"large"}
              >
                {" " + saveText}
              </Button>
            </ButtonAnimationWrapper>
          )}
        </div>
      </Form.Item>
    </FloatingFormActionsWrapper>
  );
};

export default FloatingFormActions;
