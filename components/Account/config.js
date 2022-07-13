// import Metamask from "./WalletIcons/metamaskWallet.png";
// import Coin98 from "./WalletIcons/Coin98.png";
// import WalletConnect from "./WalletIcons/wallet-connect.svg";
// import MathWallet from "./WalletIcons/MathWallet.svg";
// import TokenPocket from "!file-loader!./WalletIcons/TokenPocket.svg";
// import SafePal from "!file-loader!./WalletIcons/SafePal.svg";
// import TrustWallet from "./WalletIcons/TrustWallet.png";

export const connectors = [
  {
    title: "Metamask",
    icon: "../../public/WalletIcons/metamaskWallet.png",
    connectorId: "injected",
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: "../../public/WalletIcons/wallet-connect.svg",
    connectorId: "walletconnect",
    priority: 2,
  }
];
