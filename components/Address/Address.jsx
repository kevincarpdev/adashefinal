import { useEffect } from "react";
import { useState } from "react";
import { getEllipsisTxt } from "../../helpers/formatters";
import Blockie from "../Blockie";
import { useMoralis, useNativeBalance } from "react-moralis";
import { Skeleton } from "antd";

const styles = {
  address: {
    display: "flex",
    flexDirection: "column",
    gap: "0 5px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "9px",
    alignItems: "center",
  },
  token: {
    display: "flex",
    flexDirection: "column",
    gap: "0 5px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "9px",
    alignItems: "center",
  },
  tokenAddress: {
    display: "flex",
    gap: "0 5px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "9px",
    alignItems: "center",
  },
  flexAddress: {
    display: "flex",
    gap: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "9px",
    alignItems: "center",
  },
  balance: {
   fontSize: "1.3rem",
   fontWeight: "600"
  },
};

function Address(props) {
  const { account, isAuthenticated } = useMoralis();
  const [address, setAddress] = useState();
  const [presale, setPresale] = useState();
  const [tokenAddress, setTokenAddress] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [isPresaleClicked, setIsPresaleClicked] = useState(false);
  const [isTokenClicked, setIsTokenClicked] = useState(false);
  
  const { data: balance } = useNativeBalance(props);

  useEffect(() => {
    setAddress(props?.address || (isAuthenticated && account));
  }, [account, isAuthenticated, props]);

  useEffect(() => {
      setPresale('0x5A783d4C3D74174c0D39f28B925a834C9Ff84887');
  },  [presale]);

  useEffect(() => {
      setTokenAddress('0x5A783d4C3D74174c0D39f28B925a834C9Ff84887');
  },  [tokenAddress]);

  if (!account || !isAuthenticated) return null;
  

  if (!address)
    return (
      <Skeleton paragraph={{ rows: 1, width: "100%" }} title={false} active />
    );

  const Copy = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#1780FF"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigator.clipboard.writeText(address);
        setIsClicked(true);
      }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 3v4a1 1 0 0 0 1 1h4" />
      <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
      <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
      <title id="copy-address">Copy Address</title>
    </svg>
  );
  const CopyToken = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#1780FF"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigator.clipboard.writeText(tokenAddress);
        setIsTokenClicked(true);
      }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 3v4a1 1 0 0 0 1 1h4" />
      <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
      <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
      <title id="copy-address">Copy Address</title>
    </svg>
  );
  const CopyPresale = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#1780FF"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigator.clipboard.writeText(presale);
        setIsPresaleClicked(true);
      }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 3v4a1 1 0 0 0 1 1h4" />
      <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
      <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
      <title id="copy-address">Copy Address</title>
    </svg>
  );
  

  return (
    <>
      <div style={{ ...styles.address, ...props.style }}>
        <div style={{ ...styles.flexAddress, ...props.style }}>
          {props.avatar === "left" && <Blockie address={address} size={7} />}
          <p>{props.size ? getEllipsisTxt(address, props.size) : address}</p>
          {props.avatar === "right" && <Blockie address={address} size={7} />}
          {props.copyable && (isClicked ? <Check /> : <Copy />)}
        </div>
        <div className="addressBalance" style={{ ...styles.balance, textAlign: "center", whiteSpace: "nowrap" }}>
          {balance.formatted}
        </div>
      </div>
      <div className="buyDetails">
        <div style={{ ...styles.token}}>
          <span>Token</span>
          <div style={{ ...styles.tokenAddress}}>
            <p>{props.size ? getEllipsisTxt(tokenAddress, props.size) : tokenAddress}</p>
            {props.copyable && (isTokenClicked ? <Check /> : <CopyToken />)}
          </div>
        </div>
        {/* <div style={{ ...styles.token}}>
          <span>Presale</span>
          <div style={{ ...styles.tokenAddress}}>
            <p>{props.size ? getEllipsisTxt(presale, props.size) : presale}</p>
            {props.copyable && (isPresaleClicked ? <Check /> : <CopyPresale />)}
          </div>
        </div> */}
      </div>
    </>
    );
}

export default Address;

const Check = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="3"
    stroke="#21BF96"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12l5 5l10 -10" />
    <title id="copied-address">Copied!</title>
  </svg>
);
