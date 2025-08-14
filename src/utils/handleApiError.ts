export function handleApiError(error: any): never {
  if (error.response) {
    // Server responded with a status outside 2xx
    throw {
      message: error.response.data?.message || "Request failed",
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    // No response received
    throw { message: "No response from server", status: 0 };
  } else {
    // Something else went wrong
    throw { message: error.message || "Unexpected error", status: 0 };
  }
}