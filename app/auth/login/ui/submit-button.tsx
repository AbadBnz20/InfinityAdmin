"use client";

import { Button } from "@nextui-org/react";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button fullWidth color="primary" type="submit" isLoading={pending} {...props}>
      {children}
    </Button>
  );
}
