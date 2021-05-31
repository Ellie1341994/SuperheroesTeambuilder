import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import React from "react";
import { ImPencil } from "react-icons/im";
import { RiEraserFill } from "react-icons/ri";
export default function TeamTitle() {
  const teamNameInput: any = React.useRef(null);
  const previousTeamName: string | null = localStorage.getItem("teamName");
  const defaultTeamNameMessage = "Choose a team name!";
  const [teamName, setTeamName] = React.useState(
    previousTeamName ?? defaultTeamNameMessage
  );
  const [modifingTeamName, setModifingTeamName] = React.useState(
    teamName === defaultTeamNameMessage
  );
  React.useEffect(() => {
    if (modifingTeamName) {
      teamNameInput.current.focus();
    } else {
      teamNameInput.current.blur();
    }
  }, [modifingTeamName]);
  const ChangeTeamNameIcon: any = modifingTeamName ? RiEraserFill : ImPencil;
  React.useEffect(() => {
    localStorage.setItem("teamName", teamName);
  }, [teamName]);
  return (
    <h2
      children={
        <Form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (modifingTeamName) {
              setModifingTeamName(!modifingTeamName);
            }
          }}
        >
          <InputGroup className="mb-3">
            <InputGroup.Text
              className={modifingTeamName ? " " : "d-none"}
              children={"Team Name"}
            />
            <FormControl
              ref={teamNameInput}
              id="teamNameInput"
              disabled={!modifingTeamName}
              value={teamName}
              aria-label="Superhero team name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                event.target.focus();
                setTeamName(event.target.value);
              }}
              className={
                "text-center " + (!modifingTeamName ? "bg-transparent " : " ")
              }
              style={{
                border: !modifingTeamName ? "none" : "",
                fontSize: "24px",
              }}
            />
            <InputGroup.Text
              onClick={() => {
                setModifingTeamName(!modifingTeamName);
              }}
              children={<ChangeTeamNameIcon color="#555" />}
            />
          </InputGroup>
          <Button type="submit" hidden />
        </Form>
      }
    />
  );
}
