export default function formatDate(responseDate) {
  // deal with undefined dates from api calls
  if (responseDate) {
    const dateStr = responseDate.split("T")[0];
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  }
}
