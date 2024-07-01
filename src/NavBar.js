import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Shop2Icon from "@mui/icons-material/Shop2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RedeemIcon from "@mui/icons-material/Redeem";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";
import AddCardIcon from "@mui/icons-material/AddCard";
import BadgeIcon from "@mui/icons-material/Badge";
import { routeNames } from "./App";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NavBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function toInvoiceItem() {
    navigate("/InvoiceItem");
  }

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "#123270" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            INVOICE APP
          </Typography>
          <Button color="inherit" onClick={handleModalOpen}>
            <AddIcon />
          </Button>
          <Button color="inherit">
            <PersonOutlineOutlinedIcon />
          </Button>
          <Button color="inherit">
            <NotificationsNoneOutlinedIcon />
          </Button>
          <Button color="inherit">
            <AccountCircleOutlinedIcon />
          </Button>
          <Button color="inherit">
            <SettingsSuggestOutlinedIcon />
          </Button>
          <Button color="inherit">
            <AppsOutlinedIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block",backgroundColor:
              location.pathname === routeNames.HOME ? "#53B789" : "initial",}}
            onClick={() => navigate("/")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" ,backgroundColor:
              location.pathname === routeNames.ITEM ? "#53B789" : "initial", }}
            onClick={() => navigate("/Item")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Shop2Icon />
              </ListItemIcon>
              <ListItemText primary="Item" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" ,backgroundColor:
              location.pathname === routeNames.SALES ? "#53B789" : "initial",}}
            onClick={() => navigate("/Sales")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Sales" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "block",
              backgroundColor:
                location.pathname === routeNames.PURCHASE ? "#53B789" : "initial",
            }}
            onClick={() => navigate("/Purchase")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <RedeemIcon />
              </ListItemIcon>
              <ListItemText
                primary="Purchase"
                sx={{
                  opacity: open ? 1 : 0,
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" ,backgroundColor:
              location.pathname === routeNames.INVOICE ? "#53B789" : "initial",}}
            onClick={() => navigate("/Invoice")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <RedeemIcon />
              </ListItemIcon>
              <ListItemText primary="Invoice" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block",backgroundColor:
              location.pathname === routeNames.CLIENT ? "#53B789" : "initial", }}
            onClick={() => navigate("/Client")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <RedeemIcon />
              </ListItemIcon>
              <ListItemText primary="Client" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" ,backgroundColor:
              location.pathname === routeNames.INVOICE_ITEM ? "#53B789" : "initial", }}
            onClick={() => navigate("/InvoiceItem")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <RedeemIcon />
              </ListItemIcon>
              <ListItemText
                primary="InvoiceItem"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" ,backgroundColor:
              location.pathname === routeNames.PAYMENT ? "#53B789" : "initial",}}
            onClick={() => navigate("/Payment")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PaymentsIcon />
              </ListItemIcon>
              <ListItemText primary="Payment" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" ,backgroundColor:
              location.pathname === routeNames.TAX ? "#53B789" : "initial", }}
            onClick={() => navigate("/Tax")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <RedeemIcon />
              </ListItemIcon>
              <ListItemText primary="Tax" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" ,backgroundColor:
              location.pathname === routeNames.PROJECT ? "#53B789" : "initial",}}
            onClick={() => navigate("/Project")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <RedeemIcon />
              </ListItemIcon>
              <ListItemText primary="Project" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" , backgroundColor:
              location.pathname === routeNames.PAYMENT_METHOD ? "#53B789" : "initial", }}
            onClick={() => navigate("/PayMethod")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AddCardIcon />
              </ListItemIcon>
              <ListItemText
                primary="PayMethod"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" , backgroundColor:
              location.pathname === routeNames.EMPLOYEE ? "#53B789" : "initial", }}
            onClick={() => navigate("/Employee")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <BadgeIcon />
              </ListItemIcon>
              <ListItemText primary="Employee" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            height: 465,
            bgcolor: "background.paper",
            border: "1px solid #000",
            borderRadius: 3,
            p: 3,
            boxShadow: 24,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="h8">
                <GridViewOutlinedIcon /> GENERAL
              </Typography>
              <ul>
                <br />
                <li>+ Add Users</li>
                <br />
                <li>
                  <Button
                    onClick={toInvoiceItem}
                    sx={{
                      color: "black",
                      "&:hover": {
                        color: "#123270",
                        backgroundColor: "#53B789",
                      },
                    }}
                  >
                    + Item
                  </Button>
                </li>
                <br />
                <li>+ Inventory Adjustments</li>
                <br />
                <li>+ Journal Entry</li>
                <br />
                <li>+ Log Time</li>
                <br />
                <li>+ Weekly Log</li>
              </ul>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h8">
                <ShoppingCartOutlinedIcon /> SALES
              </Typography>
              <ul>
                <br />
                <li>+ Customer</li>
                <br />
                <li>+ Quotes</li>
                <br />
                <li>+ Delivery Challan</li>
                <br />
                <li>+ Invoices</li>
                <br />
                <li>+ Recurring Invoice</li>
                <br />
                <li>+ Retail Invoice</li>
                <br />
                <li>+ Sales Order</li>
                <br />
                <li>+ Customer Payment</li>
                <li>+ Credit Notes</li>
              </ul>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h8">
                <ShoppingBagOutlinedIcon /> PURCHASES
              </Typography>
              <ul>
                <br />
                <li>+ Vendor</li>
                <br />
                <li>+ Expenses</li>
                <br />
                <li>+ Recurring Expense</li>
                <br />
                <li>+ Bills</li>
                <br />
                <li>+ Recurring Bills</li>
                <br />
                <li>+ Purchase Orders</li>
                <br />
                <li>+ Vendor Payment</li>
                <br />
                <li>+ Vendor Credits</li>
              </ul>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h8">
                <AccountBalanceOutlinedIcon /> BANKING
              </Typography>
              <ul>
                <br />
                <li>+ Bank Transfer</li>
                <br />
                <li>+ Card Payment</li>
                <br />
                <li>+ Owner Drawings</li>
                <br />
                <li>+ Other Income</li>
                <br />
                <li>
                  <Link to={"/Payment/"}>+ Payment</Link>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
