import Spinner from "../_components/Spinner";

//Specific loader to cabins page
export default function Loader() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}
