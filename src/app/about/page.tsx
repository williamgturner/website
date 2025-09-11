import Image from "next/image";

export default function About() {
  const text = `Kia Ora,
My name is William.
I like reading books and writing code.
Sometimes I just stare at the ceiling and think.

Email me?
{{EMAIL}}
`;

  return (
    <div className="p-4 space-y-2">
      {text.split("\n").map((line, idx) => {
        // Insert the photo after "Kia Ora,"
        if (line === "Kia Ora,") {
          return (
            <div key={idx}>
              <p>{line}</p>
              <Image
                src="/images/profile.jpeg"
                alt="William Turner"
                width={256}
                height={256}
                className="object-cover my-2"
              />
            </div>
          );
        }

        if (line.includes("{{EMAIL}}")) {
          return (
            <p key={idx}>
              <a
                className="hover:bg-[orange] no-underline"
                href="mailto:williamguyturner@proton.me"
              >
                williamguyturner@proton.me
              </a>
            </p>
          );
        }

        return (
          <p key={idx} className="m-0">
            {line.trim() === "" ? "\u00A0" : line}
          </p>
        );
      })}
    </div>
  );
}
