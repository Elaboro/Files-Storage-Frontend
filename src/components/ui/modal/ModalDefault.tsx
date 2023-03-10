import React,
{
  FC,
  MouseEventHandler,
  ReactNode,
  useId,
} from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureReturn,
} from "@chakra-ui/react";

interface IButtonToFutter {
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface ModalDefaultProps {
  header: string;
  body: ReactNode;
  button_to_footer: IButtonToFutter[];
  disclosure: UseDisclosureReturn;
  contentMinW?: number;
};

const ModalDefault: FC<ModalDefaultProps> = ({
  header,
  body,
  button_to_footer,
  disclosure,
  contentMinW = undefined,
}) => {
  const { isOpen, onClose } = disclosure;
  const key = useId();

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay
        backdropFilter='blur(3px)'
      />
      <ModalContent
        minW={contentMinW}
      >
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          pb={6}
        >
          {body}
        </ModalBody>
        <ModalFooter>
          {button_to_footer.map((item: IButtonToFutter, i: number) =>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={item.onClick}
              key={key + i}
            >
              {item.name}
            </Button>
          )}
          <Button
            onClick={onClose}
          >
            Отмена
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDefault;