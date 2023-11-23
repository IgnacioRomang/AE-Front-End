export const isNum = (e) => {
    //credit for  https://stackoverflow.com/questions/43067719/how-to-allow-only-numbers-in-textbox-in-reactjs
    //Autor : Mayank Shukla
    // https://stackoverflow.com/users/5185595/mayank-shukla

    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
        return true
    }
    return false;
};

export const shortFileName = (file_name) => {
    if (file_name.length > 10) {
        return file_name.substr(0, 7) + '...' + file_name.substr(-7);
    }
    return file_name
}

export const getDates = () => {
    const startDay = new Date();
    const fthMonth = new Date(startDay);
    const sixMonth = new Date(startDay);
    const lastMonth = new Date(startDay);
  
    fthMonth.setMonth(fthMonth.getMonth() + 5);
    sixMonth.setMonth(sixMonth.getMonth() + 6);
    lastMonth.setMonth(lastMonth.getMonth() + 12);
  
    return { startDay, fthMonth, sixMonth, lastMonth };
  };
  
export default {
    isNum,
    shortFileName,
    getDates
};