export default async function handler(req, res) {
  const data = await fetch(
    `https://restaurant-api.wolt.com/v1/pages/venue-list/${req.query.id}?lat=${req.query.lat}&lon=${req.query.lon}`
  ).then((rsp) => rsp.json());
  res.status(200).json(data.sections[1].items);
}
