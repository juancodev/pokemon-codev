const API = import.meta.env.API;
const VERSION = import.meta.env.VERSION;

const Dashboard = () => {
  const getPokemon = async (API: string, VERSION: string) => {
    const getData = await fetch(`${API}/${VERSION}/pokemon?limit=100&offset=0`);
    const result = await JSON.stringify(getData);
    return result;
  };

  //problem with getData
  try {
    getPokemon(API, VERSION).then((data) => {
      console.log(data);
    });
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <div className="flex h-screen w-full justify-center p-12">
        <div className="flex flex-col gap-y-24">
          <div className="search-pokemon">
            <input
              type="text"
              name=""
              id=""
              className="form-input"
              placeholder="Search Pokemon..."
            />
          </div>
          <div className="card-list-pokemon grid grid-cols-5">
            <div>card-1</div>
            <div>card-2</div>
            <div>card-3</div>
            <div>card-4</div>
            <div>card-5</div>
            <div>card-6</div>
            <div>card-7</div>
            <div>card-8</div>
            <div>card-9</div>
            <div>card-10</div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Dashboard };
