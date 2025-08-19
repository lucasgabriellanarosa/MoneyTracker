import { FaWallet } from "react-icons/fa"

function Header() {
  return (
    <header className="flex flex-row justify-between items-center p-2 border-b border-gray-200">
        <div className="flex justify-center items-center gap-2">
            <FaWallet />

            <h1>MoneyTracker</h1>
        </div>

        <img className="w-12 rounded-full" src="https://yt3.googleusercontent.com/L8Rm0h8FjQ0t9eGytIvaT8oV43v5K0tX6lmTndcbOpPOBoHcgITnuqK-1jUfNY0CTSUSul4ffg=s900-c-k-c0x00ffffff-no-rj" />
    </header>
  )
}

export default Header