import { Box } from "@chakra-ui/layout";
import { NavLink } from "react-router-dom";
import { ROUTE_SAVED, ROUTE_TRENDING } from "../constants/routes";

const routes = [
  { route: ROUTE_TRENDING, label: "Trending" },
  { route: ROUTE_SAVED, label: "Saved" }
];

const Navigation = () => {
  return (
    <Box
      zIndex="1000"
      position="fixed"
      top="8"
      left="50%"
      transform="translate(-50%, 0)"
      p="2"
      w="max-content"
      display="flex"
      alignItems="center"
      borderWidth="revert"
      borderColor="gray.200"
      backgroundColor="gray.50"
      borderRadius="xl"
      boxShadow="xl"
    >
      {routes.map(route => (
        <NavLink
          key={route.route}
          to={route.route}
          style={{ opacity: 0.5, margin: "0 8px" }}
          activeStyle={{ opacity: 1 }}
        >
          {route.label}
        </NavLink>
      ))}
    </Box>
  );
};

export default Navigation;
