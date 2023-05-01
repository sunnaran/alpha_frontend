export default {
  apiserver:
    process.env.NODE_ENV === "production"
      ? "http://65.109.6.10:8080/ords/alpha"
      : "http://192.168.99.40:8080/ords/alpha",
  apidingserver:
    process.env.NODE_ENV === "production"
      ? "http://65.109.6.10:8080/ords/alpha"
      : "http://192.168.99.40:8080/ords/alpha",
};
