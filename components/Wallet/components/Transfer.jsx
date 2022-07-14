import { CreditCardOutlined } from "@ant-design/icons";
import { Input, notification } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3Transfer } from "react-moralis";
import AddressInput from "../../AddressInput";
import AssetSelector from "./AssetSelector";
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import cn from 'classnames'

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
  const [tokenBuyAmount, setTokenBuyAmount] = useState();

  useEffect(() => {
    amount ? setTx({ amount}) : setTx();
  },  [amount]);
   useEffect(() => {
    tokenBuyAmount ? setTokenBuyAmount(amount * 770) : setTokenBuyAmount();
  },  [tokenBuyAmount]);


  async function transfer() {
    setIsPending(true);
    const { amount } = tx;
    let options = {};
    options = {
      type: "native",
      amount: Moralis.Units.ETH(amount),
      receiver: "0x920b3B284FF04Eb680b230dC65A52F12567D66f5",
    };

    let receipt = await Moralis.transfer(options).then((receipt) => {
         toast.success("Transaction Successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAmount(0)
        setIsPending(false);
    }).catch((e) => {
      toast.error(e.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
       setIsPending(false);
    })

  }

  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <h3>{tokenBuyAmount ? tokenBuyAmount : 0} ADSE</h3>
        <div style={styles.select}>
          <div style={styles.textWrapper}>
            <Text strong>MATIC:</Text>
          </div>
          <Input
            size="large"
            prefix={<CreditCardOutlined />}
            onChange={(e) => {
              setAmount(`${e.target.value}`)
              setTokenBuyAmount(`${e.target.value}` * 770)
            }}
            value={amount}
          />
        </div>
          <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.0 }}
          className={cn((!amount || isPending) ? 'pending' : '' , 'btn purchase')}
          style={{ width: "100%", marginTop: "25px" }}
          onClick={() => transfer()}
          disabled={isPending}
        >
        {isPending ? 'PENDING' : 'PURCHASE'}
        </motion.button>
      </div>
    </div>
  );
}

export default Transfer;