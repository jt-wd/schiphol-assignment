function generateFlightTable(flights) {
  const flightResults = document.querySelector("#flight-results");

  if (!flightResults) {
    throw new Error("flight-results element not found in DOM.");
  }

  if (!flights?.length > 0) {
    flightResults.innerHTML = "";
    return;
  }

  flightResults.innerHTML = `
        <thead>
            <tr>
                <th>Flightnumber</th>
                <th>Airport</th>
                <th>ExpectedTime</th>
                <th>Details</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

  const table = flightResults.querySelector("tbody");

  const resultRows = flights.map((flight) => {
    return `<tr><td>${flight.flightNumber}</td><td>${flight.airport}</td><td>${flight.expectedTime}</td><td><a href=${flight.url}>See details</a></td></tr>`;
  });

  table.innerHTML = resultRows.join("");
  flightResults.style.display = "table";
}

export default generateFlightTable;
