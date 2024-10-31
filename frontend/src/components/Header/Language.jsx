import { useState } from "react"; // Thêm useState
import English from "../../assets/america-flag.jpg"; // Cờ Mỹ
import VietNam from "../../assets/vietnam-flag.jpg"; // Cờ Việt Nam
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";
import "./Language.scss";

const Language = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // State lưu trữ ngôn ngữ đã chọn

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  const getFlag = () => {
    return selectedLanguage === "vi" ? VietNam : English;
  };

  return (
    <div>
      <NavDropdown
        title={
          <span>
            <img
              src={getFlag()}
              alt={selectedLanguage === "vi" ? "Vietnam Flag" : "English Flag"}
              className="image-flag"
            />
            {selectedLanguage === "vi" ? "Việt Nam" : "English"}
          </span>
        }
        id="basic-nav-dropdown2"
        className="language"
      >
        <NavDropdown.Item onClick={() => changeLanguage("en")}>
          <img
            src={English} // Hiển thị cờ Mỹ
            alt="English Flag"
            className="image-flag"
          />
          English
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => changeLanguage("vi")}>
          <img
            src={VietNam} // Hiển thị lại cờ Việt Nam
            alt="Vietnam Flag"
            className="image-flag"
          />
          Việt Nam
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default Language;
