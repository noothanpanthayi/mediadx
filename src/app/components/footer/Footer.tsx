import { useState } from "react";
import styles from "./footer.module.css";
const { footer, burgerMenu, bottomMenu, menuItem } = styles;

const Footer = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && (
        <div className={bottomMenu}>
          <div className={menuItem} onClick={() => (window.location.href = "/")}>
            Listen to Radio
          </div>
          <div className={menuItem}  onClick={() => (window.location.href = "/tv")}>Watch TV</div>
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
