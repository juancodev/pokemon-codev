import PokemonCloseCard from "../../interface/PokemonCloseCard";

const PokeInfo = ({
  sprites,
  weight,
  name,
  abilities,
  onClose,
}: PokemonCloseCard): JSX.Element => {
  return (
    <>
      <div className="absolute inset-y-0 flex max-h-full w-full flex-col items-center justify-center bg-slate-950/50">
        <div className="flex h-1/2 w-1/2 flex-col items-center rounded-3xl bg-white">
          <div className="relative flex h-1/2 w-full items-center justify-center">
            <img
              src={sprites}
              alt={name}
              className="h-full w-full rounded-t-3xl bg-cyan-300 object-contain"
            />
            <div className="absolute right-px top-px">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-10 w-10"
                onClick={onClose}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="absolute bottom-[5%] right-[5%] mx-9 rounded-3xl bg-lime-500 p-1.5 text-center max-md:m-0">
              <span className="font-semibold text-white">WEIGHT: {weight}</span>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[30%] w-[30%] flex-col justify-end gap-3 text-center max-[425px]:h-[40%]">
          <div className="w-full text-6xl max-md:text-3xl max-md:font-bold max-sm:text-2xl">
            <h3>{name}</h3>
          </div>
          <div className="mx-5 rounded-3xl bg-[#088BED] p-1.5 text-center text-lg max-md:m-0">
            <span className="font-bold text-yellow-400">
              ABILITIES: {abilities}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export { PokeInfo };
