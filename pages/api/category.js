export default async function handler(req, res) {
  const { query } = req;
  const data = await fetch(
    `https://restaurant-api.wolt.com/v1/pages/venue-list/${query.id}?lat=${query.lat}&lon=${query.lon}`
  ).then((rsp) => rsp.json());
  res.status(200).json(data.sections[1].items);
}
