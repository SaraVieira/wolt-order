import axios from "axios";

export default async function getLocation(req) {
  const ip =
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress;
  const usableIp = ip.includes(",") ? ip.split(",")[0] : ip;
  const { data } = await axios(`http://ip-api.com/json/${usableIp}`);
  console.log(process.env.NEXT_PUBLIC_LAT);
  const lat = data.lat || process.env.NEXT_PUBLIC_LAT;
  const lon = data.lon || process.env.NEXT_PUBLIC_LON;

  return { lat, lon };
}
