import { TypographyH3 } from "../@/components/ui/TypographyH3"
import Searchbar from "./Searchbar"

const Header = () => {
  return (
    <div>
      <TypographyH3 className="text-center py-3">The dictionary</TypographyH3>
      {/* Search bar */}
      <Searchbar />
    </div>
  )
}

export default Header
