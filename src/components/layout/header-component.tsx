"use client";
import React from "react";
import { styled as styledd } from "styled-components";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { routes } from "../../config/route-config";
import { Avatar } from "@mantine/core";
import PersonIcon from "@mui/icons-material/Person";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Logout } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Header(props: { children }) {
  const [open, setOpen] = React.useState(true);

  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <StyledHeader>
      <StyledBox className="box" sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          style={{
            backgroundColor: "#181616",
            borderBottom: "1px solid grey",
          }}
          position="fixed"
          open={open}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" noWrap component="div">
                SONOVA
              </Typography>

              <Dropdown>
                <DropdownTrigger>
                  <IconButton>
                    <Avatar style={{ borderRadius: "50%" }}>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      router.push("/logout");
                    }}
                    key="logout"
                    style={{ color: "white" }}
                  >
                    <Logout fontSize="small" />
                    <span style={{ paddingLeft: 6 }}>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#181818",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader></DrawerHeader>
          <Divider />

          {routes.map((route, index) => (
            <ListItem key={index} disablePadding>
              {route.section && (
                <div style={{ width: "100%" }}>
                  <Divider style={{ width: "100%" }} />
                  <h3
                    style={{
                      cursor: "default",
                      fontWeight: "normal",
                      color: "white",
                      paddingTop: "0.5em",
                      paddingLeft: 10,
                    }}
                  >
                    {route.section}
                  </h3>
                </div>
              )}
              {route.path && (
                <ListItemButton
                  onClick={(e) => {
                    // e.stopPropagation();
                    e.preventDefault();
                    router.push(route.path);
                  }}
                >
                  {/* {route.icon && (
                    <ListItemIcon>
                      <route.icon
                        style={{
                          margin: 0,
                          padding: 0,
                          width: "fit-content",
                          color: "#363537",
                        }}
                      />
                    </ListItemIcon>
                  )} */}

                  <span style={{ color: "white", opacity: 0.4 }}>
                    {route.title}
                  </span>
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </Drawer>
        <Main style={{ width: "100%", backgroundColor: "#2f2f2f" }} open={open}>
          <DrawerHeader />
          <div className="children">{props.children}</div>
        </Main>
      </StyledBox>
    </StyledHeader>
  );
}
const StyledBox = styledd(Box)`
   width:90%;
`;
const StyledHeader = styledd.div`
  display: flex;
  justify-content: center;
  background-color: #2f2f2f;
  color: white;
  padding: 20px;
`;
