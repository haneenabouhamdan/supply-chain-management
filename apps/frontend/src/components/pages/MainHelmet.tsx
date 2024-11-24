import { Helmet } from "react-helmet";
import logo from "../../assets/favicon.svg";

export const MainHelmet = () => {
  return (
    <Helmet>
      <link href={logo} rel="icon" type="image/svg+xml" />
    </Helmet>
  );
};
