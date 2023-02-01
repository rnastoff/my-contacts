interface Props {
  displayContactModal: () => void;
  setSearchValue: Function;
  setDropdownValue: Function;
}

const Menu = ({ displayContactModal, setSearchValue, setDropdownValue }: Props) => {
  return (
    <section className="flex justify-center sm:justify-between mt-6">
      <button
        className="bg-amber-500 text-base text-white rounded h-11 hidden sm:w-36 sm:block active:scale-95"
        onClick={() => displayContactModal()}
      >Add Contact
      </button>
      {/* Reponsive */}
      <button
        className="bg-amber-500 text-3xl text-white rounded h-11 w-12 sm:w-12 block sm:hidden active:scale-95"
        onClick={() => displayContactModal()}
      >+
      </button>

      <div>
        <input
          className="mr-2 h-11 px-1 box-border outline-0 rounded w-40 ml-2 sm:w-72 "
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select
          className="Dropdown h-11 rounded outline-0 sm:w-36 w-24"
          name="labels"
          id="labels"
          onChange={(e) => setDropdownValue(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Friends">Friends</option>
          <option value="Family">Family</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </div>

    </section>
  )
}

export default Menu;