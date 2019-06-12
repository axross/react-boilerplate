import styled from "@emotion/styled";
import * as React from "react";
import Button from "./Button";
import MultilineTextInput from "./MultilineTextInput";
import Text from "./Text";
import TextInput from "./TextInput";

interface Props extends React.Attributes {
  defaultTitle?: string;
  defaultBody?: string;
  validateValues?: ({ title, body }: Values) => boolean;
  onSubmit: (e: React.SyntheticEvent, { title, body }: Values) => void;
  className?: string;
}

interface Values {
  title: string;
  body: string;
}

function NewPostForm({
  defaultTitle = "",
  defaultBody = "",
  validateValues = DEFAULT_VALIDATE_VALUES,
  onSubmit,
  ...props
}: Props) {
  const [title, setTitle] = React.useState(defaultTitle);
  const [body, setBody] = React.useState(defaultBody);

  return (
    <Root {...props}>
      <TitleLabel selectable={false}>Title</TitleLabel>

      <TitleTextInput
        defaultValue={defaultTitle}
        onChange={(_, value) => setTitle(value)}
      />

      <BodyLabel selectable={false}>Body</BodyLabel>

      <BodyTextInput
        maxLines={3}
        defaultValue={defaultBody}
        onChange={(_, value) => setBody(value)}
      />

      <SubmitButton
        disable={!validateValues({ title, body })}
        onClick={e => onSubmit(e, { title, body })}
      >
        <Text>Post</Text>
      </SubmitButton>
    </Root>
  );
}

function DEFAULT_VALIDATE_VALUES({ title, body }: Values) {
  return title.trim().length >= 1 && body.trim().length >= 1;
}

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 8px auto 16px auto 8px auto;
  grid-template-areas: "titleLabel ." ". ." "titleTextInput submitButton" ". ." "bodyLabel bodyLabel" ". ." "bodyTextInput bodyTextInput";
  column-gap: 16px;
`;

const TitleLabel = styled(Text)`
  grid-area: titleLabel;
`;

const TitleTextInput = styled(TextInput)`
  grid-area: titleTextInput;
`;

const BodyLabel = styled(Text)`
  grid-area: bodyLabel;
`;

const BodyTextInput = styled(MultilineTextInput)`
  grid-area: bodyTextInput;
`;

const SubmitButton = styled(Button)`
  grid-area: submitButton;
`;

export default NewPostForm;
