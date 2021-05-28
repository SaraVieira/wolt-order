export default async function handler(req, res) {
  const data = await fetch(
    `https://restaurant-api.wolt.com/v1/pages/front?lat=${process.env.LAT}&lon=${process.env.LON}`
  ).then((rsp) => rsp.json());
  res.status(200).json(data.sections[2].items);
}
