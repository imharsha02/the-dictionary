import Searchbar from "./Searchbar";
import { TypographyH3 } from "../@/components/ui/TypographyH3";


const Header = () => {

  return (
    <div>
      <TypographyH3
       
        className="text-2xl text-center py-3"
      >
        The dictionary
      </TypographyH3>
      {/* Search bar */}
      <Searchbar />
    </div>
  );
};

export default Header;
