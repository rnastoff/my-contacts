
const DeleteModal = () => {
  return (
    <div className="bg-white w-[20rem] sm:w-[30rem] rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="rounded-t-md bg-amber-500 text-white p-3 text-xl sm:text-2xl sm:p-5">Confirm</h1>
      <h2 className="text-base p-3 sm:p-5">Delete This Note?</h2>
      <div className="Line border-[1px] border-neutral-100"></div>
      <div className="Buttons flex flex-row-reverse p-5">
        <button className="border-2 border-amber-500 text-amber-500 rounded h-11 w-28 ml-2">Cancel</button>
        <button className="bg-red-500 text-white rounded h-11 w-28">Confirm</button>
      </div>
    </div>
  )
}

export default DeleteModal;