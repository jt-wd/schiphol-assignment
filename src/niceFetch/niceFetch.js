import { NiceFetchError } from "./errors";

const handleServerErrors = (response) => {
  // assuming all server codes below 400 are OK
  if (response.ok && response.status < 400) {
    return response;
  }
  const errorMessage = `STATUS ${response.status} MESSAGE "${response.statusText}" URL ${response.url}`;
  const error = new NiceFetchError(errorMessage);
  error.response = response;
  throw error;
};

const parseResponse = (response) => {
  const contentType = response.headers.get("content-type");

  // assume text if no content type (for empty responses)
  if (!contentType || response.status === 204) {
    return response.text();
  }

  if (contentType.includes("application/json")) {
    return response.json();
  } else if (
    contentType.includes("text/html") ||
    contentType.includes("text/plain")
  ) {
    return response.text();
  } else if (contentType.includes("application/octet-stream")) {
    return response.blob();
  }

  throw new NiceFetchError(
    "Unknown content type specified in response header",
    contentType
  );
};

function niceFetch({
  url = "",
  params = {},
  headers = {},
  body = {},
  method = "GET",
}) {
  const specs = {
    method,
    headers: {
      Accept: "application/json",
      ...headers,
    },
    ...params,
  };

  if (method !== "GET") {
    specs.body = body instanceof FormData ? body : JSON.stringify(body);
  }
  return fetch(url, specs).then(handleServerErrors).then(parseResponse);
}

export default niceFetch;
