export default async function handler(req, res) {
  const data = await fetch(
    `https://restaurant-api.wolt.com/v1/pages/delivery?lat=${process.env.LAT}&lon=${process.env.LON}`
  ).then((rsp) => rsp.json());
  res.status(200).json(data.sections[0].items);
}
