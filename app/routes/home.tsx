import { useSearchParams } from "react-router";
import type { Route } from "./+types/home";

import alphabet from "data/alphabet.json";
import pantoneColors from "data/pantone-colors.json";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return {
    alphabet,
    pantoneColors,
  };
}

function toPascalCase(text: string) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text: string) {
  return text.replace(/-/, " ").toUpperCase();
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const { alphabet, pantoneColors } = loaderData;
  const { names, values } = pantoneColors;

  const colors = names.reduce((acc, curr, index) => {
    return {
      ...acc,
      [curr]: values[index],
    };
  }, {});

  return (
    <div className="mx-8">
      <ul className="flex flex-wrap gap-4 justify-center p-4">
        {alphabet.map((letter) => (
          <li key={letter}>
            <a href={`?letter=${letter}`}>{letter}</a>
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap gap-4 justify-center my-2">
        {names
          .filter((name) =>
            name.startsWith(searchParams.get("letter")?.toLowerCase() || "a")
          )
          .map((name) => (
            <li key={name} className="rounded border p-2 shadow">
              <div
                className="w-32 h-32"
                style={{ backgroundColor: colors[name as keyof typeof colors] }}
              />
              <div className="max-w-32 h-12 text-wrap font-bold">
                {toPascalCase(name)}
              </div>
              <div>{colors[name as keyof typeof colors]}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}
