import coinIcon from "../../imports/coin.png";

interface CoinIconProps {
  className?: string;
}

export default function CoinIcon({ className = "w-6 h-6" }: CoinIconProps) {
  return <img src={coinIcon} alt="Coin" className={`${className} object-contain`} />;
}
