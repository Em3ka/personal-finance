export default function InlineEmpty({ message }) {
  return (
    <div className="bg-beige-100 rounded-md py-14">
      <p className="text-grey-500 text-center text-sm font-semibold whitespace-pre-line">
        {message}
      </p>
    </div>
  );
}
