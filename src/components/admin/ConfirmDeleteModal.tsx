"use client";

import { Modal, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";

export function ConfirmDeleteModal({
  itemName,
  isPending,
  onConfirm,
}: {
  itemName: string;
  isPending?: boolean;
  onConfirm: (close: () => void) => void;
}) {
  return (
    <Modal>
      <Button variant="ghost" size="sm" isIconOnly aria-label={`Delete ${itemName}`}>
        <Trash2 size={16} className="text-danger" />
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            {({ close }) => (
              <>
                <Modal.Header>
                  <Modal.Heading>Delete {itemName}?</Modal.Heading>
                </Modal.Header>
                <Modal.Body>This action can't be undone.</Modal.Body>
                <Modal.Footer>
                  <Button variant="ghost" onPress={close}>Cancel</Button>
                  <Button variant="danger" isPending={isPending} onPress={() => onConfirm(close)}>
                    Delete
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}