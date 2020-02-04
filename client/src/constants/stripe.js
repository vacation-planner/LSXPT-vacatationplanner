const STRIPE_PUBLISHABLE =
    process.env.NODE_ENV === "production"
        ? "pk_test_PiAE5fm3I6YRQRHGe4fNuu5P00Q7sx92gK"
        : "pk_test_PiAE5fm3I6YRQRHGe4fNuu5P00Q7sx92gK";

export default STRIPE_PUBLISHABLE;