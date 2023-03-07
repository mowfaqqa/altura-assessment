/* eslint-disable require-jsdoc */
import { useRef } from "react";
import clsx from "clsx";
import { Dialog as HeadlessDialog } from "@headlessui/react";

interface IDialogProps {
  open: boolean;
  onClose?: any;
  variant?: "scrollable" | "scroll" | "fullscreen";
  [x: string]: any;
}

export function Dialog(props: IDialogProps) {
  const overlayRef: any = useRef();
  const { variant, className, open, children, onClose } = props;

  return (
    <HeadlessDialog
      static
      open={open}
      onClose={onClose!}
      initialFocus={overlayRef}
      className={clsx(
        {
          ["bg-action-backdrop"]:
            variant === "scroll" || variant === "scrollable",
          ["overflow-y-hidden"]: variant === "scrollable",
        },
        "modal fixed block w-full h-full outline-none overflow-x-hidden overflow-y-auto top-0 left-0"
      )}
    >
      <div className={clsx(className, DialogVariant[variant!], "relative")}>
        <DialogContent
          className={clsx({
            ["max-h-[100%]"]: variant === "scrollable",
            ["rounded-lg"]: variant === "scroll" || variant === "scrollable",
          } )}
        >
          {children}
        </DialogContent>
      </div>
    </HeadlessDialog>
  );
}

export default Dialog;

const DialogVariant = {
  fullscreen: "modal-fullscreen",
  scroll: "modal-dialog h-full",
  scrollable: "modal-dialog-scrollable modal-dialog",
};

export function DialogContent(props: any) {
  return (
    <div
      className={clsx(
        props.className,
        "relative bg-white shadow-xl flex flex-col w-full pointer-events-auto"
      )}
    >
      {props.children}
    </div>
  );
}
