import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";

const App = () => {
  // state to store the data from API
  // loading state
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);

  // remove tour function
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
    console.log("remove tour");
  };
  // fetch data from API
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      setTours(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  // useEffect to fetch data when component mounts
  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  // TODO
  // if tours is empty
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button
            className="btn"
            onClick={fetchTours}
            style={{ marginTop: "2rem" }}
          >
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};
export default App;
