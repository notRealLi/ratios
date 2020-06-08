import React from "react";
import { Navbar, Form, FormControl, Button, InputGroup } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <>
      <Navbar className="justify-content-between" bg="dark">
        <Form inline>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Form>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search for symbol"
            className=" mr-sm-2"
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Navbar>
    </>
  );
};

export default NavigationBar;
