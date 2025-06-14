"use client";
import { useModalStore } from "@/store/ModalStore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
  title: string;
  size?:"md" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
  active: boolean;
  buttontitle?: string;
}

export const ModalMain = ({  children, title,size="md",active,buttontitle='Registrar Nuevo' }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useModalStore();

  return (
    <>
     {
      active && <Button color="primary" onPress={onOpen}>{buttontitle}</Button>
     }
      <Modal  isDismissable={false} size={size} scrollBehavior={'inside'} isOpen={isOpen} onOpenChange={onOpenChange}  hideCloseButton={true} >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter></ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
