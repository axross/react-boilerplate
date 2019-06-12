import { storiesOf } from "@storybook/react";
import * as React from "react";
import { BehaviorSubject } from "rxjs";
import AuthenticationBlocContext from "../../blocContexts/AuthenticationBlocContext";
import SignOutButton from "../SignOutButton";

storiesOf("Common/SignOutButton", module).add("default", () => {
  const isProcessing = new BehaviorSubject(false);

  return (
    <AuthenticationBlocContext.Provider
      value={
        {
          isProcessing,
          currentIsProcessing: isProcessing.value,
          signOut: () => {
            isProcessing.next(true);

            setTimeout(() => isProcessing.next(false), 750);
          }
        } as any
      }
    >
      <SignOutButton />
    </AuthenticationBlocContext.Provider>
  );
});
