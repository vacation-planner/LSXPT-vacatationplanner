const PAYMENT_SERVER_URL =
    process.env.NODE_ENV === "production"
        ? "herokulink"
        : "http://localhost:5500/api/stripe";

export default PAYMENT_SERVER_URL;