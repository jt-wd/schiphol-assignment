const DEFAULT_TIMEOUT = 300;

function initializeFlightSeeker(inputData, filterFn, generateResultsTableCb) {
  if (!inputData || inputData?.length === 0) {
    throw new Error("No inputData was passed or inputData is an empty array.");
  }

  if (typeof filterFn !== "function") {
    throw new Error("filterFn should be a function.");
  }

  if (typeof generateResultsTableCb !== "function") {
    throw new Error(
      "generateResultsTableCb should be a function which accepts results."
    );
  }

  const flightSeeker = document.querySelector("#flight-seeker");

  if (!flightSeeker) {
    throw new Error("flight-seeker element not found in DOM.");
  }

  let searchTimeout = null;
  let results = null;

  flightSeeker.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      const userInput = e.target.value;
      const actualFilter = filterFn(userInput);

      if (userInput.length > 2) {
        results = inputData.filter(actualFilter);
      } else {
        results = null;
      }

      generateResultsTableCb(results);
    }, DEFAULT_TIMEOUT);
  });
}

export default initializeFlightSeeker;
