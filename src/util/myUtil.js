export default {
  apiserver:
    process.env.NODE_ENV === "production"
      ? "http://65.109.6.10:8080/ords/alpha"
      : "http://localhost:8080/ords/alpha",
  apicdnserver:
    process.env.NODE_ENV === "production"
      ? "http://65.109.6.10:9000"
      : "http://localhost:9000",
  apinodeserver:
    process.env.NODE_ENV === "production"
      ? "http://65.109.6.10:10000/api/v1"
      : "http://localhost:10000/api/v1",
  socketserver:
    process.env.NODE_ENV === "production"
      ? "http://165.109.6.10:10000"
      : "http://localhost:10000",
  // apiserver: "http://192.168.99.181:8080/ords/glbl",
  // apicdnserver: "http://192.168.99.182:9000",
  // apinodeserver: "http://192.168.99.181:10000/api/v1",
  // socketserver: "http://192.168.99.181:10000",
};
