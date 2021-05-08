import { useContext } from "react";
import GIFContext, { IGIFContext } from "../context/gifContext";

const useGIF = (): IGIFContext => useContext(GIFContext);

export default useGIF;
