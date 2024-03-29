// Importing necessary React components, styles, and dependencies
import React from "react";
import { Button, Card } from "react-bootstrap";
import pizza1 from "../Assets/pizza1.jpeg";
import pizzaSurprise from "../Assets/pizza-surprise.jpeg";
import Mingle3 from "../Assets/Mingle3.jpeg";
import NavComponent from "../Components/NavComponent";
import { useNavigate } from "react-router-dom";

// Homepage component for displaying quick options to the user
const Homepage = () => {
  // Accessing navigation functionality
  const navigate = useNavigate();

  // Rendering the Homepage component
  return (
    <div>
      {/* Navigation component for header */}
      <NavComponent home={false} />
      {/* Container for quick options */}
      <div className="container mx-auto text-center">
        <h1 className="mb-5">Quick Options</h1>
        {/* Card layout for Craft Your Pizza option */}
        <div className="d-flex justify-content-center gap-3 container w-75">
          <Card>
            <Card.Img variant="top" src={pizza1} />
            <Card.Body>
              <Card.Title>Craft Your Pizza</Card.Title>
              <Card.Text>
                Create your perfect pizza with our Craft Your Pizza option.
                Choose from a variety of crusts, sizes, and delicious toppings
                to satisfy your cravings.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-transparent border-0">
              {/* Button for navigating to Craft Your Pizza page */}
              <Button variant="warning" onClick={() => navigate("/craft")}>
                New Order
              </Button>
            </Card.Footer>
          </Card>
          {/* Card layout for Your Favorite option */}
          <Card>
            <Card.Img variant="top" src={Mingle3} />
            <Card.Body>
              <Card.Title>Your Favorite</Card.Title>
              <Card.Text>
                Reorder your favorite pizza hassle-free with the Your Favorite
                option. We'll ensure your go-to combination is delivered to you
                with just a click.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-transparent border-0">
              {/* Button for navigating to Your Favorite page */}
              <Button variant="warning" onClick={() => navigate("/favorite")}>
                Re-Order My Fav
              </Button>
            </Card.Footer>
          </Card>
          {/* Card layout for Mingle Surprise option */}
          <Card>
            <Card.Img variant="top" src={pizzaSurprise} />
            <Card.Body>
              <Card.Title>Mingle Surprise</Card.Title>
              <Card.Text>
                Experience a burst of flavors with our Mingle Surprise option.
                Let our chefs create a unique and delicious pizza for you.
                Embrace the surprise!
              </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-transparent border-0">
              {/* Button for navigating to Mingle Surprise page */}
              <Button variant="warning" onClick={() => navigate("/random")}>
                Surprise Me
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Export the Homepage component as the default export
export default Homepage;
