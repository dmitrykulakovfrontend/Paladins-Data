export default async function reactPages(req, res) {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
}
