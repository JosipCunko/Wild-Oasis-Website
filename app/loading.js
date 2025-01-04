import Spinner from "@/app/_components/Spinner";

//Having a loading.js file will activate streaming if js is enabled in the browser
//Work for all the sub-routes, no matter where is it in the url structure
//For some reason it doesn't work to account page
export default function Loading() {
  return <Spinner />;
}
