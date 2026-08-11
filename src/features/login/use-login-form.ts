import { useState } from "react";

import { getDefaultCredentials } from "@/core/app-config";
import { useAuth } from "@/core/auth";

import { SharedLoginFields, SubmitState } from "./types";

type LoginFormState = SharedLoginFields & {
  readonly submitState: SubmitState;
  readonly hasSharedCredentials: boolean;
  readonly errorMessage: string | null;
  readonly setEmail: (value: string) => void;
  readonly setPassword: (value: string) => void;
  readonly submit: (extra?: object) => void;
};

const MIN_PASSWORD_LENGTH = 6;

/**
 * Shared credentials only. Variant-specific fields stay in the variant.
 */
export function useLoginForm(): LoginFormState {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const credentials = getDefaultCredentials();
  const hasSharedCredentials =
    email.trim().length > 0 && password.length >= MIN_PASSWORD_LENGTH;

  const submit = (extra: object = {}): void => {
    if (!hasSharedCredentials) {
      return;
    }

    setErrorMessage(null);
    setSubmitState("success");
    void signIn({
      email: email.trim(),
      workspaceId: credentials.workspaceId ?? undefined,
    });
  };
  return {
    email,
    password,
    submitState,
    hasSharedCredentials,
    errorMessage,
    setEmail,
    setPassword,
    submit,
  };
}
