import { storiesOf } from "@storybook/react";
import * as React from "react";
import { BehaviorSubject } from "rxjs";
import AuthenticationBlocContext from "../../blocContexts/AuthenticationBlocContext";
import SignInButton from "../SignInButton";

storiesOf("Common/SignInButton", module).add("default", () => {
  const isProcessing = new BehaviorSubject(false);

  return (
    <AuthenticationBlocContext.Provider
      value={
        {
          isProcessing,
          currentIsProcessing: isProcessing.value,
          signIn: () => {
            isProcessing.next(true);

            setTimeout(() => isProcessing.next(false), 750);
          }
        } as any
      }
    >
      <SignInButton />
    </AuthenticationBlocContext.Provider>
  );
});
