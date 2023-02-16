interface Props {
  displayContactModal: () => void;
  setSearchValue: Function;
  setDropdownValue: Function;
  login: () => void;
  loginValue: string;
  logout: () => void;
}

const Menu = ({ displayContactModal, setSearchValue, setDropdownValue, login, logout, loginValue }: Props) => {

  const loginButton = (
    <button
      className="bg-green-500 text-base text-white h-11 s:w-24 w-20 rounded active:scale-95 self-center"
      onClick={login}
    >Login</button>
  );

  const logoutButton = (
    <button
      className="bg-red-500 text-white h-11 s:w-24 w-20 rounded active:scale-95"
      onClick={logout}
    >Logout</button>
  )

  return (
    <section className="flex justify-center sm:justify-between mt-6">
      <button
        className="bg-amber-500 text-base text-white rounded h-11 hidden sm:w-36 sm:block active:scale-95"
        data-testid="addContactButton"
        role="button"
        onClick={() => displayContactModal()}
      >Add Contact
      </button>
      {/* Reponsive */}
      <button
        className="bg-amber-500 text-3xl text-white rounded h-11 w-12 sm:w-12 block sm:hidden active:scale-95"
        role="button"
        onClick={() => displayContactModal()}
      >+
      </button>

      <div className="flex">
        <input
          className="mr-2 h-11 px-1 box-border outline-0 rounded ml-2 sm:w-60 w-28 self-center"
          type="text"
          placeholder="Search"
          role="filterInput"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select
          className="Dropdown h-11 rounded outline-0 sm:w-24 w-20 mr-2 self-center"
          name="labels"
          id="labels"
          role="labels"
          onChange={(e) => setDropdownValue(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Friends">Friends</option>
          <option value="Family">Family</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>


        {loginValue ? logoutButton : loginButton}
      </div>

    </section>
  )
}

export default Menu;