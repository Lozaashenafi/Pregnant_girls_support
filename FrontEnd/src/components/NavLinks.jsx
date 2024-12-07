import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "service", text: "service" },
  { id: 3, url: "aboutus", text: "aboutus" },
  { id: 4, url: "contactus", text: "contactus" },
  { id: 5, url: "doctors", text: "doctors" },
];
const Navlinks = () => {
  return (
    <>
      {links.map((link) => {
        const { url, id, text } = link;
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default Navlinks;
