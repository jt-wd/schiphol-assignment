import initializeFlightSeeker from "./flightSeeker/flightSeeker";
import generateFlightTable from "./flightTable/flightTable";
import niceFetch from "./niceFetch/niceFetch";

(async function () {
  const { flights } = await niceFetch({ url: "/assets/flights.json" });

  initializeFlightSeeker(
    flights,
    (userInput) => (flight) => flight.airport.toLowerCase().includes(userInput),
    generateFlightTable
  );
})();
