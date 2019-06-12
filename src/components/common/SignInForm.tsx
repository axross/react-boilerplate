import * as React from "react";
import SignInButton from "./SignInButton";
import Text from "./Text";

interface Props extends React.Attributes {
  className?: string;
}

function SignInForm(props: Props) {
  return (
    <div {...props}>
      <Text>
        {"Clean React is an example implementation of BBS! You can just "}
      </Text>

      <SignInButton />

      <Text>{" to post!"}</Text>
    </div>
  );
}

export default SignInForm;
