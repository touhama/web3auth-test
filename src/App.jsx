import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId: "BJssZCjnzWUIBZxl2Ma2ToAxC4ZiyW4CXvcjSSYIYaoc0RJMGKLCXIz0HrbXHi7Lio4NOyJyn5ltSHT0WI-qXIc", // ユーザー指定のclientId
          web3AuthNetwork: "sapphire_devnet", // v10では'sapphire_devnet'を使用
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1", // Mainnet
            rpcTarget: "https://rpc.ankr.com/eth",
          }
        });
        
        await web3authInstance.init();
        setWeb3auth(web3authInstance);
        setProvider(web3authInstance.provider);
        if (web3authInstance.provider) {
          const userInfo = await web3authInstance.getUserInfo();
          setUser(userInfo);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async () => {
    if (!web3auth) return;
    await web3auth.connect();
    setProvider(web3auth.provider);
    const userInfo = await web3auth.getUserInfo();
    setUser(userInfo);
  };

  const logout = async () => {
    if (!web3auth) return;
    await web3auth.logout();
    setProvider(null);
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Web3Auth</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h1>Web3Auth + React クイックスタート</h1>
        {user ? (
          <>
            <div>ログイン済み: {user.name || user.email}</div>
            <button onClick={logout}>ログアウト</button>
          </>
        ) : (
          <button onClick={login}>Web3Authでログイン</button>
        )}
      </div>
    </>
  )
}

export default App
