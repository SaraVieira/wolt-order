export default async function handler(req, res) {
  const data = await fetch(
    `https://restaurant-api.wolt.com/v1/pages/front?lat=${req.query.lat}&lon=${req.query.lon}`
  ).then((rsp) => rsp.json());
  res.status(200).json(data.sections[2].items);
}
