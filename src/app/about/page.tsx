export default function About() {
  const text = `Kia Ora,
My name is Will.
I like reading books and writing code.
Sometimes I just stare at the ceiling and think.

Email me?
{{EMAIL}}
`;

  return (
    <div className="p-4 space-y-6">
      {text.split("\n").map((line, idx) => {
        if (line.includes("{{EMAIL}}")) {
          // Replace the marker with an actual mailto link
          return (
            <p key={idx}>
              <a href="mailto:williamguyturner@proton.me">
                williamguyturner@proton.me
              </a>
            </p>
          );
        }

        return <p key={idx}>{line.trim() === "" ? "\u00A0" : line}</p>;
      })}
    </div>
  );
}
