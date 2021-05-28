import Link from "next/link";
import { useEffect, useState } from "react";
import absoluteUrl from "next-absolute-url";

export default function Example({ places = [], cat = "" }) {
  const [orderedPlaces, setOrderedPlaces] = useState(places);
  const [order, setOrder] = useState("time");

  useEffect(() => {
    let a;
    if (order === "time") {
      a = places.sort((placeA, placeB) => {
        return placeA.venue.estimate - placeB.venue.estimate;
      });
    }
    if (order === "price") {
      a = places.sort((placeA, placeB) => {
        return placeA.venue.price_range - placeB.venue.price_range;
      });
    }
    if (order === "rating") {
      a = places.sort((placeA, placeB) => {
        return (
          (placeB.venue.rating || { score: 0 }).score -
          (placeA.venue.rating || { score: 0 }).score
        );
      });
    }
    setOrderedPlaces([...a]);
  }, [order]);

  return (
    <>
      <Link href="/">
        <a className="-mt-10 block relative mb-10 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Go back
        </a>
      </Link>
      <main>
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-3xl leading-6 font-medium text-gray-900 capitalize mb-6">
            {cat.split("category-")[1]}
          </h3>

          <div style={{ maxWidth: 300 }}>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Order By
            </label>
            <select
              id="location"
              name="location"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="time">Time to Deliver</option>
              <option value="rating">Rating</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>{" "}
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {(orderedPlaces || []).map((file) => (
            <a
              key={file.track_id}
              href={`https://wolt.com/en/deu/berlin/restaurant/${file.venue.slug}`}
            >
              <li className="relative">
                <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                  <img
                    src={file.image.url}
                    alt={file.title}
                    className="object-cover pointer-events-none group-hover:opacity-75"
                  />
                  <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                  >
                    <span className="sr-only">
                      View details for {file.title}
                    </span>
                  </button>
                </div>
                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                  {file.title}
                </p>
                <div className="flex justify-between">
                  <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                    {(file.venue.rating || {}).score}
                  </p>
                  <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                    {file.venue.estimate} minutes
                  </p>
                </div>
              </li>
            </a>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { origin } = absoluteUrl(context.req);
  const a = await fetch(
    `${origin}/api/category?id=${context.params.category}`
  ).then((rsp) => rsp.json());

  const places = a
    .sort((placeA, placeB) => {
      return placeA.venue.estimate - placeB.venue.estimate;
    })
    .filter((a) => a.venue.delivers);
  return {
    props: {
      places,
      cat: context.params.category,
    },
  };
}
