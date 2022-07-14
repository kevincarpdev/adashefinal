import { CreditCardOutlined } from "@ant-design/icons";
import { Input, notification } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3Transfer } from "react-moralis";
import AddressInput from "../../AddressInput";
import AssetSelector from "./AssetSelector";
import { toast } from 'react-toastify';
import { motion } from "framer-motion";

const styles = {
  card: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    textAlign: "center",
  },
  input: {
    width: "100%",
    outline: "none",
    fontSize: "16px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textverflow: "ellipsis",
    appearance: "textfield",
    color: "#041836",
    fontWeight: "700",
    border: "none",
    backgroundColor: "transparent",
  },
  select: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
  },
  textWrapper: { maxWidth: "80px", width: "100%" },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexDirection: "row",
  },
};

function Transfer() {
  const { Moralis } = useMoralis();
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    amount ? setTx({ amount}) : setTx();
  },  [amount]);

  const openNotification = ({ message, description }) => {
    toast.info(message + description, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // notification.open({
    //   placement: "bottomRight",
    //   message,
    //   description,
    //   onClick: () => {
    //     console.log("Notification Clicked!");
    //   },
    // });
  };

  async function transfer() {
    const { amount } = tx;

    let options = {};
      options = {
        type: "native",
        amount: Moralis.Units.ETH(amount),
        receiver: "0x920b3B284FF04Eb680b230dC65A52F12567D66f5",
      };
    
  
    setIsPending(true);
    const txStatus = await Moralis.transfer(options);

    txStatus
      .on("transactionHash", (hash) => {
        openNotification({
          message: "🔊 New Transaction",
          description: `${hash}`,
        });
        console.log("🔊 New Transaction", hash);
      })
      .on("receipt", (receipt) => {
        openNotification({
          message: "📃 New Receipt",
          description: `${receipt.transactionHash}`,
        });
        console.log("🔊 New Receipt: ", receipt);
        setIsPending(false);
      })
      .on("error", (error) => {
        openNotification({
          message: "📃 Error",
          description: `${error.message}`,
        });
        console.error(error);
        setIsPending(false);
      });
  }

  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.select}>
          <div style={styles.textWrapper}>
            <Text strong>Amount:</Text>
          </div>
          <Input
            size="large"
            prefix={<CreditCardOutlined />}
            onChange={(e) => {
              setAmount(`${e.target.value}`);
            }}
          />
        </div>
          <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.0 }}
          className="btn purchase"
          loading={isPending}
          style={{ width: "100%", marginTop: "25px" }}
          onClick={() => transfer()}
          disabled={isPending}
        >
        PURCHASE
        </motion.button>
      </div>
    </div>
  );
}

export default Transfer;