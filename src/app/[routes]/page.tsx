import ContentDisplayComponent from "../../components/content-display-component";
import Header from "../../components/layout/header-component";
import React from "react";

export default function Page(props: { params }) {
  const routeName = props.params.routes;
  return (
    <>
      <Header>
        <ContentDisplayComponent routeName={routeName} title={routeName} />
      </Header>
    </>
  );
}
