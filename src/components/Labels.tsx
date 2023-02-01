
const Labels = () => {
  return (
    <section>
      <div className="grid grid-cols-12  text-white mt-8">
        <p className="md:col-span-2 sm:col-span-3 max-[640px]:col-span-5">Name</p>
        <p className="md:col-span-3 md:block sm:hidden max-[640px]:hidden">Address</p>
        <p className="md:col-span-2 sm:col-span-3 max-[640px]:col-span-5">Phone</p>
        <p className="md:col-span-4 sm:col-span-4 max-[640px]:hidden">Email</p>
        <p className="text-left">Label</p>
      </div>
      <div className="LINE border-b-2 border-amber-500 mt-3"></div>
    </section>
  )
}

export default Labels;