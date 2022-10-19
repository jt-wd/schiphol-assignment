export const NICE_FETCH_ERROR = "NiceFetchError";

export class NiceFetchError extends Error {
  constructor(message, error) {
    super(message);
    if (error) {
      this.originalError = error;
    }
    this.name = NICE_FETCH_ERROR;
  }
}
