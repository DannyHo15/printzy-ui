import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
  open: boolean;
  onClose?: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
  nameCancel?: string;
  nameConfirm?: string;
  onOpenChange: (open: boolean) => void;
}

const AlertDialogComponent: React.FC<AlertDialogProps> = ({
  open,
  onClose = () => {},
  onConfirm,
  title,
  content,
  onOpenChange,
  nameCancel = "Cancel",
  nameConfirm = "Continue",
}) => {
  return (
    <AlertDialog onOpenChange={(value) => onOpenChange(value)} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>{nameCancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {nameConfirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
