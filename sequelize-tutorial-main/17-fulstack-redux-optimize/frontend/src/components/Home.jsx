import Menu from "./Menu";
import { Card, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <>
      <Menu />
      <Container>
        <Row className="mt-3">
          <Card className="border-0">
            <Card.Body>
              <Card.Title>Home Page</Card.Title>
              <Card.Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
                repellendus nemo, doloribus dolores sed blanditiis mollitia
                commodi nihil quae pariatur?
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
}

export default Home;
