import Link from "next/link";
import absoluteUrl from "next-absolute-url";

export default function Example({ categories }) {
  return (
    <main>
      <Link href="/all">
        <a className="p-4 bg-gray-100 font-medium my-5 text-xl block flex items-center">
          See All restaurants
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </Link>
      <h3 className="text-3xl leading-6 font-medium text-gray-900 capitalize mb-12">
        All Categories
      </h3>
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {categories.map((file) => (
          <Link href={`/category/${file.link.target.split(":berlin")[0]}`}>
            <li key={file.track_id} className="relative">
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
                  <span className="sr-only">View details for {file.title}</span>
                </button>
              </div>
              <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                {file.title}
              </p>
              <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                {file.quantity} places
              </p>
            </li>
          </Link>
        ))}
      </ul>{" "}
    </main>
  );
}

export async function getServerSideProps(context) {
  const { origin } = absoluteUrl(context.req);
  const categories = await fetch(`${origin}/api/categories`).then((rsp) =>
    rsp.json()
  );
  return {
    props: { categories }, // will be passed to the page component as props
  };
}
