import React from "react";
import { useState } from "react";
import Layout from "../../Components/Layout";
import { Button, Form, Input } from "semantic-ui-react";
import instance from "../../Etherium/factory";
import web3 from "../../Etherium/web3";

const New = () => {
  const [value, setValue] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      await instance.methods.createCampaign(value).send({
        from: accounts[0],
      });
    } catch (error) {
        
    }
  };

  return (
    <Layout>
      <h1>Create a new campaign!</h1>
      <Form onSubmit={handleOnSubmit}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            placeholder="Minimum Contribution"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Field>
        <Button primary>Create!</Button>
      </Form>
    </Layout>
  );
};

export default New;
