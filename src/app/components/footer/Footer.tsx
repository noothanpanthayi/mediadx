import { useState } from "react";
import styles from "./footer.module.css";
const { footer, author, burgerMenu, bottomMenu } = styles;

const BurgerMenu = ({ menuOpen }: { menuOpen: boolean }) => {
  return (
    <>
      {menuOpen && (
        <div className={bottomMenu}>
          <div>Listen to Radio</div>
          <div>Watch TV</div>
        </div>
      )}
    </>
  );
};

const Footer = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && (
        <div className={bottomMenu}>
          <div onClick={() => (window.location.href = "/radio")}>
            Listen to Radio
          </div>
          <div onClick={() => (window.location.href = "/tv")}>Watch TV</div>
        </div>
      )}
      <div className={footer}>
        <div>Media DX</div>
        {/* <div className={author}></div> */}
        <div onClick={() => setMenuOpen(!menuOpen)} className={burgerMenu}>
          &#x2630;
        </div>
      </div>
    </>
  );
};

export default Footer;
