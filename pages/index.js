import React, { useEffect } from "react";
import instance from "../Etherium/factory";
import { Button } from "semantic-ui-react";
import Layout from "../Components/Layout";

const index = () => {
  useEffect(async () => {
    // const compaigns = await instance.methods.getDeployedCampaigns().call();
  }, []);

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Button class="ui right labeled icon button" floated="right" primary>
          <i class="right arrow icon"></i>
          Create Campaign
        </Button>
      </div>
    </Layout>
  );
};

export default index;
