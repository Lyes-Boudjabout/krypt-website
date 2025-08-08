import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaWallet } from 'react-icons/fa';
import { useAccount } from 'wagmi';

export function RainbowConnectButton() {
  const { status } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        mounted,
        authenticationStatus,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            <button
              onClick={openConnectModal}
              type="button"
              className="flex items-center space-x-3 px-6 py-4 bg-indigo-600 text-white md:text-xl text-lg rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {status !== 'connecting' ? <FaWallet/> : <CgSpinner className='animate-spin' size={30}/>}
              <span>{connected ? 'Connected' : status === 'connecting' ? 'Confirming in Wallet...' : 'Connect Wallet'}</span>
            </button>
          </div>
        )
      }}
    </ConnectButton.Custom>
  );
}

