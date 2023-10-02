import { Col, Container, Row } from "reactstrap";
import Base from "../Components/Base";
import NewFeed from "../Components/NewFeed";
import CustomSideMenu from "../Components/CustomSideMenu";

const Home=()=>{

    return(
        <Base>
        
        <Container className="mt-3">
            <Row>
                <Col md={2} className="pt-3">
                <CustomSideMenu />
                </Col>

                <Col md={10}>
                <NewFeed />
                </Col>
            </Row>
        </Container>

        </Base>
    );
};

export default Home;