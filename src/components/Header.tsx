import Searchbar from "./Searchbar"

const Header = () => {
  return (
    <div>
      <h1 className="text-4xl font-semibold text-center py-3">The dictionary</h1>
      {/* Search bar */}
      <Searchbar />
    </div>
  )
}

export default Header
