export function formatMessage(text) {
  return text.split('\n').map((line, index) => {
    if (line.trim().startsWith('-')) {
      return (
        <li key={index} className="ml-4 list-disc">
          {line.trim().substring(1).trim()}
        </li>
      );
    }
    return <p key={index} className="mb-1">{line}</p>;
  });
}