import { SILENT_MODE } from "../../config"


const handleLog = (...args) => {
    if (!SILENT_MODE) {
        console.log(...args);
    }
};

export default handleLog