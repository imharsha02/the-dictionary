import Searchbar from "./Searchbar";
import { TypographyH2 } from "../@/components/ui/TypographyH2";


const Header = () => {

  return (
    <div>
      <TypographyH2
       
        className="text-2xl text-center py-3"
      >
        The Dictionary
      </TypographyH2>
      {/* Search bar */}
      <Searchbar />
    </div>
  );
};

export default Header;
