export default function FeedbackMessage({ message, cn = "" }) {
  return (
    <p className={"p-4 text-base font-bold opacity-75" + " " + cn}>{message}</p>
  );
}
