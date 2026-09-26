import { easeInOut, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../context/GlobalContext";

const MsgSentToast = () => {
  const { showToast, setShowToast } = useGlobalContext();
  const { toastInfo } = useGlobalContext();
  const { message, detail, color, Icon, iconBg } = toastInfo;

  if (showToast) {
    return (
      <div className="fixed z-30 top-0 w-full bg-black/20 h-full px-4">
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeInOut }}
          style={{ borderColor: color }}
          className="rounded-md overflow-hidden bg-white border-l-8 m-[4em_auto] relative  h-20 max-w-[22em] md:min-w-[25em] md:max-w-[30em]"
        >
          <div className="flex gap-4 items-center h-[94%] pl-4 ">
            <div>
              <span
                style={{ backgroundColor: iconBg }}
                className="rounded-full inline-flex items-center justify-center text-white h-7 text-2xl w-7 border "
              >
                {Icon}
              </span>
            </div>
            <div>
              <h1 style={{ color: color }} className="text-lg font-semibold ">
                {message}
              </h1>
              <p className="text-[15.5px]">{detail}</p>
            </div>
          </div>
          <hr style={{ borderColor: color }} className=" border-3  ToastLoad" />
          {/* close button */}
          <button
            onClick={() => setShowToast(false)}
            className="absolute top-1 right-2 text-xl text-gray-700 hover:text-[#02a94c] cursor-pointer"
          >
            <IoClose />
          </button>{" "}
        </motion.div>
      </div>
    );
  }
};

export default MsgSentToast;
